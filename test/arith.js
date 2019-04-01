
const parser = require('../lib/parser');

exports['parse add'] = function (test) {
    parseBinary(test, '42 + 0', [ 42, '+', 0] );
    parseBinary(test, '1 + 2', [ 1, '+', 2 ]);
    parseBinary(test, '42 + foo', [ 42, '+', 'foo' ]);
    parseBinary(test, 'foo + 42', [ 'foo', '+', 42 ]);
    parseBinary(test, 'foo + bar', [ 'foo', '+', 'bar' ]);
};

exports['parse subtract'] = function (test) {
    parseBinary(test, '42 - 0', [ 42, '-', 0] );
    parseBinary(test, '1 - 2', [ 1, '-', 2 ]);
    parseBinary(test, '42 - foo', [ 42, '-', 'foo' ]);
    parseBinary(test, 'foo - 42', [ 'foo', '-', 42 ]);
    parseBinary(test, 'foo - bar', [ 'foo', '-', 'bar' ]);
};

exports['parse multiply'] = function (test) {
    parseBinary(test, '42 * 0', [ 42, '*', 0] );
    parseBinary(test, '1 * 2', [ 1, '*', 2 ]);
    parseBinary(test, '42 * foo', [ 42, '*', 'foo' ]);
    parseBinary(test, 'foo * 42', [ 'foo', '*', 42 ]);
    parseBinary(test, 'foo * bar', [ 'foo', '*', 'bar' ]);
};

exports['parse divide'] = function (test) {
    parseBinary(test, '42 / 0', [ 42, '/', 0] );
    parseBinary(test, '1 / 2', [ 1, '/', 2 ]);
    parseBinary(test, '42 / foo', [ 42, '/', 'foo' ]);
    parseBinary(test, 'foo / 42', [ 'foo', '/', 42 ]);
    parseBinary(test, 'foo / bar', [ 'foo', '/', 'bar' ]);
};

exports['parse binary operations in parentheses'] = function (test) {
    parseBinary(test, '(42 + 0)', [ 42, '+', 0 ] );
    parseBinary(test, '(1 - 2)', [ 1, '-', 2 ]);
    parseBinary(test, '(42 * foo)', [ 42, '*', 'foo' ]);
    parseBinary(test, '(foo / 42)', [ 'foo', '/', 42 ]);
};

exports['left associativity in arithmetic operators'] = function (test) {
    parseBinary(test, '1 + 2 + 3', [ [ 1, '+', 2 ], '+', 3 ] );
    parseBinary(test, '1 - 2 - 3', [ [ 1, '-', 2 ], '-', 3 ] );
    parseBinary(test, '1 * 2 * 3', [ [ 1, '*', 2 ], '*', 3 ] );
    parseBinary(test, '1 / 2 / 3', [ [ 1, '/', 2 ], '/', 3 ] );
};

exports['precedence in arithmetic operators'] = function (test) {
    parseBinary(test, '1 + 2 + 3', [ [ 1, '+', 2 ], '+', 3 ] );
    parseBinary(test, '1 + 2 - 3', [ [ 1, '+', 2 ], '-', 3 ] );
    parseBinary(test, '1 + 2 * 3', [ 1, '+', [ 2, '*', 3 ] ] );
    parseBinary(test, '1 - 2 * 3', [ 1, '-', [ 2, '*', 3 ] ] );
    parseBinary(test, '1 + 2 / 3', [ 1, '+', [ 2, '/', 3 ] ] );
    parseBinary(test, '1 - 2 / 3', [ 1, '-', [ 2, '/', 3 ] ] );
    parseBinary(test, '1 * 2 / 3', [ [ 1, '*', 2 ], '/', 3 ] );
    parseBinary(test, '1 * 2 + 3', [ [ 1, '*', 2 ], '+', 3 ] );
    parseBinary(test, '1 * 2 - 3', [ [ 1, '*', 2 ], '-', 3 ] );
    parseBinary(test, '1 / 2 + 3', [ [ 1, '/', 2 ], '+', 3 ] );
    parseBinary(test, '1 / 2 - 3', [ [ 1, '/', 2 ], '-', 3 ] );
};

function parseBinary(test, text, expected) {
    const node = parser.parse('expression', text);
    const obj = toObj(expected);
    
    match(test, node, obj);
    
    function toObj(obj) {
        if (Array.isArray(obj))
            return {
                ntype: 'binary',
                operator: obj[1],
                left: toObj(obj[0]),
                right: toObj(obj[2])
            };
            
        if (typeof obj === 'string')
            return {
                ntype: 'name',
                name: obj
            };
            
        return {
            ntype: 'constant',
            value: obj
        }
    }
}

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        const value = node[n]();
        const expected = obj[n];
        
        if (typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}

