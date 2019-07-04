
const parser = require('./parser');
const evmcompiler = require('evmcompiler');

function compileText(text) {
    const ast = parser.parse('program', text);
    
    return evmcompiler.compile(ast);
}

module.exports = {
    compile: compileText
};

