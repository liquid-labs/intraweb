import { toSentenceCase } from 'js-convert-case'

import { endSlash, fileRegex } from './constants.js'

const renderBreadcrumbs = (path, { format = 'html', showBreadcrumbs = true } = {}) => {
  if (showBreadcrumbs !== true || !path || path === '') {
    return ''
  }
  // else, we definitely expect output
  let output = '<div id="breadcrumbs">\n  '

  // We remove the end slash to avoid an empty array element.
  const pathBits = path.replace(endSlash, '').split('/')
  // Each path bit represents a step back, but we step back into the prior element. E.g., if we see path "foo/bar",
  // so stepping back one takes us to foo and stepping back two takes us to the root. So we unshift a root element and
  // pop the last element to make everything match up.
  pathBits.unshift('&lt;root&gt;')
  pathBits.pop()
  const pathBitsLength = pathBits.length
  // Breadcrumbs for a file end with the current dir and then move back. For a directory, you're stepping back in each
  // iteration.
  const linkBits = path.match(fileRegex)
    ? pathBits.map((b, i) => (i + 1) === pathBitsLength
      ? '.'
      : Array(pathBitsLength - (i + 1)).fill('..').join('/')
    )
    : pathBits.map((b, i) => Array(pathBitsLength - i).fill('..').join('/'))

  for (let i = 0; i < pathBits.length; i += 1) {
    const label = i === 0 ? pathBits[i] : toSentenceCase(pathBits[i])
    const seperator = i > 0 ? ' | ' : ''
    if (format === 'markdown') {
      output += `${seperator}[${label}](${linkBits[i]})`
    }
    else { // default to HTML
      output += `${seperator}<a href="${linkBits[i]}">${label}</a>`
    }
  }

  return output + '\n</div>'
}

export {
  renderBreadcrumbs
}
