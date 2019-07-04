
const parser = require('../lib/parser');

exports['parse while'] = function (test) {
    const result = parser.parse('command', 'while (b) c;');
    
    match(test, result, {
        ntype: 'loop',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        body: {
            ntype: 'name',
            name: 'c'
        }
    });
};

exports['parse while with composite command'] = function (test) {
    const result = parser.parse('command', 'while (b) { c; d; }');
    
    match(test, result, {
        ntype: 'loop',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'name',
                    name: 'c'
                },
                {
                    ntype: 'name',
                    name: 'd'
                }
            ]
        }
    });
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
