
const parser = require('../lib/parser');

exports['parse argument'] = function (test) {
    const result = parser.parse('argument', 'uint value');

    match(test, result, {
        ntype: 'argument',
        name: 'value',
        type: 'uint'
    });
};

exports['parse empty argument list'] = function (test) {
    const result = parser.parse('arglist', ')');

    test.deepEqual(result, []);
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        
        let value;
        
        if (typeof node[n] === 'function')
            value = node[n]();
        else
            value = node[n];
        
        const expected = obj[n];
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}

