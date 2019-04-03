
const parser = require('../lib/parser');

exports['parse empty public void method'] = function (test) {
    const result = parser.parse('method', 'function foo() {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: null,
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty public void method'] = function (test) {
    const result = parser.parse('method', 'function foo() public {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty private void method'] = function (test) {
    const result = parser.parse('method', 'function foo() private {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'private',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty explicit private uint method'] = function (test) {
    const result = parser.parse('method', 'function foo() private returns(uint) {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'private',
        type: 'uint',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse implicit public uint method'] = function (test) {
    const result = parser.parse('method', 'function foo() returns (uint) { return 42; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: null,
        type: 'uint',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'return',
                    expression: {
                        ntype: 'constant',
                        value: 42
                    }
                }
            ]
        }
    });
};

exports['parse increment method'] = function (test) {
    const result = parser.parse('method', 'function increment() { counter = counter + 1; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: null,
        type: 'void',
        arguments: [],
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
    });
};

exports['parse add method with one argument'] = function (test) {
    const result = parser.parse('method', 'function add(uint value) public { counter = counter + value; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            }
        ],
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
                            ntype: 'name',
                            name: 'value'
                        }
                    }
                }
            ]
        }
    });
};

exports['parse add method with two arguments'] = function (test) {
    const result = parser.parse('method', 'function add(uint value, uint value2) public { counter = counter + value; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            },
            {
                ntype: 'argument',
                name: 'value2',
                type: 'uint'
            }
        ],
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
                            ntype: 'name',
                            name: 'value'
                        }
                    }
                }
            ]
        }
    });
};

exports['parse method with local variable'] = function (test) {
    const result = parser.parse('method', 'function foo() public { uint k; }');
    
    match(test, result, {
        ntype: 'method',
        name: 'foo',
        visibility: 'public',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'k',
                    expression: null
                }
            ]
        }
    });
};

exports['parse method with initialized local variable'] = function (test) {
    const result = parser.parse('method', 'function foo() public { uint k = 1; }');
    
    match(test, result, {
        ntype: 'method',
        name: 'foo',
        visibility: 'public',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'k',
                    expression: {
                        ntype: 'constant',
                        value: 42
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
        
        if (expected === value)
            return;
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}

