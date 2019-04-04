
const parser = require('../lib/parser');

exports['parse empty contract'] = function (test) {
    const result = parser.parse('contract', 'contract Empty {}');
    
    match(test, result, {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse contract with variable declaration'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { uint counter; }');
    
    match(test, result, {
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
    });
};

exports['parse contract with variable and method declarations'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { uint counter; function increment() { counter = counter + 1; } }');
    
    match(test, result, {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'counter',
                    type: 'uint'
                },
                {
                    ntype: 'method',
                    name: 'increment',
                    visibility: null,
                    type: null,
                    body: {
                        ntype: 'sequence',
                        nodes: [
                            {
                                ntype: 'assign',
                                lefthand: {
                                    ntype: 'name',
                                    name: 'counter'
                                },
                                expression: {
                                    ntype: 'binary',
                                    operator: '+',
                                    left: {
                                        ntype: 'name',
                                        name: 'counter'
                                    },
                                    right: {
                                        ntype: 'constant',
                                        value: 1
                                    }
                                }
                            }
                        ]
                    }
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
        
        if (Array.isArray(expected))
            test.equal(value.length, expected.length);
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}

