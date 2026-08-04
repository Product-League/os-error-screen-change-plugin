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
    
  // Get the platform (android or ios)
    const platform = context.opts.cordova.platforms[0];
      //Get the preference with the JS file to be executed by the error screen
    const parser = ExtendedConfigParser.createInstance(context);
    const preferenceValue = parser.getPreferenceValue(PREFERENCE_NAME, platform);
    let errorJSContent = null;

    const directoryPath = context.opts.projectRoot + '/www'; 
    const ios_directoryPath = context.opts.projectRoot + '/platforms/ios/www';
    const error_jsPath = "/MijnHollandZorgApp/" + path.basename(utils.findFileWithWordSync(directoryPath, 'custom-error'));
    
    const errorJSPath = directoryPath + "/" + path.basename(utils.findFileWithWordSync(directoryPath, 'custom-error'));
    
    if (preferenceValue) {
        try {
            // Decode the base64-encoded value
            const decodedValue = Buffer.from(preferenceValue, 'base64').toString('utf-8');
            errorJSContent = decodedValue.trim();
            fs.writeFileSync(errorJSPath, errorJSContent);
        } catch (e) {
            console.log('Invalid base64-encoded value for preference ' + PREFERENCE_NAME);
            return;
        }
    }

      
    const selector = '#error-screen-wrapper';

    const targetFilePath = utils.findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = directoryPath + "/_error.html";//utils.findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = ios_directoryPath + "/_error.html";//utils.findFileWithWordSync(ios_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    const source3FilePath = directoryPath + "/error.html";//utils.findFileWithWordSync(directoryPath, 'error.html');
    console.log('Source3 file path:', source3FilePath);
    const source4FilePath = ios_directoryPath + "/error.html";//utils.findFileWithWordSync(ios_directoryPath, 'error.html');
    console.log('Source4 file path:', source4FilePath);
    
    console.log('start changing the _error.html');

    utils.replaceHtmlContent(sourceFilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source2FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source3FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source4FilePath, targetFilePath, selector, error_jsPath);

    console.log('end changing the _error.html');

}
