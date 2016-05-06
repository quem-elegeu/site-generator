'use strict';
var fs = require('fs'),
    path = require('path'),
    diacritics = require('diacritics');

var download = require('./libs/download-image');

// ################################
// Download Brazilian States Flags
// ###############################
let states = require('../data/states'),
    statesAbbr = Object.keys(states);

let promises = [];
for (let i=0, len = statesAbbr.length; i<len; i++) {
    let abbr = statesAbbr[i],
        dataPath = path.join(process.cwd(), 'data', abbr, `candidates_${abbr}.json`),
        data = require(dataPath),
        baseDir = path.join(process.cwd(), 'src', 'images', 'candidates', abbr);

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }

    for (let c=0, total=data.length; c<total; c++) {
        let candidate = data[c];
        if (!candidate.urnaName) {
            continue;
        }

        let urnamName = diacritics.remove(candidate.fixName || candidate.urnaName).toLowerCase();
        urnamName = urnamName.replace(/[ªº"',_\(\)]/g, '').replace(/[\. ]/g, '-').replace(/\-\-/g, '-').replace(/\-\-/g, '-');
        let name = urnamName,
            code = urnamName.replace(/[ \-]/g, '').substr(0, 4)+candidate.candidate,
            c1 = code.substr(0,2), c2 = code.substr(2, 2),
            imgUrl = `http://static.eleicoes2014.com.br/upload/images/${c1}/${c2}/${name}`,
            imgPath = path.join(baseDir, ''+candidate.candidate);

        if (candidate.image) {
            imgUrl = candidate.image.replace('.jpg', '');
        }

        let files = [
            {url: `${imgUrl}_s.jpg`, file: `${imgPath}-60x84.png`},
            {url: `${imgUrl}.jpg`, file: `${imgPath}-161x225.png`},
            {url: `${imgUrl}_fbs.jpg`, file: `${imgPath}-card-500x262.png`}
        ];

        if (files.every(f => fs.existsSync(f.file))) {
            continue;
        }

        let promise = Promise.all(
            files.map(f => download(f.url,  f.file))
        ).then(() => {
            console.log('done', abbr, candidate.party, candidate.urnaName);
        });
        promises.push(promise);
    }
}

Promise.all(promises).then(() => {
    console.log('end');
}).catch(err => {
    console.log(err.message, err.stack);
});