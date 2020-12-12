
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse simple import'] = function (test) {
    const result = parser.parse('import', 'import "path";');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'import',
        path: 'path'
    });
};
