
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

