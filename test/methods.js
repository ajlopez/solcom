
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty void method'] = function (test) {
    const result = parser.parse('method', 'function foo() {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty public void method'] = function (test) {
    const result = parser.parse('method', 'function foo() public {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        visibility: 'public',
        name: 'foo',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty private void method'] = function (test) {
    const result = parser.parse('method', 'function foo() private {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        visibility: 'private',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty explicit private uint method'] = function (test) {
    const result = parser.parse('method', 'function foo() private returns(uint) {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        visibility: 'private',
        type: 'uint',
        name: 'foo',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse implicit public uint method'] = function (test) {
    const result = parser.parse('method', 'function foo() returns (uint) { return 42; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
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
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'increment',
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
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        visibility: 'public',
        name: 'add',
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
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        visibility: 'public',
        name: 'add',
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
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        visibility: 'public',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'k',
                    type: 'uint'
                }
            ]
        }
    });
};

exports['parse method with initialized local variable'] = function (test) {
    const result = parser.parse('method', 'function foo() public { uint k = 1; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        visibility: 'public',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'k',
                    type: 'uint',
                    expression: {
                        ntype: 'constant',
                        value: 1
                    }
                }
            ]
        }
    });
};

