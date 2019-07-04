
const solcom = require('..');
const fs = require('fs');
const path = require('path');

exports['Compile counter program'] = function (test) {
    const text = fs.readFileSync(path.join(__dirname, 'files', 'Counter.sol')).toString();
    
    const bytecodes = solcom.compile(text);
    
    test.ok(bytecodes);
};
