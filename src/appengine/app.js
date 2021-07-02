'use strict';

// setup storage stuff
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET);

// setup web server stuff
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const deslasher = /^\//

const piper = (path, res) => {
  const file = bucket.file(path);
  const reader = file.createReadStream();
  reader.pipe(res);
}

app.get('/', (req, res) => piper('index.html', res));

app.get('/*', (req, res) => {
  const path = req.path.replace(deslasher, '');
  piper(path, res);
})

// start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
