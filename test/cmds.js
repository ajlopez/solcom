
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse break command'] = function (test) {
    const result = parser.parse('command', 'break;');
    
    test.ok(result);
    test.equal(result.ntype(), 'break');
};

exports['parse continue command'] = function (test) {
    const result = parser.parse('command', 'continue;');
    
    test.ok(result);
    test.equal(result.ntype(), 'continue');
};

exports['parse return command'] = function (test) {
    const result = parser.parse('command', 'return;');
    
    test.ok(result);
    test.equal(result.ntype(), 'return');
    test.equal(result.expression(), null);
};

exports['parse return command with expression'] = function (test) {
    const result = parser.parse('command', 'return 42;');
    
    test.ok(result);
    test.equal(result.ntype(), 'return');
    test.equal(result.expression().value(), 42);
};

exports['parse if command'] = function (test) {
    const result = parser.parse('command', 'if (k < 10) k = k + 1;');

    match(test, result, {
        ntype: 'conditional',
        condition: {
            ntype: 'binary',
            operator: '<',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 10
            }
        },
        then: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'binary',
                operator: '+',
                left: {
                    ntype: 'name',
                    name: 'k'
                },
                right: {
                    ntype: 'constant',
                    value: 1
                }
            }
        }
    });
};

exports['parse if command with else'] = function (test) {
    const result = parser.parse('command', 'if (k > 10) k = k - 1; else k = 0');

    match(test, result, {
        ntype: 'conditional',
        condition: {
            ntype: 'binary',
            operator: '>',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 10
            }
        },
        then: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'binary',
                operator: '-',
                left: {
                    ntype: 'name',
                    name: 'k'
                },
                right: {
                    ntype: 'constant',
                    value: 1
                }
            }
        },
        else: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'constant',
                value: 0
            }
        }
    });
};

exports['parse while command'] = function (test) {
    const result = parser.parse('command', 'while (k < 10) k = k + 1;');

    match(test, result, {
        ntype: 'loop',
        condition: {
            ntype: 'binary',
            operator: '<',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 10
            }
        },
        body: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'binary',
                operator: '+',
                left: {
                    ntype: 'name',
                    name: 'k'
                },
                right: {
                    ntype: 'constant',
                    value: 1
                }
            }
        }
    });
};

exports['parse underscore command'] = function (test) {
    const result = parser.parse('command', '_;');
    
    test.ok(result);
    test.equal(result.ntype(), 'name');
    test.equal(result.name(), '_');
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

exports['parse assign command to simple variable'] = function (test) {
    const result = parser.parse('command', 'k = k + 1;');

    test.deepEqual(geast.toObject(result), {
        ntype: 'assign',
        lefthand: {
            ntype: 'name',
            name: 'k'
        },
        expression: {
            ntype: 'binary',
            operator: '+',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 1
            }
        }
    });
};

exports['parse assign command to indexed variable'] = function (test) {
    const result = parser.parse('command', 'a[2] = k + 1;');

    test.deepEqual(geast.toObject(result), {
        ntype: 'assign',
        lefthand: {
            ntype: 'indexed',
            target: {
                ntype: 'name',
                name: 'a'
            },
            index: {
                ntype: 'constant',
                value: 2
            }
        },
        expression: {
            ntype: 'binary',
            operator: '+',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 1
            }
        }
    });
};

exports['parse assign command to property variable'] = function (test) {
    const result = parser.parse('command', 'a.b = k + 1;');

    test.deepEqual(geast.toObject(result), {
        ntype: 'assign',
        lefthand: {
            ntype: 'property',
            expression: {
                ntype: 'name',
                name: 'a'
            },
            name: 'b'
        },
        expression: {
            ntype: 'binary',
            operator: '+',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 1
            }
        }
    });
};

