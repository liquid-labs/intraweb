'use strict';

// setup storage stuff
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET);

// setup web server stuff
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  const file = bucket.file('index.html');
  const [ data ] = await file.get();
  res.status(200).send(data).end();
});


// start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
