const fs = require('fs'),
      path = require('path');
const { parse } = require('node-html-parser');


// Function to read file content synchronously
const readFileSync = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    throw err;
  }
};


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


module.exports = {
    readFileSync,
    replaceHtmlContent,
    findFileWithWordSync
}


