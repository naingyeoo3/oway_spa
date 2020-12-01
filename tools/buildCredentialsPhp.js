const chalk = require('chalk');
const processing = chalk.bold.blue;

const fs = require('fs');

console.log(processing('Applying credentials for development...'));

fs
  .createReadStream('src/constants/credentials.php.js')
  .pipe(fs.createWriteStream('src/constants/credentials.js'));

console.log(processing('Generating minified bundle for development via Webpack. This will take a moment...'));