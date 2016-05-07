'use strict';

let path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    app = express();

// use logger
app.use(morgan('dev'));
app.use(express.static('www'));

let port = 3020;

// Bind to a port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});