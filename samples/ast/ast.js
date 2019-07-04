
const parser = require('../../lib/parser');
const geast = require('geast');
const fs = require('fs');

const code = fs.readFileSync(process.argv[2]).toString();

console.log(code);

const result = parser.parse('program', code);

console.log(JSON.stringify(geast.toObject(result), null, 2));
