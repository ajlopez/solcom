
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse struct with one member'] = function (test) {
    const result = parser.parse('struct', 'struct Customer { string name; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'struct',
        name: 'Customer',
        members: [
            {
                ntype: 'member',
                type: 'string',
                name: 'name'
            }
        ]
    });
};
