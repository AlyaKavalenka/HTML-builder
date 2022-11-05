const fs = require('fs');
const filesPath = '03-files-in-folder\\secret-folder';
const path = require('path');

fs.readdir(filesPath, 'utf8', (err, files) => {
  if (err) throw err;

  for (let file of files) {
    let currentFilePath = path.join(filesPath, file);
    let currentFileName = path.parse(currentFilePath).name;
    let currentFileExt = path.parse(currentFilePath).ext;
    fs.stat(currentFilePath, function(err, stats) {
      if (stats.isFile()) {
        let currentFileSize = stats["size"]/1028;
        console.log(currentFileName + ' - ' + currentFileExt.toString().replace(".", "") + ' - ' + currentFileSize.toFixed(2) + 'kb');
      }
    });
  }
});