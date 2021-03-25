
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse lowercase name'] = function (test) {
    const result = parser.parse('name', 'foo');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'foo' });
};

exports['parse name with digits'] = function (test) {
    const result = parser.parse('name', 'foo42');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'foo42' });
};

exports['parse name with underscore and digits'] = function (test) {
    const result = parser.parse('name', 'foo_42');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'foo_42' });
};

exports['parse mixed case name'] = function (test) {
    const result = parser.parse('name', 'Foo');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'Foo' });
};

exports['parse uppercase name'] = function (test) {
    const result = parser.parse('name', 'BAR');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'BAR' });
};

exports['parse name with underscore'] = function (test) {
    const result = parser.parse('name', 'foo_bar');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'foo_bar' });
};

exports['parse name with initial underscore'] = function (test) {
    const result = parser.parse('name', '_foo');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: '_foo' });
};

exports['parse name with dollar sign'] = function (test) {
    const result = parser.parse('name', 'foo$bar');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: 'foo$bar' });
};

exports['parse name with dollar sign'] = function (test) {
    const result = parser.parse('name', '$foo');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'name', name: '$foo' });
};

exports['parse integer'] = function (test) {
    const result = parser.parse('integer', '42');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constant', value: 42 });
};

exports['parse string'] = function (test) {
    const result = parser.parse('string', '"foo"');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constant', value: 'foo' });
};

exports['parse indexed term'] = function (test) {
    const result = parser.parse('term', 'a[10]');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'indexed',
        target: {
            ntype: 'name',
            name: 'a'
        },
        index: {
            ntype: 'constant',
            value: 10
        }
    });
};

exports['parse simple call term with one argument'] = function (test) {
    const result = parser.parse('term', 'a(10)');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'call',
        target: {
            ntype: 'name',
            name: 'a'
        },
        arguments: [
            {
                ntype: 'constant',
                value: 10
            }
        ]
    });
};

exports['parse simple call term with two arguments'] = function (test) {
    const result = parser.parse('term', 'a(10,20)');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'call',
        target: {
            ntype: 'name',
            name: 'a'
        },
        arguments: [
            {
                ntype: 'constant',
                value: 10
            },
            {
                ntype: 'constant',
                value: 20
            }
        ]
    });
};

exports['parse simple call term with no argument'] = function (test) {
    const result = parser.parse('term', 'a()');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'call',
        target: {
            ntype: 'name',
            name: 'a'
        },
        arguments: [
        ]
    });
};
