
const parser = require('../lib/parser');

exports['parse if with then'] = function (test) {
    const result = parser.parse('command', 'if (b) c;');
    
    match(test, result, {
        ntype: 'conditional',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        then: {
            ntype: 'name',
            name: 'c'
        },
        else: null
    });
};

exports['parse if with then and else'] = function (test) {
    const result = parser.parse('command', 'if (b) c; else d;');
    
    match(test, result, {
        ntype: 'conditional',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        then: {
            ntype: 'name',
            name: 'c'
        },
        else: {
            ntype: 'name',
            name: 'd'
        }
    });
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        const value = node[n]();
        const expected = obj[n];
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}
