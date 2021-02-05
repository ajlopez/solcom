
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty library'] = function (test) {
    const result = parser.parse('library', 'library Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'library',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse library with function'] = function (test) {
    const result = parser.parse('library', 'library Counter { function increment() external; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'library',
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
