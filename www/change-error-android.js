console.log('STEP0');
const path = require('path');
console.log('STEP0.1');
const fs = require('fs');
console.log('STEP1.1');
const ExtendedConfigParser2 = require('./utils/extendedConfigParser');
console.log('STEP1.2');
const PREFERENCE_NAME = 'CustomErrorJS';
const utils = require("./utils/utils");
console.log('STEP1.3');

module.exports = function (context) {
console.log('STEP1');
      // Get the platform (android or ios)
    const platform = context.opts.cordova.platforms[0];
      //Get the preference with the JS file to be executed by the error screen
    const parser = ExtendedConfigParser2.createInstance(context);
    const preferenceValue = parser.getPreference(PREFERENCE_NAME, platform);
      console.log('STEP2');
    let errorJSContent = null;
    const errorJSPath = path.join('www','custom-error.js');
      console.log('STEP3');
    if (preferenceValue) {
        try {
            // Decode the base64-encoded value
              console.log('STEP4');
            const decodedValue = Buffer.from(preferenceValue, 'base64').toString('utf-8');
            errorJSContent = decodedValue.trim();
              console.log('STEP5');
            fs.writeFileSync(errorJSPath, errorJSContent);
        } catch (e) {
            console.log('Invalid base64-encoded value for preference ' + PREFERENCE_NAME);
            return;
        }
    }

      
    const selector = '#error-screen-wrapper';
console.log('STEP6');
    const directoryPath = context.opts.projectRoot + '/www'; 
    const android_directoryPath = context.opts.projectRoot + '/platforms/android/app/src/main/assets/www';
    const error_jsPath = "/MijnHollandZorgApp/custom-error.js" //+ path.basename(utils.findFileWithWordSync(directoryPath, 'custom-error'));
console.log('STEP7');
    const targetFilePath = utils.findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = directoryPath + "/_error.html";//utils.findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = android_directoryPath + "/_error.html";//utils.findFileWithWordSync(android_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    const source3FilePath = directoryPath + "/error.html";//utils.findFileWithWordSync(directoryPath, 'error.html');
    console.log('Source3 file path:', source3FilePath);
    const source4FilePath = android_directoryPath + "/error.html";//utils.findFileWithWordSync(android_directoryPath, 'error.html');
    console.log('Source4 file path:', source4FilePath);
    
    console.log('start changing the _error.html');

    utils.replaceHtmlContent(sourceFilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source2FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source3FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source4FilePath, targetFilePath, selector, error_jsPath);

    console.log('end changing the _error.html');
}




