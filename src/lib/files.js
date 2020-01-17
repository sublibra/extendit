const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  openZip: (fileName) => {
    if (!fs.existsSync(fileName[0])) {
      throw `File doesn't exists`;
    };

    return new JSZip.external.Promise((resolve, reject) => {
      fs.readFile(fileName[0], (err, data) => {
        if (err) {
          reject(e);
        } else {
          resolve(JSZip.loadAsync(data));
        }
      });
    });
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  }
};