'use strict';
const path = require('path');
const pack = require('../../../package');

module.exports = Object.freeze({
    pack,
    url: `https://quem-elegeu.github.io/`,
    template: path.join(__dirname, '..', '..', 'template'),
    partial: path.join(__dirname, '..', '..', 'partials'),
    www: path.join(process.cwd(), 'www')
});
