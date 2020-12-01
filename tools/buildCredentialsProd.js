const chalk = require('chalk');
const processing = chalk.bold.blue;

const fs = require('fs');

console.log(processing('Applying credentials for production...'));

fs
  .createReadStream('src/constants/credentials.prod.js')
  .pipe(fs.createWriteStream('src/constants/credentials.js'));

console.log(processing('Generating minified bundle for production via Webpack. This will take a moment...'));