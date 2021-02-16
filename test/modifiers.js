
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty modifier'] = function (test) {
    const result = parser.parse('modifier', 'modifier onlyOwner() {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'modifier',
        name: 'onlyOwner',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse modifier with one argument'] = function (test) {
    const result = parser.parse('modifier', 'modifier onlyOwner(address user) {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'modifier',
        name: 'onlyOwner',
        arguments: [
            {
                ntype: 'argument',
                name: 'user',
                type: 'address'
            }
        ],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse modifier with two arguments'] = function (test) {
    const result = parser.parse('modifier', 'modifier onlyOwner(address user, uint balance) {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'modifier',
        name: 'onlyOwner',
        arguments: [
            {
                ntype: 'argument',
                name: 'user',
                type: 'address'
            },
            {
                ntype: 'argument',
                name: 'balance',
                type: 'uint'
            }
        ],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse modifier with body'] = function (test) {
    const result = parser.parse('modifier', 'modifier onAction() { counter = counter + 1; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'modifier',
        name: 'onAction',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    expression: {
                        left: {
                            name: 'counter',
                            ntype: 'name'
                        },
                        ntype: 'binary',
                        operator: '+',
                        right: {
                            ntype: 'constant',
                            value: 1
                        }
                    },
                    lefthand: {
                        name: 'counter',
                        ntype: 'name'
                    },
                    ntype: 'assign'
                }
            ]
        }
    });
};
