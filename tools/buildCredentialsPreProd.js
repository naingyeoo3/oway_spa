const chalk = require('chalk');
const processing = chalk.bold.blue;

const fs = require('fs');

console.log(processing('Applying credentials for pre-production...'));

fs
  .createReadStream('src/constants/credentials.pre.prod.js')
  .pipe(fs.createWriteStream('src/constants/credentials.js'));

console.log(processing('Generating minified bundle for pre-production via Webpack. This will take a moment...'));