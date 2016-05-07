'use strict';
const paths = require('./paths');

module.exports = (obj) => {
    let baseUrl = paths.url,
        baseTitle = 'Quem Elegeu?';
    let tpl = obj || {};

    tpl.baseTile = baseTitle;
    tpl.title = baseTitle;
    tpl.baseUrl = baseUrl;
    tpl.version = paths.pack.version;
    tpl.url = baseUrl;
    tpl.desc = 'Onde nossos deputados conseguiram os votos necessários para chegar no poder?';
    tpl.imageUrl = `/images/quem-elegeu-1-${tpl.version}.jpg`;

    tpl.timeHash = '?t=' + new Date().toJSON();

    return tpl;
};
