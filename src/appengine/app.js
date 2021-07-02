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



/*
const requestHandler = function (req, res) {
  const contents = `<!doctype html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title></title>
		<!--[if lt IE 9]>
		<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>
	<body>
  Hello world!
	</body>
</html>`
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(contents);
  fs.readFile(__dirname + "/index.html")
      .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
      })
      .catch(err => {
          res.writeHead(500);
          res.end(err);
          return;
      });
};*/
