
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

geast.node('contract', [ 'name', 'body' ]);

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('operator', '+-*/=<>'.split(''));
ldef.define('delimiter', '()[]{};,'.split(''));
ldef.defineText('string', '"', '"');

const pdef = gepars.definition();

// program and its declarations
pdef.define('program', 'topdecllist', function (value) { return geast.sequence(value); });
pdef.define('topdecllist', [ 'topdecllist', 'topdecl' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('topdecllist', 'topdecl', function (value) { return [ value ]; });
pdef.define('topdecllist', [ '!', 'null' ], function (values) { return [] });
pdef.define('topdecl', 'contract');

// contract and its declarations
pdef.define('contract', [ 'name:contract', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[1], geast.sequence(values[3])); });
pdef.define('contdecllist', [ 'contdecllist', 'contdecl' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('contdecllist', 'contdecl', function (value) { return [ value ]; });
pdef.define('contdecllist', [ '!', 'delimiter:}' ], function (values) { return [] });
pdef.define('contdecl', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0]); });
pdef.define('contdecl', 'method');

// commands
// variable declaration
pdef.define('command', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0]); });
// variable declaration and initialization
pdef.define('command', [ 'type', 'name:', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0], values[3]); });
// return command
pdef.define('command', [ 'name:return', 'expression', 'delimiter:;' ], function (values) { return geast.return(values[1]); });
pdef.define('command', [ 'name:return', 'delimiter:;' ], function (values) { return geast.return(null); });
// break command
pdef.define('command', [ 'name:break', 'delimiter:;' ], function (values) { return geast.break(); });
// continue command
pdef.define('command', [ 'name:continue', 'delimiter:;' ], function (values) { return geast.continue(); });
// assign command
pdef.define('command', [ 'name', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.assign(values[0], values[2]); } );
// if command
pdef.define('command', [ 'name:if', 'delimiter:(', 'expression', 'delimiter:)', 'command', 'name:else', 'command' ], function (values) { return geast.conditional(values[2], values[4], values[6]); });
pdef.define('command', [ 'name:if', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.conditional(values[2], values[4], null); });
// while command
pdef.define('command', [ 'name:while', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.loop(values[2], values[4]); });
// expression command
pdef.define('command', [ 'expression', 'delimiter:;'], function (values) { return values[0]; });
// composite command
pdef.define('command', [ 'delimiter:{', 'commandlist', 'delimiter:}' ], function (values) { return geast.sequence(values[1]); });
pdef.define('commandlist', [ 'commandlist', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('commandlist', 'command', function (value) { return [ value ]; });
pdef.define('commandlist', [ '!', 'delimiter:}' ], function (values) { return []; });

// methods
pdef.define('method', [ 'name:function', 'name:', 'delimiter:(', 'arglist', 'delimiter:)', '?visibility', '?returns', 'command' ], function (values) { return geast.method(values[1], values[6], values[5], values[3], values[7]); });
pdef.define('returns', [ 'name:returns', 'delimiter:(', 'type', 'delimiter:)' ], function (values) { return values[2]; });
pdef.define('visibility', 'name:public');
pdef.define('visibility', 'name:private');
pdef.define('arglist', [ 'arglist', 'delimiter:,', 'argument' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('arglist', 'argument', function (value) { return [ value ]; });
pdef.define('arglist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('argument', [ 'type', 'name:' ], function (values) { return geast.argument(values[1], values[0]); });

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
pdef.define('type', [ 'type', 'delimiter:[', 'delimiter:]' ], function (values) { return geast.array(values[0], null); });
pdef.define('type', [ 'type', 'delimiter:[', 'integer', 'delimiter:]' ], function (values) { return geast.array(values[0], values[2]); });

// expressions
pdef.define('expression', 'expression3');
pdef.define('expression3', [ 'expression3', 'operator:<', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression3', [ 'expression3', 'operator:>', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression3', 'expression2');
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

