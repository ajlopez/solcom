
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

