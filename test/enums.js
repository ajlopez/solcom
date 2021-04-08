
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse enum with one identifier'] = function (test) {
    const result = parser.parse('enum', 'enum Natural { Zero }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'enum',
        name: 'Natural',
        values: [
            'Zero'
        ]
    });
};

exports['parse enum with two identifiers'] = function (test) {
    const result = parser.parse('enum', 'enum Natural { Zero, One }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'enum',
        name: 'Natural',
        values: [
            'Zero',
            'One'
        ]
    });
};
