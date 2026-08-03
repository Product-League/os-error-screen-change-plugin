const fs = require('fs'),
      path = require('path'),
      cheerio = require('cheerio'),
      utils = require("./utils");

module.exports = function (context) {
    
    const selector = '#error-screen-wrapper';

    const directoryPath = context.opts.projectRoot + '/www'; 
    const android_directoryPath = context.opts.projectRoot + '/platforms/android/app/src/main/assets/www';
    const ios_directoryPath = context.opts.projectRoot + '/platforms/ios/www';

    const targetFilePath = findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = findFileWithWordSync(android_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    
    console.log('start changing the _error.html');

    replaceHtmlContent(sourceFilePath, targetFilePath, selector);
    replaceHtmlContent(source2FilePath, targetFilePath, selector);

    console.log('end changing the _error.html');

}




