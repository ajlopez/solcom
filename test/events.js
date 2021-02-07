
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse event without arguments'] = function (test) {
    const result = parser.parse('event', 'event EmptyEvent()');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'event',
        name: 'EmptyEvent',
        arguments: []
    });
};

exports['parse with one argument'] = function (test) {
    const result = parser.parse('event', 'event EventWithOneArgument(uint counter)');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'event',
        name: 'EventWithOneArgument',
        arguments: [
            {
                ntype: 'argument',
                name: 'counter',
                type: 'uint'
            }
        ]
    });
};

exports['parse with two arguments'] = function (test) {
    const result = parser.parse('event', 'event EventWithTwoArguments(uint counter, uint value)');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'event',
        name: 'EventWithTwoArguments',
        arguments: [
            {
                ntype: 'argument',
                name: 'counter',
                type: 'uint'
            },
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            }
        ]
    });
};
