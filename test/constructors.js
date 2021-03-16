
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty constructor'] = function (test) {
    const result = parser.parse('konstructor', 'constructor() {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        arguments: [],
        attributes: {},
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse payable constructor'] = function (test) {
    const result = parser.parse('konstructor', 'constructor() payable {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        attributes: {
            mutability: 'payable'         
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

