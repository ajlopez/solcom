
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty interface'] = function (test) {
    const result = parser.parse('interface', 'interface Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'interface',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse interface with function'] = function (test) {
    const result = parser.parse('interface', 'interface Counter { function increment() external; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'interface',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'function',
                    name: 'increment',
                    arguments: [],
                    attributes: {
                        visibility: 'external'
                    },
                }
            ]
        }
    });
};

exports['parse empty interface with single inheritance'] = function (test) {
    const result = parser.parse('interface', 'interface Empty is Nothing {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'interface',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        },
        inheritance: [
            {
                ntype: 'name',
                name: 'Nothing'
            }
        ]
    });
};

exports['parse empty interface with double inheritance'] = function (test) {
    const result = parser.parse('interface', 'interface Empty is Nothing, Nothing2 {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'interface',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        },
        inheritance: [
            {
                ntype: 'name',
                name: 'Nothing'
            },
            {
                ntype: 'name',
                name: 'Nothing2'
            }
        ]
    });
};

