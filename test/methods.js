
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty void method'] = function (test) {
    const result = parser.parse('method', 'function foo() {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        arguments: [],
        attributes: {},
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse payable void method'] = function (test) {
    const result = parser.parse('method', 'function foo() payable {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        attributes: {
            mutability: 'payable'         
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse view void method'] = function (test) {
    const result = parser.parse('method', 'function foo() view {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        attributes: {
            mutability: 'view'
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse pure void method'] = function (test) {
    const result = parser.parse('method', 'function foo() pure {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        attributes: {
            mutability: 'pure'
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse virtual void method'] = function (test) {
    const result = parser.parse('method', 'function foo() virtual {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        attributes: {
            virtual: true
        },
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
        attributes: {
            visibility: 'public'
        },
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
        attributes: {
            visibility: 'private'
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty internal void method'] = function (test) {
    const result = parser.parse('method', 'function foo() internal {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        attributes: {
            visibility: 'internal'
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty external void method'] = function (test) {
    const result = parser.parse('method', 'function foo() external {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'method',
        name: 'foo',
        attributes: {
            visibility: 'external'
        },
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
        attributes: {
            visibility: 'private'
        },
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
        attributes: {
        },
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
        attributes: {
        },
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
        attributes: {
            visibility: 'public'
        },
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
        attributes: {
            visibility: 'public'
        },
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
        attributes: {
            visibility: 'public'
        },
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
        attributes: {
            visibility: 'public'
        },
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

