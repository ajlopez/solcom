
const solcom = require('../..');
const fs = require('fs');

const code = fs.readFileSync(process.argv[2]).toString();

console.log(code);

const result = solcom.compile(code);

console.log();
console.log(result);
