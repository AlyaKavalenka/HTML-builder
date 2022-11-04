const readline = require('readline');
const fs = require('fs');
const pathToFile = '02-write-file\\text.txt';

fs.open(pathToFile, 'a+', (err) => {
  if (err) throw err;
  console.log('File created');
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function prepareQuestion () { 
  rl.question('Write your string', (answer) => {
    if (answer == 'exit') {
      process.exit();
    }
    console.log(`Your string is: ${answer}`);
    fs.appendFile(pathToFile, answer, (err) => {
      if(err) throw err;
      console.log('Data has been added!');
    });
    prepareQuestion ();
  });
}

prepareQuestion ();

process.on('exit', function() {
  console.log('Bye');
  process.exit();
})