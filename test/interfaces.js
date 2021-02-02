
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
                    ntype: 'method',
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

    