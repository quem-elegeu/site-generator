'use strict';
const jsdom = require('jsdom');
const $defaults = require('./defaults-parser');

module.exports = (html, pages) => new Promise(resolve => {
    let candidates = {};
    jsdom.env({
        html,
        src: [$defaults.jquery],
        done: function (err, window) {
            let $ = window.jQuery,
                list = $('.results-block-candidate .candidate');

            list.each(function() {
                let data = $(this),
                    txt = data.text().trim(),
                    num = txt.substr(txt.length - 5).trim();
                if (candidates[num]) {
                    return;
                }
                candidates[num] = {
                    path: data.attr('href')
                };
            });

            resolve(candidates);
        }
    });
});
