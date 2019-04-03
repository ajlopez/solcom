
const parser = require('../../lib/parser');
const fs = require('fs');

const code = fs.readFileSync(process.argv[2]).toString();

console.log(code);

const result = parser.parse('program', code);

console.log(JSON.stringify(toObject(result), null, 2));

function arrayToObject(array) {
    const result = [];
    
    if (array.length === 0)
        return result;
    
    for (let k = 0; k < array.length; k++)
        result.push(toObject(array[k]));
    
    return result;
}

function toObject(node) {
    if (node == null)
        return null;
    
    if (Array.isArray(node))
        return arrayToObject(node);
    
    const result = {};
    
    for (let n in node) {
        if (n === 'process' || n === 'define')
            continue;
        
        let value;
        
        if (typeof node[n] === 'function')
            value = node[n]();
        else
            value = node[n];
        
        if (value && typeof value === 'object')
            result[n] = toObject(value);
        else
            result[n] = value;
    }
    
    return result;
}
