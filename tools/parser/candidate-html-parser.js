'use strict';
const jsdom = require('jsdom');
const $defaults = require('./defaults-parser');

module.exports = (html, cand) => new Promise(resolve => {
    jsdom.env({
        html,
        src: [$defaults.jquery],
        done: function (err, window) {
            let $ = window.jQuery,
                content = $('#main-content');

            cand.image = content.find('img.candidate-image').attr('src');
            cand.imageCard = content.find('img.candidate-image-card').attr('src');
            cand.desc = content.find('p[itemprop=description]').text();

            let data1 = content.find('p:contains(Naturalidade:)').html().split('<br>'),
                data2 = content.find('p:contains(Nome para urna:)').html().split('<br>'),
                code = '</strong>';
            cand.number = data2[0].split(code)[1].trim();
            cand.fullname = data1[0].split(code)[1].trim();
            cand.urnaName = data2[1].split(code)[1].trim();
            //let group = data2[5].split(code)[1].split(/\s*\(/);
            //cand.group = {
            //    name: group[0].trim(),
            //    parties: group[1] && group[1].replace(')', '').split(/\s*\/\s*/) || group[1].trim()
            //};

            resolve(cand);
        }
    });
});
