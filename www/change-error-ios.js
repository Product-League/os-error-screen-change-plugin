const utils = require("./utils");

module.exports = function (context) {
    
    const selector = '#error-screen-wrapper';

    const directoryPath = context.opts.projectRoot + '/www'; 
    const ios_directoryPath = context.opts.projectRoot + '/platforms/ios/www';

    const targetFilePath = utils.findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = utils.findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = utils.findFileWithWordSync(ios_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    
    console.log('start changing the _error.html');

    utils.replaceHtmlContent(sourceFilePath, targetFilePath, selector);
    utils.replaceHtmlContent(source2FilePath, targetFilePath, selector);

    console.log('end changing the _error.html');

}
