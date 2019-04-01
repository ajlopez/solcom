
const parser = require('../lib/parser');

exports['parse uint type'] = function (test) {
    const result = parser.parse('type', 'uint');

    test.equal(result, 'uint');
};

exports['parse int type'] = function (test) {
    const result = parser.parse('type', 'int');

    test.equal(result, 'int');
};

exports['parse bool type'] = function (test) {
    const result = parser.parse('type', 'bool');

    test.equal(result, 'bool');
};

exports['parse address type'] = function (test) {
    const result = parser.parse('type', 'address');

    test.equal(result, 'address');
};

exports['parse string type'] = function (test) {
    const result = parser.parse('type', 'string');

    test.equal(result, 'string');
};
