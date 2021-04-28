
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

geast.node('contract', [ 'name', 'body', 'inheritance', 'abstract' ]);
geast.node('interface', [ 'name', 'body', 'inheritance' ]);
geast.node('library', [ 'name', 'body' ]);
geast.node('function', [ 'name', 'type', 'arguments', 'body', 'attributes' ]);
geast.node('constructor', [ 'arguments', 'body', 'attributes' ]);
geast.node('variable', [ 'name', 'type', 'expression', 'visibility' ]);
geast.node('namedconstant', [ 'name', 'type', 'expression' ]);
geast.node('argument', [ 'name', 'type', 'storage' ]);
geast.node('import', [ 'path', 'identifier' ]);
geast.node('event', [ 'name', 'arguments' ]);
geast.node('modifier', [ 'name', 'arguments', 'body' ]);
geast.node('underscore', []);
geast.node('struct', [ 'name', 'members' ]);
geast.node('member', [ 'name', 'type' ]);
geast.node('enum', [ 'name', 'values' ]);
geast.node('mapping', [ 'key', 'value' ]);

const ldef = gelex.definition();

ldef.define('keyword', 'if break continue returns return while'.split(' '));
ldef.define('keyword', 'enum struct import abstract contract interface library modifier event'.split(' '));
ldef.define('keyword', 'public private external internal virtual override'.split(' '));
ldef.define('keyword', 'payable view pure'.split(' '));
ldef.define('keyword', 'memory storage'.split(' '));
ldef.define('keyword', 'bool address string fixed ufixed mapping'.split(' '));
ldef.define('keyword', 'uint');
for (let k = 8; k <= 256; k += 8)
    ldef.define('keyword', 'uint' + k);
ldef.define('keyword', 'int');
for (let k = 8; k <= 256; k += 8)
    ldef.define('keyword', 'int' + k);
ldef.define('name', '[a-zA-Z_$][a-zA-Z0-9_$]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('operator', '+-*/=<>'.split(''));
ldef.define('operator', '++ -- =>'.split(' '));
ldef.define('delimiter', '()[]{};,.'.split(''));
ldef.defineText('string', '"', '"');

const pdef = gepars.definition();

// program and its declarations
pdef.define('program', 'topdecllist', function (value) { return geast.sequence(value); });
pdef.define('topdecllist', [ 'topdecllist', 'topdecl' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('topdecllist', 'topdecl', function (value) { return [ value ]; });
pdef.define('topdecllist', [ '!', 'null' ], function (values) { return [] });
pdef.define('topdecl', 'contract');
pdef.define('topdecl', 'interface');
pdef.define('topdecl', 'library');
pdef.define('topdecl', 'import');
pdef.define('topdecl', 'struct');
pdef.define('topdecl', 'function');
pdef.define('topdecl', 'constantdecl');

// enum
pdef.define('enum', [ 'keyword:enum', 'name:', 'delimiter:{', 'valuelist', 'delimiter:}' ], function (values) { return geast.enum(values[1], values[3]); });
pdef.define('valuelist', [ 'value', 'delimiter:,', 'valuelist' ], function (values) { values[2].unshift(values[0]); return values[2]; });
pdef.define('valuelist', [ 'value', '!', 'delimiter:}' ], function (values) { return [ values[0] ]; });
pdef.define('value', 'name:');

// struct
pdef.define('struct', [ 'keyword:struct', 'name:', 'delimiter:{', 'memberlist', 'delimiter:}' ], function (values) { return geast.struct(values[1], values[3]); });
pdef.define('memberlist', [ 'member', 'memberlist' ], function (values) { values[1].unshift(values[0]); return values[1]; });
pdef.define('memberlist', [ 'member', '!', 'delimiter:}' ], function (values) { return [ values[0] ]; });
pdef.define('member', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.member(values[1], values[0]); });

// constant declaration
pdef.define('constantdecl', [ 'type', 'name:constant', 'name:', 'operator:=', 'expression' ], function (values) { return geast.namedconstant(values[2], values[0], values[4]); });

// import
pdef.define('import', [ 'keyword:import', 'string:', 'name:as', 'name:', 'delimiter:;' ], function (values) { return geast.import(values[1], values[3]); });
pdef.define('import', [ 'keyword:import', 'string:', 'delimiter:;' ], function (values) { return geast.import(values[1]); });
pdef.define('import', [ 'keyword:import', 'operator:*', 'name:as', 'name:', 'name:from', 'string:', 'delimiter:;' ], function (values) { return geast.import(values[5], values[3]); });

// contract and its declarations
pdef.define('contract', [ 'keyword:abstract', 'keyword:contract', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[2], geast.sequence(values[4]), null, true); });
pdef.define('contract', [ 'keyword:abstract', 'keyword:contract', 'name:', 'name:is', 'inheritance-list', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[2], geast.sequence(values[6]), values[4], true); });
pdef.define('contract', [ 'keyword:contract', 'name:', 'name:is', 'inheritance-list', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[1], geast.sequence(values[5]), values[3]); });
pdef.define('contract', [ 'keyword:contract', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.contract(values[1], geast.sequence(values[3])); });
pdef.define('contdecllist', [ 'contdecllist', 'contdecl' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('contdecllist', 'contdecl', function (value) { return [ value ]; });
pdef.define('contdecllist', [ '!', 'delimiter:}' ], function (values) { return [] });
pdef.define('contdecl', 'function');
pdef.define('contdecl', 'konstructor');
pdef.define('contdecl', 'modifier');
pdef.define('contdecl', [ 'event', 'delimiter:;' ], function (values) { return values[0]; });
pdef.define('contdecl', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0]); });

pdef.define('inheritance-list', [ 'inheritance-list', 'delimiter:,', 'name' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('inheritance-list', 'name', function (value) { return [ value ]; });

// interface
pdef.define('interface', [ 'keyword:interface', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.interface(values[1], geast.sequence(values[3])); });
pdef.define('interface', [ 'keyword:interface', 'name:', 'name:is', 'inheritance-list', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.interface(values[1], geast.sequence(values[5]), values[3]); });

// library
pdef.define('library', [ 'keyword:library', 'name:', 'delimiter:{', 'contdecllist', 'delimiter:}' ], function (values) { return geast.library(values[1], geast.sequence(values[3])) });

// event
pdef.define('event', [ 'keyword:event', 'name:', 'delimiter:(', 'arglist', 'delimiter:)' ], function (values) { return geast.event(values[1], values[3]); });

// modifier
pdef.define('modifier', [ 'keyword:modifier', 'name:', 'delimiter:(', 'arglist', 'delimiter:)', 'composite-command' ], function (values) { return geast.modifier(values[1], values[3], values[5]); }); 

// state variable visibility
pdef.define('visibility', 'keyword:public');
pdef.define('visibility', 'keyword:private');
pdef.define('visibility', 'keyword:internal');

// commands
// variable declaration
pdef.define('command', [ 'type', '?visibility', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[2], values[0], null, values[1]); });
// variable declaration and initialization
pdef.define('command', [ 'type', '?visibility', 'name:', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.variable(values[2], values[0], values[4], values[1]); });
// return command
pdef.define('command', [ 'keyword:return', 'expression', 'delimiter:;' ], function (values) { return geast.return(values[1]); });
pdef.define('command', [ 'keyword:return', 'delimiter:;' ], function (values) { return geast.return(null); });
// break command
pdef.define('command', [ 'keyword:break', 'delimiter:;' ], function (values) { return geast.break(); });
// continue command
pdef.define('command', [ 'keyword:continue', 'delimiter:;' ], function (values) { return geast.continue(); });
// assign command
pdef.define('command', [ 'leftterm', 'operator:=', 'expression', 'delimiter:;' ], function (values) { return geast.assign(values[0], values[2]); } );
// if command
pdef.define('command', [ 'keyword:if', 'delimiter:(', 'expression', 'delimiter:)', 'command', 'name:else', 'command' ], function (values) { return geast.conditional(values[2], values[4], values[6]); });
pdef.define('command', [ 'keyword:if', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.conditional(values[2], values[4], null); });
// while command
pdef.define('command', [ 'keyword:while', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.loop(values[2], values[4]); });
// expression command
pdef.define('command', [ 'expression', 'delimiter:;'], function (values) { return values[0]; });
// underscore command
pdef.define('command', [ 'name:_', 'delimiter:;'], function (values) { return geast.underscore(); });
// composite command
pdef.define('command', 'composite-command' );
pdef.define('composite-command', [ 'delimiter:{', 'commandlist', 'delimiter:}' ], function (values) { return geast.sequence(values[1]); });
pdef.define('commandlist', [ 'commandlist', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('commandlist', 'command', function (value) { return [ value ]; });
pdef.define('commandlist', [ '!', 'delimiter:}' ], function (values) { return []; });

// functions
pdef.define('function', [ 
    'name:function', 
    'name:', 
    'delimiter:(', 'arglist', 'delimiter:)', 
    'function-attributes', 
    '?returns', 
    'delimiter:;' ], 
    function (values) { 
        return geast.function(
            values[1],      // name
            values[6],      // type
            values[3],      // arguments
            null,           // body
            values[5]       // attributes
        );}
    );
    
pdef.define('function', [ 
    'name:function', 
    'name:', 
    'delimiter:(', 'arglist', 'delimiter:)', 
    'function-attributes', 
    '?returns', 
    'composite-command' ], 
    function (values) { 
        return geast.function(
            values[1],      // name
            values[6],      // type
            values[3],      // arguments
            values[7],      // body
            values[5]       // attributes
        );}
    );
    
pdef.define('konstructor', [ 
    'name:constructor', 
    'delimiter:(', 'arglist', 'delimiter:)', 
    'function-attributes', 
    'composite-command' ], 
    function (values) { 
        return geast.constructor(
            values[2],      // arguments
            values[5],      // body
            values[4]       // attributes
        );}
    );
    
pdef.define('returns', [ 'keyword:returns', 'delimiter:(', 'type', 'delimiter:)' ], function (values) { return values[2]; });
pdef.define('function-attributes', [ 'state-mutability', 'function-attributes' ], function(values) { values[1].mutability = values[0]; return values[1]; });
pdef.define('function-attributes', [ 'function-visibility', 'function-attributes' ], function(values) { values[1].visibility = values[0]; return values[1]; });
pdef.define('function-attributes', [ 'keyword:virtual', 'function-attributes' ], function(values) { values[1].virtual = true; return values[1]; });
pdef.define('function-attributes', [ 'keyword:override', 'function-attributes' ], function(values) { values[1].override = true; return values[1]; });
pdef.define('function-attributes', [ '!', 'keyword:returns' ], function() { return {}; });
pdef.define('function-attributes', [ '!', 'delimiter:{' ], function() { return {}; });
pdef.define('function-attributes', [ '!', 'delimiter:;' ], function() { return {}; });
pdef.define('state-mutability', 'keyword:payable');
pdef.define('state-mutability', 'keyword:view');
pdef.define('state-mutability', 'keyword:pure');
pdef.define('function-visibility', 'keyword:public');
pdef.define('function-visibility', 'keyword:private');
pdef.define('function-visibility', 'keyword:internal');
pdef.define('function-visibility', 'keyword:external');

// function arguments
pdef.define('arglist', [ 'arglist', 'delimiter:,', 'argument' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('arglist', 'argument', function (value) { return [ value ]; });
pdef.define('arglist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('argument', [ 'type', '?storage', 'name:' ], function (values) { return geast.argument(values[2], values[0], values[1]); });
pdef.define('storage', 'keyword:memory');
pdef.define('storage', 'keyword:storage');

// types
pdef.define('type', 'simpletype');
pdef.define('type', 'mapping');
pdef.define('simpletype', 'keyword:uint');

for (let k = 8; k <= 256; k += 8)
    pdef.define('simpletype', 'keyword:uint' + k);
    
pdef.define('simpletype', 'keyword:int');

for (let k = 8; k <= 256; k += 8)
    pdef.define('simpletype', 'keyword:int' + k);
    
pdef.define('simpletype', 'name:byte');
pdef.define('simpletype', 'name:bytes');

for (let k = 1; k <= 32; k++)
    pdef.define('simpletype', 'name:bytes' + k);
    
pdef.define('simpletype', 'keyword:bool');
pdef.define('simpletype', 'keyword:address');
pdef.define('simpletype', 'keyword:string');
pdef.define('simpletype', 'keyword:fixed');
pdef.define('simpletype', 'keyword:ufixed');
pdef.define('mapping', [ 'keyword:mapping', 'delimiter:(', 'simpletype', 'operator:=>', 'type', 'delimiter:)' ], function (values) { return geast.mapping(values[2], values[4]); });
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
pdef.define('expression1', 'expression0');
pdef.define('expression0', [ 'operator:++', 'expression0' ], function (values) { return geast.unary(values[0], values[1]); });
pdef.define('expression0', [ 'operator:--', 'expression0' ], function (values) { return geast.unary(values[0], values[1]); });
pdef.define('expression0', [ 'expression0', 'operator:++' ], function (values) { return geast.unary('_' + values[1], values[0]); });
pdef.define('expression0', [ 'expression0', 'operator:--' ], function (values) { return geast.unary('_' + values[1], values[0]); });
pdef.define('expression0', [ 'operator:-', 'expression0' ], function (values) { return geast.unary(values[0], values[1]); });
pdef.define('expression0', 'term');

// simple terms
pdef.define('name', 'name:', function (value) { return geast.name(value); });
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });

// terms
pdef.define('term', [ 'term', 'delimiter:[', 'expression', 'delimiter:]' ], function (values) { return geast.indexed(values[0], values[2]); } );
pdef.define('term', [ 'term', 'delimiter:(', 'expressionlist', 'delimiter:)' ], function (values) { return geast.call(values[0], values[2]); } );
pdef.define('term', [ 'term', 'delimiter:.', 'name' ], function (values) { return geast.property(values[0], values[2]); } );
pdef.define('expressionlist', [ 'expressionlist', 'delimiter:,', 'expression' ], function (values) { values[0].push(values[2]); return values[0]; });
pdef.define('expressionlist', 'expression', function (value) { return [ value ]; });
pdef.define('expressionlist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('term', 'string');
pdef.define('term', 'integer');
pdef.define('term', 'name');
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

// left term
pdef.define('leftterm', 'name');
pdef.define('leftterm', [ 'leftterm', 'delimiter:[', 'expression', 'delimiter:]' ], function (values) { return geast.indexed(values[0], values[2]); });
pdef.define('leftterm', [ 'leftterm', 'delimiter:.', 'name:' ], function (values) { return geast.property(values[0], values[2]); });

function parseNode(type, text) {
    const lexer = ldef.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};

