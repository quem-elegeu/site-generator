'use strict';
const fs = require('fs');
const path = require('path');
const diacritics = require('diacritics');

const download = require('./libs/download-html');
const listParser = require('./parser/list-html-parser');
const candParser = require('./parser/candidate-html-parser');

// ################################
// Download Brazilian States Flags
// ###############################
let states = require('../data/states'),
    statesAbbr = Object.keys(states);

let promises = [];
for (let i=0, len = statesAbbr.length; i<len; i++) {
    let abbr = statesAbbr[i],
        state = states[abbr],
        _name = diacritics.remove(state.name).replace(/ /g, '-').toLowerCase(),
        baseUrl = `http://www.eleicoes2014.com.br/candidatos-deputado-federal-${_name}/`,
        candidates = require(`../data/${abbr}/candidates_${abbr}`),
        pages = candidates.length / 50;
    if (Math.round(pages) < pages) pages++;

    let promise = download(baseUrl).then(body => {
        return listParser(body, pages);
    }).then(res => {
        let keys = Object.keys(res),
            cProm = Promise.resolve();
        for (let c = 0; c < keys.length; c++) {
            let num = keys[c],
                cand = res[num],
                candUrl = `http://www.eleicoes2014.com.br${cand.path}`;
            let find = new Promise(resolve => {
                for (let a=0; a<candidates.length; a++) {
                    let cc = candidates[a];
                    if (cc.candidate == num) {
                        return resolve(cc);
                    }
                }
            });

            cProm = cProm.then(() => {
                return download(candUrl);
            }).then(body => {
                return Promise.all([find, candParser(body, cand)]);
            }).then((results) => {
                let org = results[0];
                if (!org) console.log(cand);
                Object.keys(cand).forEach(k => {
                    if (cand[k]) org[k] = cand[k];
                });
            });
        }
        return cProm;
    }).then(() => {
        let filePath = path.join(__dirname, '..', 'data', abbr, `candidates_${abbr}.json`);
        fs.writeFileSync(filePath, JSON.stringify(candidates, 0, '  '), 'utf8');
    });
    promises.push(promise);
}

Promise.all(promises).then(() => {
    console.log('end');
}).catch(err => {
    console.log(err.message, err.stack);
});
