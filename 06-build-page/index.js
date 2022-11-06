const fs = require('fs');
const path = require('path');
const pathToDir = '06-build-page';
const pathToProjectDist = path.join(pathToDir, 'project-dist');
const pathToAssets = path.join(pathToDir, 'assets');
const pathToStyles = path.join(pathToDir, 'styles');
const pathToComponents = path.join(pathToDir, 'components');

//После завершения работы скрипта должна быть создана папка **project-dist**
fs.mkdir(pathToProjectDist, { recursive: true }, err => {
  if (err) throw err;
  // console.log('Папка успешно создана');
});

// В папке **project-dist** должна находиться папка **assets** являющаяся точной копией папки **assets** находящейся в **06-build-page**
fs.readdir(pathToAssets, 'utf8', (err, folders) => {
  if (err) throw err;

  for (let folder of folders) {
    fs.mkdir(path.join(pathToProjectDist, 'assets', folder), { recursive: true }, err => {
      if (err) throw err;
      // console.log(`Папка ${folder} успешно создана`);

      fs.readdir(path.join(pathToAssets, folder), 'utf-8', (err, files) => {
        if (err) throw err;
        
        for (let file of files) {
          fs.copyFile(path.join(pathToAssets, folder, file), path.join(pathToProjectDist,'assets', folder, file), err => {
            if (err) throw err; // не удалось скопировать файл
            // console.log(`Файл ${file} успешно скопирован`);
         })
        }
      })
    });   
  }
});

// Файл **style.css** должен содержать стили собранные из файлов папки **styles** 
fs.open(path.join(pathToProjectDist, 'style.css'), 'w', (err) => {
  if (err) throw err;
  // console.log('File style.css created');
});

fs.readdir(pathToStyles, 'utf8', function (err, files) {
  if (err) throw err;

  for (let file of files) {
    let currentFilePath = path.join(pathToStyles, file);
    let currentFileExt = path.parse(currentFilePath).ext;

    fs.stat(currentFilePath, function (err, stats) {
      if (stats.isFile() && currentFileExt == '.css') {
        // console.log(currentFileExt);

        let stream = new fs.ReadStream(currentFilePath);
        
        stream.on('readable', function() {
          let data = stream.read();
          if (data != null) {
            fs.appendFile(path.join(pathToProjectDist, 'style.css'), data, (err) => {
              if(err) throw err;
              // console.log('Data has been added!');
            });
          } 
        })
      }
    });
  }
});

// копирование template в папку project-dist
fs.copyFile(path.join(pathToDir, 'template.html'), path.join(pathToProjectDist,'index.html'), err => {
  if (err) throw err; // не удалось скопировать файл
  console.log(`Файл template.html успешно скопирован`);
  fs.readdir(pathToComponents, 'utf8', (err, files) => {
    if (err) throw err;
    
    let stream = new fs.ReadStream(path.join(pathToProjectDist, 'index.html'));
    
    stream.on('readable', function() {
      let data = stream.read();
      if (data != null) {
  
        for (let file of files) {
          let currentFilePath = path.join(pathToComponents, file);
          let currentFileName = path.parse(currentFilePath).name;
          let fileStream = new fs.ReadStream(currentFilePath)
      
          
          console.log(currentFilePath);
          fileStream.on('readable', function(){
            let fileData = fileStream.read();
              if (fileData != null) {
                data = data.toString().replace(`{{${currentFileName}}}`, fileData.toString());
                fs.writeFile(path.join(pathToProjectDist, 'index.html'), data, err => {
                  if (err) {
                    console.error(err);
                  }
                  // file written successfully
                });
              };   
          })
        }
        
      };
    })
    
  });
});


