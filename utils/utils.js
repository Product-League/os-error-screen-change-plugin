const fs = require('fs'),
  path = require('path');
const { parse } = require('node-html-parser');
const ConfigParser = require('cordova-common').ConfigParser;

// Function to read file content synchronously
const readFileSync = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    throw err;
  }
};


function getAppName(configPath) {
    const config = new ConfigParser(configPath);
    return config.getPreference('DefaultApplicationURL');
}


// Main function to perform the replacement
const replaceHtmlContent = (sourceFilePath, targetFilePath, selector, scriptFileName) => {
  try {

    const sourceHtml = readFileSync(sourceFilePath);
    const targetHtml = readFileSync(targetFilePath);

    const source = parse(sourceHtml);
    const target = parse(targetHtml); // parsed literally, no head/body hoisting

    // Remove any old inline script tags in body (from previous default content)
    source.querySelectorAll('body script').forEach((el) => el.remove());

    const el = source.querySelector(selector);
    if (!el) throw new Error(`Selector "${selector}" not found in source`);

    // Inject just the fragment content
    el.set_content(target.toString());

    // Append an external script reference instead of inline code
    const body = source.querySelector('body');
    if (!body) throw new Error('No <body> found in source HTML');
    body.insertAdjacentHTML('beforeend', `<script src="${scriptFileName}"></script>`);

    fs.writeFileSync(sourceFilePath, source.toString());
    console.log('The HTML content has been replaced and saved as "_error.html"');

  } catch (err) {
    console.error('Error:', err);
  }
};


// Function to find a file with a name that includes a specific word in a directory
const findFileWithWordSync = (directoryPath, word) => {
  try {

    const files = fs.readdirSync(directoryPath);

    // Find the first file that includes the specific word in its name
    const matchingFile = files.find(file => file.includes(word));

    if (matchingFile) {
      // Return the full path of the matching file
      return path.join(directoryPath, matchingFile);
    } else {
      console.log(`No files found with the word "${word}" in their names.`);
      return null;
    }
  } catch (err) {
    console.error(`Error reading directory ${directoryPath}:`, err);
    throw err;
  }
};

// Main function to generate the new error html files
const generateNewErrorHTLMs = (context, platform) => {
  try {
    
    const directoryPath = context.opts.projectRoot + '/www';

    let platform_directoryPath = "";
    let cofigPath = "";
    if (platform == "ios") {
      platform_directoryPath = context.opts.projectRoot + '/platforms/ios/www';
      cofigPath: "/platforms/ios/PLUS/config.xml";
    }
    else {
      platform_directoryPath = context.opts.projectRoot + '/platforms/android/app/src/main/assets/www';
      cofigPath: "/platforms/android/app/src/main/res/xml/config.xml";
    }


    const appName = getAppName(context.opts.projectRoot + configPath);
    console.log("App name:", appName);

    const errorJS_PublicPath = "/" + appName + "/" + "custom-error.js";

    const errorJS_UploadedPath = platform_directoryPath + "/custom-error.js";
    let errorJSContent = null;
    try {
      errorJSContent = readFileSync(errorJS_UploadedPath);
      fs.writeFileSync(errorJS_PublicPath, errorJSContent);
    } catch (e) {
      console.log('Invalid custom-error.js file.');
      return;
    }



    const selector = '#error-screen-wrapper';

    const targetFilePath = findFileWithWordSync(directoryPath, 'customError');
    console.log('Target file path:', targetFilePath);
    const sourceFilePath = directoryPath + "/_error.html";//findFileWithWordSync(directoryPath, '_error.html');
    console.log('Source file path:', sourceFilePath);
    const source2FilePath = platform_directoryPath + "/_error.html";//findFileWithWordSync(platform_directoryPath, '_error.html');
    console.log('Source2 file path:', source2FilePath);
    const source3FilePath = directoryPath + "/error.html";//findFileWithWordSync(directoryPath, 'error.html');
    console.log('Source3 file path:', source3FilePath);
    const source4FilePath = platform_directoryPath + "/error.html";//findFileWithWordSync(platform_directoryPath, 'error.html');
    console.log('Source4 file path:', source4FilePath);

    console.log('start changing the _error.html');

    replaceHtmlContent(sourceFilePath, targetFilePath, selector, errorJS_UploadedPath);
    replaceHtmlContent(source2FilePath, targetFilePath, selector, errorJS_UploadedPath);
    replaceHtmlContent(source3FilePath, targetFilePath, selector, errorJS_UploadedPath);
    replaceHtmlContent(source4FilePath, targetFilePath, selector, errorJS_UploadedPath);

    console.log('end changing the _error.html');

  } catch (err) {
    console.error('Error:', err);
  }
};


module.exports = {
  readFileSync,
  replaceHtmlContent,
  findFileWithWordSync,
  generateNewErrorHTLMs
}


