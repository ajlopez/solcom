
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty event'] = function (test) {
    const result = parser.parse('event', 'event EmptyEvent()');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'event',
        name: 'EmptyEvent',
        arguments: []
    });
};
