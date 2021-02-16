
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
