
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse program with empty contract'] = function (test) {
    const result = parser.parse('program', 'contract Empty {}');
    
    test.deepEqual(geast.toObject(result), {
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
    
    test.deepEqual(geast.toObject(result), {
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
    
    test.deepEqual(geast.toObject(result), {
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

exports['parse program with simple import'] = function (test) {
    const result = parser.parse('program', 'import "Foo";');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'import',
                path: 'Foo'
            }
        ]
    });
};

exports['parse program with empty interface'] = function (test) {
    const result = parser.parse('program', 'interface Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'interface',
                name: 'Empty',
                body: {
                    ntype: 'sequence',
                    nodes: []
                }
            }
        ]
    });
};

exports['parse program with struct with two members'] = function (test) {
    const result = parser.parse('program', 'struct Customer { string name; uint256 balance; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'struct',
                name: 'Customer',
                members: [
                    {
                        ntype: 'member',
                        type: 'string',
                        name: 'name'
                    },
                    {
                        ntype: 'member',
                        type: 'uint256',
                        name: 'balance'
                    }
                ]
            }
        ]
    });
};

exports['parse program with uint constant declaration'] = function (test) {
    const result = parser.parse('program', 'uint constant maxvalue = 42');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'namedconstant',
                name: 'maxvalue',
                type: 'uint',
                expression: {
                    ntype: 'constant',
                    value: 42
                }
            }
        ]
    });
};

exports['parse program with empty library'] = function (test) {
    const result = parser.parse('program', 'library Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'library',
                name: 'Empty',
                body: {
                    ntype: 'sequence',
                    nodes: []
                }
            }
        ]
    });
};

exports['parse program with empty void function'] = function (test) {
    const result = parser.parse('program', 'function foo() {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'sequence',
        nodes: [
            {
                ntype: 'method',
                name: 'foo',
                arguments: [],
                attributes: {},
                body: {
                    ntype: 'sequence',
                    nodes: []
                }
            }
        ]
    });
};

