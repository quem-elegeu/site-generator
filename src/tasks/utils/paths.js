'use strict';
const path = require('path');

module.exports = Object.freeze({
    url: `https://quem-elegeu.github.io/`,
    template: path.join(__dirname, '..', '..', 'template'),
    partial: path.join(__dirname, '..', '..', 'partials'),
    www: path.join(process.cwd(), 'www')
});
