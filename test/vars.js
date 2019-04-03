
const parser = require('../lib/parser');

exports['parse uint variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
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
            length: null,
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
            length: 10,
            type: 'uint'
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
    if (node === obj)
        return;
    
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        const value = node[n]();
        const expected = obj[n];
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}
