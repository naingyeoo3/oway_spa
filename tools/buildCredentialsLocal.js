const chalk = require('chalk');
const processing = chalk.bold.blue;

const fs = require('fs');

// console.log(processing('Applying credentials for development...'));
console.log(processing('replace back credential'));
fs
  .createReadStream('src/constants/credentials.dev.js')
  .pipe(fs.createWriteStream('src/constants/credentials.js'));
console.log('finished')