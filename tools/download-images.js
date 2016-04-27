'use strict';
var fs = require('fs'),
    path = require('path'),
    request = require('request');

var download = function(uri, filename, callback){
    request.head(uri, function(err, res){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

// ################################
// Download Brazilian States Flags
// ###############################
let states = require('../data/states'),
    statesAbbr = Object.keys(states);

for (let i=0, len = statesAbbr.length; i<len; i++) {
    let abbr = statesAbbr[i],
        state = states[abbr],
        imgPath = path.join(process.cwd(), 'src', 'images', 'states', `${abbr}-512x512.png`);
    download(state.image, imgPath, function () {
        console.log('done', abbr);
    });
}