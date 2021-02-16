
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
