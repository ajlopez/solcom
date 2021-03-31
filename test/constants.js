
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse uint constant declaration'] = function (test) {
    const result = parser.parse('constantdecl', 'uint constant maxvalue = 42');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'namedconstant',
        name: 'maxvalue',
        type: 'uint',
        expression: {
            ntype: 'constant',
            value: 42
        }
    });
};

