var moment = require('moment');
var generateMsg = (from, text) => {
    return {
        'from': from,
        'text': text,
        'createdAt': moment().valueOf()
    };
};

module.exports = { generateMsg };