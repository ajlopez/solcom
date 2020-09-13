
const parser = require('../lib/parser');

exports['parse uint type'] = function (test) {
    const result = parser.parse('type', 'uint');

    test.equal(result, 'uint');
};

exports['parse uint types'] = function (test) {
    for (let k = 8; k <= 256; k += 8)
        test.equal(parser.parse('type', 'uint' + k), 'uint' + k);
};

exports['parse int type'] = function (test) {
    const result = parser.parse('type', 'int');

    test.equal(result, 'int');
};

exports['parse int types'] = function (test) {
    for (let k = 8; k <= 256; k += 8)
        test.equal(parser.parse('type', 'int' + k), 'int' + k);
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

exports['parse byte type'] = function (test) {
    const result = parser.parse('type', 'byte');

    test.equal(result, 'byte');
};

exports['parse bytes types'] = function (test) {
    for (let k = 1; k <= 32; k++)
        test.equal(parser.parse('type', 'bytes' + k), 'bytes' + k);
};

exports['parse bytes type'] = function (test) {
    const result = parser.parse('type', 'bytes');

    test.equal(result, 'bytes');
};

exports['parse fixed type'] = function (test) {
    const result = parser.parse('type', 'fixed');

    test.equal(result, 'fixed');
};

exports['parse ufixed type'] = function (test) {
    const result = parser.parse('type', 'ufixed');

    test.equal(result, 'ufixed');
};

