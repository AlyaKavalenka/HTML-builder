const fs = require('fs');
const path = require('path');
const pathToFile = '05-merge-styles\\project-dist\\bundle.css';
const pathToStyles = '05-merge-styles\\styles';

fs.open(pathToFile, 'w', (err) => {
  if (err) throw err;
  console.log('File created');
});

fs.readdir(pathToStyles, 'utf8', function (err, files) {
  if (err) throw err;

  for (let file of files) {
    let currentFilePath = path.join(pathToStyles, file);
    let currentFileExt = path.parse(currentFilePath).ext;

    fs.stat(currentFilePath, function (err, stats) {
      if (stats.isFile() && currentFileExt == '.css') {
        console.log(currentFileExt);

        let stream = new fs.ReadStream(currentFilePath);
        
        stream.on('readable', function() {
          let data = stream.read();
          if (data != null) {
            console.log("will push to array")
            // arrayOfStyles.push(data);
            fs.appendFile(pathToFile, data, (err) => {
              if(err) throw err;
              console.log('Data has been added!');
            });
          } 
        })
      }
    });
  }
});

