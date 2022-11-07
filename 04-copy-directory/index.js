const fs = require('fs');
const path = require('path');
const pathToDir = '04-copy-directory';
const pathToFilesHolder = path.join(pathToDir, 'files');
const pathToCopyFilesHolder = path.join(pathToDir, 'files-copy');

fs.rm(pathToCopyFilesHolder, { recursive: true }, () => {
  fs.mkdir(pathToCopyFilesHolder, { recursive: true }, err => {
    if (err) throw err;
  })
  
  
  fs.readdir(pathToFilesHolder, 'utf8', (err, files) => {
    if (err) throw err;
    
    for (let file of files) {
      fs.copyFile(path.join(pathToFilesHolder, file), path.join(pathToCopyFilesHolder, file),err => {
        if(err) throw err; // не удалось скопировать файл
     })
    }
  });
});