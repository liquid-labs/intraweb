import * as fsPath from 'path'

import { toKebabCase, toSentenceCase } from 'js-convert-case'
import yaml from 'js-yaml'
import omit from 'lodash.omit'

import { displayDefaults, endSlash, PATH_INPUT_FILE } from './constants.js'
import { getFileReader } from './read-stream.js'
import { renderBreadcrumbs } from './render-breadcrumbs.js'
import { htmlEnd, htmlOpen } from './templates.js'

// Our 'path' comes in full relative from the root. However, we want to show only the relative bits.
const deprefix = (path) => path.replace(new RegExp(`${path}/?`), '')
const deMdRe = /\.md$/i
const deMd = (fileName) => fileName.replace(deMdRe, '')

const mixedSorter = (a, b) => {
  const aLabel = typeof a === 'string' ? a : a.label || a.name // 'label' for links and 'name' for Cloud Storage files
  const bLabel = typeof b === 'string' ? b : b.label || b.name

  return aLabel.localeCompare(bLabel)
}

const linkSorter = ({ label: aLabel }, { label: bLabel }) => aLabel.localeCompare(bLabel)

const hiddenFileFlagger = /^[_.~]|favicon.*\.(png|ico)|(global-)?inputs.yaml|~$/i
// if no name, then it's a link which is always shown (and !undefined === true)
const fileFilter = (f) => !f.name?.match(hiddenFileFlagger)

const renderIndex = async ({ bucket, files, folders, next, path, res }) => {
  const linksReader = // throws if there are issues
    await getFileReader({ bucket, dieOnMissing: false, next, path : `${path}${PATH_INPUT_FILE}`, res })
  if (linksReader !== false) { // and returns 'false' if the path does not exist; 404 already sent
    let inputData = ''
    linksReader
      .on('data', (d) => { inputData += d })
      .on('end', () => {
        const { display: displaySettings = displayDefaults, links } =
          yaml.load(inputData, { schema : yaml.FAILSAFE_SCHEMA })
        // TODO: here's where we would combine with global settings
        renderFormatted({ displaySettings, path, files, folders, links, res })
      })
  }
  else {
    renderFormatted({ displaySettings : displayDefaults, path, files, folders, res })
  }
}

/**
* Renders an index page after after all the necessary data has been gathered. I.e., after all asynchronous operations
* have completed. This includes processing of the data such as recoconciling potentially incomplete section ordering
* and sorting of items within each section.
*
* The basic layout is:
* 1. Open the page.
* 2. Process configuration and defaults to determine the section order.
* 3. Pass control to subroutines to generate the various sections based on whether it's files (=~ "Documents"), folders
*   (=~ "Subsections"), or an arbitrary section of links.
*/
const renderFormatted = ({
  displaySettings,
  files = [],
  folders = [],
  links = [],
  path,
  res
}) => {
  // 1. Open the page.
  let html = `${htmlOpen({ path })}
${renderBreadcrumbs(path, { ...displaySettings })}

<h1>${path.split('/').filter(/* for trailing '/' */ (p) => p).map((p) => toSentenceCase(p)).join(' | ')}</h1>\n\n`

  // 2. Process configuration and defaults to determine the section order.
  // 2.a. Gather base config settings or defaults.
  const { sectionTitles = {} } = displaySettings
  const { Documents = 'Documents', Subsections = 'Subsections' } = sectionTitles
  const { sectionOrder = [Documents, Subsections] } = displaySettings
  // 2.b. Process links data to create a final list of files, folders, and additional link sections.
  const pageSections = processSections({ files, folders, links, ...displaySettings })
  // 2.c. Determine the 'finalOrder' of the discovered 'pageSections'
  const alphaSections = Object.keys(pageSections).sort()
  const alphaBurndown = [...alphaSections]
  const finalOrder = []
  for (const section of sectionOrder) {
    const alphaIndex = alphaBurndown.indexOf(section)
    if (alphaIndex === -1) {
      throw new Error(`Unmatched section '${section}' specified or implied in section order could not be matched to actual sections: ${alphaSections.join(', ')}.`)
    }
    finalOrder.push(section)
    alphaBurndown.splice(alphaIndex, 1)
  }
  finalOrder.push(...alphaBurndown)

  // 3. Pass control to subroutines to generate the various sections...
  for (const sectionTitle of finalOrder) {
    if (sectionTitle === Documents) {
      html += renderFiles({ files, sectionTitle })
    }
    else if (sectionTitle === Subsections) {
      html += renderFolders({ folders, sectionTitle })
    }
    else {
      html += renderLinks({ links : pageSections[sectionTitle], sectionTitle })
    }
  }

  html += htmlEnd()

  res.send(html).end()
}

/**
* Processes the 'links' and combines with 'files', 'folders', or arbitrarily titled sections of links into sorted lists.
*/
const processSections = ({
  files,
  folders,
  links,
  linkSection = 'Documents',
  sectionTitles
}) => {
  const { Documents = 'Documents', Subsections = 'Subsections' } = sectionTitles

  const pageSections = {
    [Documents]   : files,
    [Subsections] : folders
  }
  let sortFiles = false
  let sortFolders = false

  for (const link of links) {
    if (linkSection === 'Documents') {
      files.push(link)
      sortFiles = true
    }
    else if (linkSection === 'Subsection') {
      folders.push(link)
      sortFolders = true
    }
    else {
      const list = pageSections[linkSection] || []
      list.push(link)
      pageSections[linkSection] = list
    }
  }

  // now (re-)sort as needed
  for (const [sort, list] of [[sortFiles, files], [sortFolders, folders]]) {
    if (sort) {
      list.sort(mixedSorter)
    }
  }
  // eslint-disable-next-line guard-for-in
  for (const section in omit(pageSections, [Documents, Subsections])) {
    pageSections[section].sort(linkSorter)
  }

  return pageSections
}

/**
* Generates an HTML snippet for a list of files (=~ "Documents").
*/
const renderFiles = ({ files = [], sectionTitle }) => {
  // We filter out 'hidden' files
  files = files.filter(fileFilter)

  if (files.length === 0) {
    return ''
  }
  // else: we have files to render
  let html = openSection({ items : files, sectionTitle })

  for (const file of files) {
    let label, url
    if (typeof file === 'string') {
      label = file
      url = encodeURIComponent(label)
    }
    else if (file.name !== undefined) { // then it's a Cloud Storage file
      const baseName = fsPath.basename(file.name)
      label = deMd(baseName)
      url = encodeURIComponent(baseName)
    }
    else if (file.label !== undefined) { // then it's a 'links' item
      label = file.label
      url = file.url
    }
    html += `    <li><a href="${url}">${label}</a></li>\n`
  }

  return html + '  </ul>\n'
}

/**
* Generates an HTML snippet for a list of folders (=~ "Subsections").
*/
const renderFolders = ({ folders = [], sectionTitle }) => {
  if (folders.length === 0) {
    return ''
  }
  // else: we have folders to render
  let html = openSection({ items : folders, sectionTitle })
  for (const folder of folders) {
    const label = toSentenceCase(folder)
    const url = encodeURIComponent(folder.replace(endSlash, ''))
    html += `    <li><a href="${url}/">${label}</a></li>\n`
  }

  return html + '  </ul>\n'
}

/**
* Generates an HTML snippet for a list arbitrary index links.
*/
const renderLinks = ({ links = [], sectionTitle }) => {
  if (links.length === 0) {
    return ''
  }
  // else: we have links to render
  let html = openSection({ items : links, sectionTitle })
  for (const { url, label } of links) {
    html += `    <li><a href="${url}">${label}</a></li>\n`
  }

  return html + '  </ul>\n'
}

const openSection = ({ items, sectionTitle }) => `
<h2 id="${toKebabCase(sectionTitle)}">${sectionTitle}</h2>
  ${items.length} total
<ul>\n`

export {
  renderIndex
}
