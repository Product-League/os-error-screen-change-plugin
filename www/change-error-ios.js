const utils = require("./utils");

module.exports = function (context) {
    
    const selector = '#error-screen-wrapper';

    const directoryPath = context.opts.projectRoot + '/www'; 
    const ios_directoryPath = context.opts.projectRoot + '/platforms/ios/www';
    const error_jsPath = utils.findFileWithWordSync(directoryPath, 'custom-error');

    const targetFilePath = utils.findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = utils.findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = utils.findFileWithWordSync(ios_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    const source3FilePath = utils.findFileWithWordSync(directoryPath, 'error.html');
    console.log('Source file path:', sourceFilePath);
    const source4FilePath = utils.findFileWithWordSync(ios_directoryPath, 'error.html');
    console.log('Source2 file path:', source2FilePath);
    
    console.log('start changing the _error.html');

    utils.replaceHtmlContent(sourceFilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source2FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source3FilePath, targetFilePath, selector, error_jsPath);
    utils.replaceHtmlContent(source4FilePath, targetFilePath, selector, error_jsPath);

    console.log('end changing the _error.html');

}
