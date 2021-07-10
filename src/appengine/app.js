/**
* The basic flow is:

* 1. Determine bucket config and connect.
* 2. Listen.
* 3. Examine incoming requests.
*   3.1 If there's a suffix, pass handling to the file handler.
*   3.2 Everything else is assumed to be a directory reference. Pass handling to the directory indexer.
* 4. Back to listening.
*/
'use strict';

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
console.log(`Servinging project ${projectId}`);

// setup storage stuff
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const bucketId = process.env.BUCKET;
if (!bucketId) {
  throw new Error("No 'BUCKET_ID' environment variable found (or is empty).")
}
// Useful info for the logs.
console.log(`Requesting bucket: ${bucketId}`);
const bucket = storage.bucket(bucketId);
console.log(`Got bucket: ${bucket.id} | ${bucket.name} | ${bucket}`)

// setup web server stuff
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const readBucketFile = async ({ path, res }) => {
  console.log(`Processing '${path}' as a file...`)
  /*
  bucket.exists(path, (err, exists) => {
    if (err) {
      res.setSsend(err).end();
      return;
    }

    if (!exists) {
      res.send(`No such file: ${path}`).end();
    }
    else {*/
    try {
      const file = await bucket.file(path);
      console.log(`Data for '${path}'; setting up stream.`)
      const reader = file.createReadStream();
      reader.on('error', (err) => {
        console.log(`Error while reading file: ${err}`);
        res.status(500).send(`Error reading file '${path}': ${err}`).end();
      })
      console.log(`Piping file data for '${path}...'`);
      reader.pipe(res);
      console.log(`Processing complete for '${path}'.`);
    }
    catch (err) {
      console.log(`Caught exception while processing '${path}'.`);
      req.status(500).send(`Error reading: ${path}`).end()
      next(err)
    }
    /*}
  })*/
}

const indexerOptions = {
  delimiter: '/',
  includeTrailingDelimiter: true
}

const renderFiles = ({ path, files, res }) => {
  console.log(`Rendering '${path}' files...`);
  let html =`<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title></title>
  <!--[if lt IE 9]>
  <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
  <h1>${path}</h1>
  <h2>Files</h2>
  ${files.length} total
  <ul>\n`;
  files.forEach(file => {
    html += `<li>${file.name}</li>`;
  });
/*  const nest = '      ';
  for (const file of files) {
    const label = file.name();
    const url = `./${label}`;

    html += `${nest}<li><a href="${url}">${label}</li>\n`
  }*/

  html += `
    </ul>
  </body>
</html>`;

  console.log(`Sending results for '${path}'...`);
  res.send(html).end();
  console.log(`Finished rendering '${path}'.`);
}

const indexBucket = async ({ path, res }) => {
  console.log(`Processing '${path}' as index listing...`)
  const query = Object.assign({ prefix: path }, indexerOptions)
  // let files = [];

  try {
    const [files] = await bucket.getFiles(query);
    console.log(`Retrieved ${files && files.length} files.`);

    renderFiles({ path, files, res });
  }
  catch (e) {
    res.status(500).send(`Explosion! ${e}`).end();
  }
/*
  const indexQueryHandler = (err, filesPage, nextQuery, apiResponse) => {
    if (err) {
      res.status(500).send(`Explosion! ${err}`).end();
      console.error(err);
      return; // Error?! We are done.
    }
    // else no errors here!

    if (nextQuery) { // More results exist.
      bucket.getFiles(nextQuery, indexQueryHandler);
    }
    else { // time to render
      renderFiles(path, files, res, { err, filesPage, nextQuery, apiResponse });
    }

    files = files.concat(pageFiles);
  }

  bucket.getFiles(query, indexQueryHandler);
  */
}

// request processing setup
const pathStripper = /\//; // new RegExp(`${projectId}//`);

const commonProcessor = (render) => (req, res) => {
  const path = req.path.replace(pathStripper, '');
  console.log(`path: ${path}`);

  res.on('error', (err) => {
    console.log(`Error in the response output stream: ${err}`);
  })

  try {
    render({ path, res });
  }
  catch (e) {
    console.error(`Exception while rendering: ${e}`);
    res.status(500).send(`Explosion: ${err}`).end();
  }
}

const fileRegex = /.*\.[^./]+$/;
app.get(fileRegex, commonProcessor(readBucketFile));

// if it's not a file, maybe it's a bucket.
app.get('*', commonProcessor(indexBucket));

/*
app.get('/', (req, res) => readBucketFile('index.html', res));

app.get('/*', (req, res) => {
  const path = req.path.replace(deslasher, '');
  readBucketFile(path, res);
})
*/

// start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
