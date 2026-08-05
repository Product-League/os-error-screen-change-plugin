const utils = require("../utils/utils");

module.exports = function (context) {
    utils.generateNewErrorHTLMs(context, context.opts.cordova.platforms[0])
}
