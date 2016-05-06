'use strict';
var fs = require('fs'),
    path = require('path');

var download = require('./libs/download-image');

// ################################
// Download Brazilian States Flags
// ###############################
let states = require('../data/states'),
    statesAbbr = Object.keys(states);

let promise = Promise.resolve();
for (let i=0, len = statesAbbr.length; i<len; i++) {
    let abbr = statesAbbr[i],
        state = states[abbr],
        imgPath = path.join(process.cwd(), 'src', 'images', 'states', `${abbr}-512x512.png`);
    promise = promise.then(() => download(state.image, imgPath).then(() => {
        console.log('done', abbr);
    }));
}

promise.then(() => {
    console.log('end');
}).catch(err => {
    console.log(err.message, err.stack);
});