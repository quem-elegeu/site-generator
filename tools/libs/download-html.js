'use strict';
const request = require('request');

module.exports = (url) => {
    let options = {
        url,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    };
    console.log('start downloading', url);
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                console.log(response.headers);
                console.log('Err', url, response && response.statusCode, error);
                reject({error, response});
            }
        });
    });
};
