
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse simple mapping'] = function (test) {
    const result = parser.parse('mapping', 'mapping(address => uint)');

    test.deepEqual(geast.toObject(result), {
        ntype: 'mapping',
        key: 'address',
        value: 'uint'
    });
};

