const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  getFile: (fileName) => {
    if (!fs.existsSync(fileName)) {
      throw `File doesn't exists: ` + fileName;
    };
    return fs.readFileSync(fileName);
  },

  openZip: (fileName) => {
    if (!fs.existsSync(fileName[0])) {
      throw `File doesn't exists`;
    };

    return new JSZip.external.Promise((resolve, reject) => {
      fs.readFile(fileName[0], (err, data) => {
        if (err) {
          reject(err);
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