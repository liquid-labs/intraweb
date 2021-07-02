'use strict';

// setup storage stuff
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// setup web server stuff
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});


// start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
