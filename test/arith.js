
const parser = require('../lib/parser');
const geast = require('geast');

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
    parseBinary(test, '(42 + 1) * 2', [ [ 42, '+', 1 ], '*', 2 ] );
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

exports['parse preincrement'] = function (test) {
    const node = parser.parse('expression', '++a');
    
    test.deepEqual(geast.toObject(node),
        {
            ntype: 'unary',
            operator: '++',
            expression: {
                ntype: 'name',
                name: 'a'
            }
        }
    );
}

exports['parse predecrement'] = function (test) {
    const node = parser.parse('expression', '--a');
    
    test.deepEqual(geast.toObject(node),
        {
            ntype: 'unary',
            operator: '--',
            expression: {
                ntype: 'name',
                name: 'a'
            }
        }
    );
}

exports['parse negative term'] = function (test) {
    const node = parser.parse('expression', '-a');
    
    test.deepEqual(geast.toObject(node),
        {
            ntype: 'unary',
            operator: '-',
            expression: {
                ntype: 'name',
                name: 'a'
            }
        }
    );
}

function parseBinary(test, text, expected) {
    const node = parser.parse('expression', text);
    const obj = toObj(expected);
    
    test.deepEqual(geast.toObject(node), obj);
    
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

