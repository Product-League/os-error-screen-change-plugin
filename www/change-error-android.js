const path = require('path');
const fs = require('fs');
const PREFERENCE_NAME = 'CustomErrorJS';
const utils = require("../utils/utils");

let ExtendedConfigParser;
try {
    ExtendedConfigParser = require('../utils/extendedConfigParser');
} catch (e) {
    console.error('Failed to require extendedConfigParser:', e.message);
    console.error(e.stack);
    throw e;
}



module.exports = function (context) {

    utils.generateNewErrorHTLMs(context, context.opts.cordova.platforms[0])

}




