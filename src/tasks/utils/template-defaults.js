'use strict';
const paths = require('./paths');

module.exports = (obj) => {
    let baseUrl = paths.url,
        baseTitle = 'Quem Elegeu?';
    let tpl = obj || {};

    tpl.baseTile = baseTitle;
    tpl.title = baseTitle;
    tpl.baseUrl = baseUrl;
    tpl.url = baseUrl;
    tpl.desc = 'Onde nossos deputados conseguiram os votos necessários para chegar no poder?';
    tpl.imageUrl = `${tpl.url}/images/quem-elegeu-1.jpg`;

    tpl.timeHash = '?t=' + new Date().toJSON();

    return tpl;
};
