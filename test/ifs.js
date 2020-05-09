
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse if with then'] = function (test) {
    const result = parser.parse('command', 'if (b) c;');

    test.deepEqual(geast.toObject(result), {
        ntype: 'conditional',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        then: {
            ntype: 'name',
            name: 'c'
        }
    });
};

exports['parse if with then and else'] = function (test) {
    const result = parser.parse('command', 'if (b) c; else d;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'conditional',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        then: {
            ntype: 'name',
            name: 'c'
        },
        else: {
            ntype: 'name',
            name: 'd'
        }
    });
};

