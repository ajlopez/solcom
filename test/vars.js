
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse uint variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: 'uint'
    });
};

exports['parse uint public variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint public counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        visibility: 'public',
        type: 'uint'
    });
};

exports['parse uint private variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint private counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        visibility: 'private',
        type: 'uint'
    });
};

exports['parse uint internal variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint internal counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        visibility: 'internal',
        type: 'uint'
    });
};

exports['parse uint variable declaration and initialization'] = function (test) {
    const result = parser.parse('command', 'uint answer = 42;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'answer',
        type: 'uint',
        expression: {
            ntype: 'constant',
            value: 42
        }
    });
};

exports['parse int variable declaration'] = function (test) {
    const result = parser.parse('command', 'int counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: 'int'
    });
};

exports['parse bool variable declaration'] = function (test) {
    const result = parser.parse('command', 'bool flag;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'flag',
        type: 'bool'
    });
};

exports['parse uint dynamic array variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint[] counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: {
            ntype: 'array',
            type: 'uint'
        }
    });
};

exports['parse uint fixed size array variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint[10] counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: {
            ntype: 'array',
            length: {
                ntype: 'constant',
                value: 10
            },
            type: 'uint'
        }
    });
};

exports['parse mapping variable declaration'] = function (test) {
    const result = parser.parse('command', 'mapping(address => uint) balances;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'balances',
        type: {
            ntype: 'mapping',
            key: 'address',
            value: 'uint'
        }
    });
};

exports['parse address variable declaration'] = function (test) {
    const result = parser.parse('command', 'address counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: 'address'
    });
};

exports['parse address variable declaration'] = function (test) {
    const result = parser.parse('command', 'address counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: 'address'
    });
};

function match(test, node, obj) {
    test.deepEqual(geast.toObject(node), obj);
}
