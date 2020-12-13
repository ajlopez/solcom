
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse simple import'] = function (test) {
    const result = parser.parse('import', 'import "path";');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'import',
        path: 'path'
    });
};

exports['parse import with identifier'] = function (test) {
    const result = parser.parse('import', 'import "path" as Path;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'import',
        path: 'path',
        identifier: 'Path'
    });
};
