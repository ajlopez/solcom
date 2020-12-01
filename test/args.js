
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse argument'] = function (test) {
    const result = parser.parse('argument', 'uint value');

    test.deepEqual(geast.toObject(result), {
        ntype: 'argument',
        name: 'value',
        type: 'uint'
    });
};

exports['parse argument with memory storage'] = function (test) {
    const result = parser.parse('argument', 'uint memory value');

    test.deepEqual(geast.toObject(result), {
        ntype: 'argument',
        name: 'value',
        storage: 'memory',
        type: 'uint'
    });
};

exports['parse empty argument list'] = function (test) {
    const result = parser.parse('arglist', ')');

    test.deepEqual(result, []);
};

