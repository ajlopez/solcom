
const parser = require('../lib/parser');

exports['parse program with empty contract'] = function (test) {
    const result = parser.parse('program', 'contract Empty {}');
    
    match(test, result, {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'contract',
                name: 'Empty',
                body: {
                    ntype: 'sequence',
                    nodes: []
                }
            }
        ]
    });
};

exports['parse program with two contracts'] = function (test) {
    const result = parser.parse('program', 'contract Empty1 {} contract Empty2 {}');
    
    match(test, result, {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'contract',
                name: 'Empty1',
                body: {
                    ntype: 'sequence',
                    nodes: []
                }
            },
            {
                ntype: 'contract',
                name: 'Empty2',
                body: {
                    ntype: 'sequence',
                    nodes: []
                }
            }
        ]
    });
};

exports['parse program with contract with variable declaration'] = function (test) {
    const result = parser.parse('program', 'contract Counter { uint counter; }');
    
    match(test, result, {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'contract',
                name: 'Counter',
                body: {
                    ntype: 'sequence',
                    nodes: [
                        {
                            ntype: 'variable',
                            name: 'counter',
                            type: 'uint'
                        }
                    ]
                }
            }
        ]
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

