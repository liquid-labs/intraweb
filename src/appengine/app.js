/**
* ## Overview
*
* Serves files from a Cloud Storage bucket as if from a local filesystem.
*
* The basic flow is:
* 1. Determine bucket config and connect.
* 2. Listen.
* 3. Examine incoming requests.
*   3.1 If there's a suffix, pass handling to the file handler.
*   3.2 Everything else is assumed to be a directory reference. Pass handling to the directory indexer.
* 4. Back to listening.
*
* ## References
*
* * Error handling and handling of asynchronous flow informed primarily by [Using Async/await in
*   Express](https://zellwk.com/blog/async-await-express/) from July 2021.
*/

import asyncHandler from 'express-async-handler'
import express from 'express'
import gcpMetadata from 'gcp-metadata'
import marked from 'marked'
import { Storage } from '@google-cloud/storage'

import { setupAccessLib } from './lib/access'

// Get basic project info
const projectId = process.env.GOOGLE_CLOUD_PROJECT
console.log(`Starting server for project '${projectId}'...`)

// have to use the 'metadata' server for project number
const isAvailable = await gcpMetadata.isAvailable()
if (!isAvailable) { // TODO: Support fallback modes and 'unverified' access when configured for it
  throw new Error('Metadata not available, cannot proceed.')
}
console.log(`Metadata available: ${isAvailable}`)

const projectNumber = await gcpMetadata.project('numeric-project-id')

// setup access checker
const accessLib = setupAccessLib({ projectId, projectNumber })

// setup storage stuff
const storage = new Storage()

const bucketId = process.env.BUCKET
if (!bucketId) {
  throw new Error("No 'BUCKET' environment variable found (or is empty).")
}
// Useful info for the logs.
console.log(`Connecting to bucket: ${bucketId}`)
const bucket = storage.bucket(bucketId)

// setup web server stuff
const app = express()
app.set('trust proxy', true)
const PORT = process.env.PORT || 8080

const fileRegex = /.*\.[^./]+$/
const commonImageFiles = /\.(jpg|png|gif)$/i

const htmlOpen = (path) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>${path}</title>
    <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <style>
    /*
Copyright (c) 2017 Chris Patuzzo
https://twitter.com/chrispatuzzo
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

body {
  font-family: Helvetica, arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  padding: 30px;
  color: #333;
}

body > *:first-child {
  margin-top: 0 !important;
}

body > *:last-child {
  margin-bottom: 0 !important;
}

a {
  color: #4183C4;
  text-decoration: none;
}

a.absent {
  color: #cc0000;
}

a.anchor {
  display: block;
  padding-left: 30px;
  margin-left: -30px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 20px 0 10px;
  padding: 0;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  cursor: text;
  position: relative;
}

h2:first-child, h1:first-child, h1:first-child + h2, h3:first-child, h4:first-child, h5:first-child, h6:first-child {
  margin-top: 0;
  padding-top: 0;
}

h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor {
  text-decoration: none;
}

h1 tt, h1 code {
  font-size: inherit;
}

h2 tt, h2 code {
  font-size: inherit;
}

h3 tt, h3 code {
  font-size: inherit;
}

h4 tt, h4 code {
  font-size: inherit;
}

h5 tt, h5 code {
  font-size: inherit;
}

h6 tt, h6 code {
  font-size: inherit;
}

h1 {
  font-size: 28px;
  color: black;
}

h2 {
  font-size: 24px;
  border-bottom: 1px solid #cccccc;
  color: black;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 16px;
}

h5 {
  font-size: 14px;
}

h6 {
  color: #777777;
  font-size: 14px;
}

p, blockquote, ul, ol, dl, li, table, pre {
  margin: 15px 0;
}

hr {
  border: 0 none;
  color: #cccccc;
  height: 4px;
  padding: 0;
}

body > h2:first-child {
  margin-top: 0;
  padding-top: 0;
}

body > h1:first-child {
  margin-top: 0;
  padding-top: 0;
}

body > h1:first-child + h2 {
  margin-top: 0;
  padding-top: 0;
}

body > h3:first-child, body > h4:first-child, body > h5:first-child, body > h6:first-child {
  margin-top: 0;
  padding-top: 0;
}

a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {
  margin-top: 0;
  padding-top: 0;
}

h1 p, h2 p, h3 p, h4 p, h5 p, h6 p {
  margin-top: 0;
}

li p.first {
  display: inline-block;
}

ul, ol {
  padding-left: 30px;
}

ul :first-child, ol :first-child {
  margin-top: 0;
}

ul :last-child, ol :last-child {
  margin-bottom: 0;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  padding: 0;
  margin: 15px 0 5px;
}

dl dt:first-child {
  padding: 0;
}

dl dt > :first-child {
  margin-top: 0;
}

dl dt > :last-child {
  margin-bottom: 0;
}

dl dd {
  margin: 0 0 15px;
  padding: 0 15px;
}

dl dd > :first-child {
  margin-top: 0;
}

dl dd > :last-child {
  margin-bottom: 0;
}

blockquote {
  border-left: 4px solid #dddddd;
  padding: 0 15px;
  color: #777777;
}

blockquote > :first-child {
  margin-top: 0;
}

blockquote > :last-child {
  margin-bottom: 0;
}

table {
  padding: 0;
}
table tr {
  border-top: 1px solid #cccccc;
  background-color: white;
  margin: 0;
  padding: 0;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

table tr th {
  font-weight: bold;
  border: 1px solid #cccccc;
  text-align: left;
  margin: 0;
  padding: 6px 13px;
}

table tr td {
  border: 1px solid #cccccc;
  text-align: left;
  margin: 0;
  padding: 6px 13px;
}

table tr th :first-child, table tr td :first-child {
  margin-top: 0;
}

table tr th :last-child, table tr td :last-child {
  margin-bottom: 0;
}

img {
  max-width: 100%;
}

span.frame {
  display: block;
  overflow: hidden;
}

span.frame > span {
  border: 1px solid #dddddd;
  display: block;
  float: left;
  overflow: hidden;
  margin: 13px 0 0;
  padding: 7px;
  width: auto;
}

span.frame span img {
  display: block;
  float: left;
}

span.frame span span {
  clear: both;
  color: #333333;
  display: block;
  padding: 5px 0 0;
}

span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

span.align-center > span {
  display: block;
  overflow: hidden;
  margin: 13px auto 0;
  text-align: center;
}

span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

span.align-right > span {
  display: block;
  overflow: hidden;
  margin: 13px 0 0;
  text-align: right;
}

span.align-right span img {
  margin: 0;
  text-align: right;
}

span.float-left {
  display: block;
  margin-right: 13px;
  overflow: hidden;
  float: left;
}

span.float-left span {
  margin: 13px 0 0;
}

span.float-right {
  display: block;
  margin-left: 13px;
  overflow: hidden;
  float: right;
}

span.float-right > span {
  display: block;
  overflow: hidden;
  margin: 13px auto 0;
  text-align: right;
}

code, tt {
  margin: 0 2px;
  padding: 0 5px;
  white-space: nowrap;
  border: 1px solid #eaeaea;
  background-color: #f8f8f8;
  border-radius: 3px;
}

pre code {
  margin: 0;
  padding: 0;
  white-space: pre;
  border: none;
  background: transparent;
}

.highlight pre {
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

pre {
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

pre code, pre tt {
  background-color: transparent;
  border: none;
}

/* ----- mine: */
samp {
  border: 1px solid #cccccc;
  display: inline-block;
  background-color: #f8f8f8;
  border-radius: 3px;
  padding: 0 2px;
}
    </style>
  </head>
<body>`

const htmlEnd = () => `
</body>
</html>`

const markedOptions = {
  smartLists : true
}

const readBucketFile = async({ path, res, next }) => {
  try {
    // first, check if file exists.
    const file = bucket.file(path)
    const [exists] = await file.exists()
    if (exists) {
      const reader = file.createReadStream()
      reader.on('error', (err) => {
        console.error(`Error while reading file: ${err}`)
        res.status(500).send(`Error reading file '${path}': ${err}`).end()
      })

      // is the file an image type?
      const imageMatchResults = path.match(commonImageFiles)
      if (path.match(commonImageFiles)) {
        res.writeHead(200, { 'content-type' : `image/${imageMatchResults[1].toLowerCase()}` })
      }

      if (path.endsWith('.md')) {
        let markdown = ''
        reader.on('data', (d) => { markdown += d })
          .on('end', () => {
            const breadcrumbs = renderBreadcrumbs(path)
            res.send(`${htmlOpen(path)}\n\n${breadcrumbs}\n\n${marked(markdown, markedOptions)}\n\n${breadcrumbs}\n\n${htmlEnd()}`)
          })
      }
      else {
        reader.pipe(res)
      }
    }
    else { // No such file, send 404
      res.status(404).send(`No such file: '${path}'`).end()
    }
  }
  catch (err) {
    console.error(`Caught exception while processing '${path}'.`)
    res.status(500).send(`Error reading: ${path}`)
    return next(err) // for express error handling
  }
}

const startSlash = /^\//
const endSlash = /\/$/

const renderBreadcrumbs = (path, options) => {
  let output = ''
  if (!path || path === '') { return output }

  const { format = 'html' } = options || {}

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
    if (format === 'markdown') {
      output += `[${pathBits[i]}/](${linkBits[i]}) `
    }
    else { // default to HTML
      output += `<a href="${linkBits[i]}">${pathBits[i]}/</a> `
    }
  }

  return output
}

const renderFiles = ({ path, files, folders, res }) => {
  // Our 'path' comes in full relative from the root. However, we want to show only the relative bits.
  const deprefixer = new RegExp(`${path}/?`)
  // open up with some boilerplace HTML
  let html = `${htmlOpen(path)}
  <div id="breadcrumbs">
    ${renderBreadcrumbs(path)}
  </div>
  <h1>${path}</h1>`

  if (folders.length > 0) {
    html += `
  <h2 id="folders">Folders</h2>
    ${folders.length} total
  <ul>\n`
    folders.forEach(folder => {
      const localRef = folder.replace(deprefixer, '')
      html += `    <li><a href="${encodeURIComponent(localRef.replace(endSlash, ''))}/">${localRef}</a></li>\n`
    })

    html += '  </ul>'
  }

  if (files && files.length > 0) {
    html += `
  <h2 id="files">Files</h2>
  ${files.length} total
  <ul>\n`

    files.forEach(file => {
      const localRef = file.name.replace(deprefixer, '')
      html += `    <li><a href="${encodeURIComponent(localRef)}">${localRef}</a></li>\n`
    })

    html += '  </ul>'
  }
  html += htmlEnd()

  res.send(html).end()
}

const indexerQueryOptions = {
  delimiter                : '/',
  includeTrailingDelimiter : true,
  autoPaginate             : false // ?? necessary to see sub-folders
}

const indexBucket = async({ path, res, next }) => {
  try { // TODO: I think now that we asyncHandler, we can forgo generic try-catch blocks
    // We expect the root path to be ''; all others should end with a '/'
    if (path !== '' && !path.match(endSlash)) {
      res.redirect(301, `${path}/`).end()
    }

    const indexPath = `${path}index.html`
    const file = bucket.file(indexPath)
    const [exists] = await file.exists()
    if (exists) {
      return readBucketFile({ path : indexPath, res })
    }

    let folders = []
    const query = Object.assign({ prefix : path }, indexerQueryOptions)

    // OK, the Cloud Storage API (as of v5) is finicky and will only show you files in the 'await' version, e.g.:
    //
    // const [ files ] = await bucket.getFiles(query)
    //
    // In order to get the 'folders', you have to do to things:
    // 1) Inculde 'autoPaginate' in the query and
    // 2) Call using a callback method.
    //
    // In this form, you get to see the API response, which allows you to look at the 'prefixes' within the current search
    // prefix. These can be mapped to logical sub-folders in our bucket scheme.
    const indexPager = (err, files, nextQuery, apiResponse) => {
      if (err) {
        res.setStatus(500).send(`Error while processing results: ${err}`).end()
      }
      // all good!
      if (apiResponse.prefixes && apiResponse.prefixes.length > 0) {
        folders = folders.concat(apiResponse.prefixes)
      }

      if (nextQuery) {
        bucket.getFiles(nextQuery, indexPager)
      }
      else { // we've built up all the folders
        // If there's nothing here, treat as 404
        if ((!files || files.length === 0) && folders.length === 0) {
          res.status(404).send(`No such folder: '${path}'`).end()
        }
        else {
          renderFiles({ path, files, folders, res })
        }
      }
    }

    // here's where we actually kick everything off by doing the search.
    bucket.getFiles(query, indexPager)
  } // try
  catch (e) {
    res.status(500).send(`Explosion! ${e}`)
    return next(e) // for express error handling
  }
}

//

// request processing setup

// async because our handsers are async
const commonProcessor = (render) => async(req, res, next) => {
  // let userEmail = null
  try {
    // const ticket = await accessLib.verifyToken(req)
    await accessLib.verifyToken(req)
    // userEmail = ticket.payload.email
    // console.log(`Requesting user: ${userEmail}`)
  }
  catch (e) {
    console.error(`Exception while verifying access: ${e}`)
    res.status(401).send(`Request authorization token could not be verified.\n${e}`)
    return next(e)
  }

  // Cloud storage doesn't like an initial '/', so we remove any.
  const path = decodeURIComponent(req.path.replace(startSlash, ''))

  res.on('error', (err) => {
    console.error(`Error in the response output stream: ${err}`)
  })

  try {
    render({ path, res, next })
  }
  catch (e) {
    console.error(`Exception while rendering: ${e}`)
    res.status(500).send(`Exception encountered while rendering result: ${e}`)
    return next(e)
  }
}

app.get(fileRegex, asyncHandler(commonProcessor(readBucketFile)))
// if it's not a file, maybe it's a bucket.
app.get('*', asyncHandler(commonProcessor(indexBucket)))

// start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

export default app
