
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse while'] = function (test) {
    const result = parser.parse('command', 'while (b) c;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'loop',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        body: {
            ntype: 'name',
            name: 'c'
        }
    });
};

exports['parse while with composite command'] = function (test) {
    const result = parser.parse('command', 'while (b) { c; d; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'loop',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'name',
                    name: 'c'
                },
                {
                    ntype: 'name',
                    name: 'd'
                }
            ]
        }
    });
};

