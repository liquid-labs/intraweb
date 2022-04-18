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
import marked from 'marked'
// GCP AppEngine and CloudStorage support
import gcpMetadata from 'gcp-metadata'
import { Storage } from '@google-cloud/storage'
import yaml from 'js-yaml'

import { setupAccessLib } from './lib/access.js' // the '.js' allows us to run directly with node
import { setupAuthorization } from './lib/authorization.js'
improt { endSlash, PATH_INPUT_FILE } from './lib/constants.js'
// local file support
import { localAccessLib, localBucket } from './lib/local-lib.js'
import { getReadStream } from './lib/read-stream'
import { renderBreadcrumbs } from './lib/render-breadcrumbs'
import { renderIndex } from './lib/render-index'
import { htmlEnd, htmlOpen } from './lib/templates.js'

let accessLib, bucket

const isProduction = process.env.NODE_ENV
const projectId = process.env.GOOGLE_CLOUD_PROJECT

if (isProduction === 'production') {
  // have to use the 'metadata' server for project number
  const isAvailable = await gcpMetadata.isAvailable()
  if (!isAvailable) { // TODO: Support fallback modes and 'unverified' access when configured for it
    throw new Error('Metadata not available, cannot proceed.')
  }

  const projectNumber = await gcpMetadata.project('numeric-project-id')

  // setup access checker
  accessLib = setupAccessLib({ projectId, projectNumber })

  // setup storage stuff
  const storage = new Storage()

  const bucketId = process.env.BUCKET
  if (!bucketId) {
    throw new Error("No 'BUCKET' environment variable found (or is empty).")
  }
  // Useful info for the logs.
  console.log(`Connecting to bucket: ${bucketId}`)
  bucket = storage.bucket(bucketId)
}
else {
  accessLib = localAccessLib
  bucket = localBucket
  const localRoot = process.argv[2]
  console.log(`Setting local root to: ${localRoot}`)
  localBucket.setRoot(localRoot)
}

// now we look for an access authorization file
const accessAuthorizations = bucket.file('_access-authorizations.json')
const [ accessAuthorizationsExist ] = await accessAuthorizations.exists()

// TODO: move to lib
// credit: https://stackoverflow.com/a/49428486/929494
const streamToString = ( stream ) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

let authorizer
if ( accessAuthorizationsExist ) {
  const fileStream = accessAuthorizations.createReadStream()

  const accessAuthStr = await streamToString(fileStream)
  const accessRules = JSON.parse(accessAuthStr)

  authorizer = setupAuthorization({ accessRules })
}
else {
  console.log("No '_access-authorizations.json' file found.")
  authorizer = { verifyAuthorization : () => true }
}

// setup web server stuff
const app = express()
app.set('trust proxy', true)
const PORT = process.env.PORT || 8080

const fileRegex = /.*\.[^./]+$/
const commonImageFiles = /\.(jpg|png|gif)$/i

const markedOptions = {
  smartLists : true
}

const readBucketFile = async({ path, res, next }) => {
  try {
    const reader = getFileReader({ next, path, res }) // throws if there are issues
    if (reader === false) { // and returns 'false' if the path does not exist; 404 already sent
      return
    }

    // is the file an image type?
    const imageMatchResults = path.match(commonImageFiles)
    if (path.match(commonImageFiles)) {
      res.writeHead(200, { 'content-type' : `image/${imageMatchResults[1].toLowerCase()}` })
    }

    if (path.endsWith('.md')) {
      let markdown = ''
      reader
        .on('data', (d) => { markdown += d })
        .on('end', () => {
          const breadcrumbs = renderBreadcrumbs(path)
          res.send(`${htmlOpen({ path })}\n\n${breadcrumbs}\n\n${marked(markdown, markedOptions)}\n\n${breadcrumbs}\n\n${htmlEnd()}`)
        })
    }
    else {
      reader.pipe(res)
    }
  }
  catch (err) {
    console.error(`Caught exception while processing '${path}'.`)
    res.status(500).send(`Error reading: ${path}`)
    return next(err) // for express error handling
  }
}

const startSlash = /^\//

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
        res.status(500).send(`Error while index processing results: ${err}`).end()
        return
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
          renderIndex({ path, files, folders, res })
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
  let ticket
  try {
    ticket = await accessLib.verifyToken(req)
  }
  catch (e) {
    console.error(`Exception while verifying access: ${e}`)
    res.status(401).send(`Request authorization token could not be verified.\n${e}`)
    return next(e)
  }

  // Cloud storage doesn't like an initial '/', so we remove any.
  const path = decodeURIComponent(req.path.replace(startSlash, ''))

  if (process.env.NODE_ENV === 'production') {
    const userEmail = ticket.payload.email

    const authorized = await authorizer.verifyAuthorization({ user : userEmail, path })
    if (!authorized) {
      res.status(403).send(`${htmlOpen({ path : `FORBIDDEN: ${path}` })}\n\nYou do not have access to '${path}'.${htmlEnd()}`)
      return
    }
  }

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
  if (process.env.NODE_ENV !== 'production') {
    console.log(`To quit server:\nkill ${process.pid}`)
  }
})

export default app
