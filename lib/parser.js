
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

geast.node('contract', [ 'name', 'body', 'inheritance', 'abstract' ]);
geast.node('interface', [ 'name', 'body', 'inheritance' ]);
geast.node('library', [ 'name', 'body' ]);
geast.node('method', [ 'name', 'type', 'arguments', 'body', 'attributes' ]);
geast.node('variable', [ 'name', 'type', 'expression', 'visibility' ]);
geast.node('argument', [ 'name', 'type', 'storage' ]);
geast.node('import', [ 'path', 'identifier' ]);

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_$][a-zA-Z0-9_$]*');
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

// import
pdef.define('import', [ 'name:import', 'string:', 'name:as', 'name:', 'delimiter:;' ], function (values) { return geast.import(values[1], values[3]); });
pdef.define('import', [ 'name:import', 'string:', 'delimiter:;' ], function (values) { return geast.import(values[1]); });
pdef.define('import', [ 'name:import', 'operator:*', 'name:as', 'name:', 'name:from', 'string:', 'delimiter:;' ], function (values) { return geast.import(values[5], values[3]); });

// contract and its declarations
pdef.define('contract', [ 'name:abstract', 'name:contract', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[2], geast.sequence(values[4]), null, true); });
pdef.define('contract', [ 'name:abstract', 'name:contract', 'name:', 'name:is', 'inheritance-list', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[2], geast.sequence(values[6]), values[4], true); });
pdef.define('contract', [ 'name:contract', 'name:', 'name:is', 'inheritance-list', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[1], geast.sequence(values[5]), values[3]); });
pdef.define('contract', [ 'name:contract', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[1], geast.sequence(values[3])); });
pdef.define('contdecllist', [ 'contdecllist', 'contdecl' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('contdecllist', 'contdecl', function (value) { return [ value ]; });
pdef.define('contdecllist', [ '!', 'delimiter:}' ], function (values) { return [] });
pdef.define('contdecl', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0]); });
pdef.define('contdecl', 'method');

pdef.define('inheritance-list', [ 'inheritance-list', 'delimiter:,', 'name' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('inheritance-list', 'name', function (value) { return [ value ]; });

// interface
pdef.define('interface', [ 'name:interface', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.interface(values[1], geast.sequence(values[3])); });
pdef.define('interface', [ 'name:interface', 'name:', 'name:is', 'inheritance-list', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.interface(values[1], geast.sequence(values[5]), values[3]); });

// library
pdef.define('library', [ 'name:library', 'name:', 'delimiter:{', 'delimiter:}' ], function (values) { return geast.library(values[1], geast.sequence([])) });

// state variable visibility
pdef.define('visibility', 'name:public');
pdef.define('visibility', 'name:private');
pdef.define('visibility', 'name:internal');

// commands
// variable declaration
pdef.define('command', [ 'type', '?visibility', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[2], values[0], null, values[1]); });
// variable declaration and initialization
pdef.define('command', [ 'type', '?visibility', 'name:', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.variable(values[2], values[0], values[4], values[1]); });
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
pdef.define('method', [ 
    'name:function', 
    'name:', 
    'delimiter:(', 'arglist', 'delimiter:)', 
    'function-attributes', 
    '?returns', 
    'delimiter:;' ], 
    function (values) { 
        return geast.method(
            values[1],      // name
            values[6],      // type
            values[3],      // arguments
            null,           // body
            values[5]       // attributes
        );}
    );
pdef.define('method', [ 
    'name:function', 
    'name:', 
    'delimiter:(', 'arglist', 'delimiter:)', 
    'function-attributes', 
    '?returns', 
    'command' ], 
    function (values) { 
        return geast.method(
            values[1],      // name
            values[6],      // type
            values[3],      // arguments
            values[7],      // body
            values[5]       // attributes
        );}
    );
pdef.define('returns', [ 'name:returns', 'delimiter:(', 'type', 'delimiter:)' ], function (values) { return values[2]; });
pdef.define('function-attributes', [ 'state-mutability', 'function-attributes' ], function(values) { values[1].mutability = values[0]; return values[1]; });
pdef.define('function-attributes', [ 'function-visibility', 'function-attributes' ], function(values) { values[1].visibility = values[0]; return values[1]; });
pdef.define('function-attributes', [ '!', 'name:returns' ], function() { return {}; });
pdef.define('function-attributes', [ '!', 'delimiter:{' ], function() { return {}; });
pdef.define('function-attributes', [ '!', 'delimiter:;' ], function() { return {}; });
pdef.define('state-mutability', 'name:payable');
pdef.define('state-mutability', 'name:view');
pdef.define('state-mutability', 'name:pure');
pdef.define('function-visibility', 'name:public');
pdef.define('function-visibility', 'name:private');
pdef.define('function-visibility', 'name:internal');
pdef.define('function-visibility', 'name:external');

// function arguments
pdef.define('arglist', [ 'arglist', 'delimiter:,', 'argument' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('arglist', 'argument', function (value) { return [ value ]; });
pdef.define('arglist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('argument', [ 'type', '?storage', 'name:' ], function (values) { return geast.argument(values[2], values[0], values[1]); });
pdef.define('storage', 'name:memory');
pdef.define('storage', 'name:storage');

// types
pdef.define('type', 'name:uint');

for (let k = 8; k <= 256; k += 8)
    pdef.define('type', 'name:uint' + k);
    
pdef.define('type', 'name:int');

for (let k = 8; k <= 256; k += 8)
    pdef.define('type', 'name:int' + k);
    
pdef.define('type', 'name:byte');
pdef.define('type', 'name:bytes');

for (let k = 1; k <= 32; k++)
    pdef.define('type', 'name:bytes' + k);
    
pdef.define('type', 'name:bool');
pdef.define('type', 'name:address');
pdef.define('type', 'name:string');
pdef.define('type', 'name:fixed');
pdef.define('type', 'name:ufixed');
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

