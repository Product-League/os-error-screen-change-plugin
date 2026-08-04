const utils = require("./utils"),
      path = require('path');

module.exports = function (context) {
    
    const selector = '#error-screen-wrapper';

    const directoryPath = context.opts.projectRoot + '/www'; 
    const android_directoryPath = context.opts.projectRoot + '/platforms/android/app/src/main/assets/www';
    const error_jsPath = "/MijnHollandZorgApp/" + path.basename(utils.findFileWithWordSync(directoryPath, 'custom-error'));

    const targetFilePath = utils.findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = utils.findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = utils.findFileWithWordSync(android_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    const source3FilePath = utils.findFileWithWordSync(directoryPath, 'error.html');
    console.log('Source3 file path:', source3FilePath);
    const source4FilePath = utils.findFileWithWordSync(android_directoryPath, 'error.html');
    console.log('Source4 file path:', source4FilePath);
    
    console.log('start changing the _error.html');

    utils.replaceHtmlContent(sourceFilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source2FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source3FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source4FilePath, targetFilePath, selector, error_jsPath);

    console.log('end changing the _error.html');
}




