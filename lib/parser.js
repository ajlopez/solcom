
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('operator', '+-*/='.split(''));
ldef.define('delimiter', '()[]{};,'.split(''));
ldef.defineText('string', '"', '"');

const pdef = gepars.definition();

// function arguments
pdef.define('arglist', [ 'arglist', 'delimiter:,', 'argument' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('arglist', 'argument', function (value) { return [ value ]; });
pdef.define('arglist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('argument', [ 'type', 'name:' ], function (values) { return geast.argument(values[1], values[0]); });

// types
pdef.define('type', 'name:uint');
pdef.define('type', 'name:int');
pdef.define('type', 'name:bool');
pdef.define('type', 'name:address');
pdef.define('type', 'name:string');

// expressions
pdef.define('expression', 'expression2');
pdef.define('expression2', [ 'expression2', 'operator:+', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', [ 'expression2', 'operator:-', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'expression1');
pdef.define('expression1', [ 'expression1', 'operator:*', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', [ 'expression1', 'operator:/', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'term');

// simple terms
pdef.define('name', 'name:', function (value) { return geast.name(value); });
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });

// terms
pdef.define('term', [ 'term', 'delimiter:[', 'expression', 'delimiter:]' ], function (values) { return geast.indexed(values[0], values[2]); } );
pdef.define('term', 'integer');
pdef.define('term', 'name');
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

function parseNode(type, text) {
    const lexer = ldef.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};

