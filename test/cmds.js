
const parser = require('../lib/parser');

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

