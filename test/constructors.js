
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty constructor'] = function (test) {
    const result = parser.parse('konstructor', 'constructor() {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        arguments: [],
        attributes: {},
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse payable constructor'] = function (test) {
    const result = parser.parse('konstructor', 'constructor() payable {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        attributes: {
            mutability: 'payable'         
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty public constructor'] = function (test) {
    const result = parser.parse('konstructor', 'constructor() public {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        attributes: {
            visibility: 'public'
        },
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse constructor with increment body'] = function (test) {
    const result = parser.parse('konstructor', 'constructor() { counter = counter + 1; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        arguments: [],
        attributes: {
        },
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'assign',
                    lefthand: {
                        ntype: 'name',
                        name: 'counter'
                    },
                    expression: {
                        ntype: 'binary',
                        operator: '+',
                        left: {
                            ntype: 'name',
                            name: 'counter'
                        },
                        right: {
                            ntype: 'constant',
                            value: 1
                        }
                    }
                }
            ]
        }
    });
};

exports['parse constructor with one argument'] = function (test) {
    const result = parser.parse('konstructor', 'constructor(uint value) public { counter = counter + value; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        attributes: {
            visibility: 'public'
        },
        arguments: [
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            }
        ],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'assign',
                    lefthand: {
                        ntype: 'name',
                        name: 'counter'
                    },
                    expression: {
                        ntype: 'binary',
                        operator: '+',
                        left: {
                            ntype: 'name',
                            name: 'counter'
                        },
                        right: {
                            ntype: 'name',
                            name: 'value'
                        }
                    }
                }
            ]
        }
    });
};

exports['parse constructor with two arguments'] = function (test) {
    const result = parser.parse('konstructor', 'constructor(uint value, uint value2) public { counter = counter + value; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'constructor',
        attributes: {
            visibility: 'public'
        },
        arguments: [
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            },
            {
                ntype: 'argument',
                name: 'value2',
                type: 'uint'
            }
        ],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'assign',
                    lefthand: {
                        ntype: 'name',
                        name: 'counter'
                    },
                    expression: {
                        ntype: 'binary',
                        operator: '+',
                        left: {
                            ntype: 'name',
                            name: 'counter'
                        },
                        right: {
                            ntype: 'name',
                            name: 'value'
                        }
                    }
                }
            ]
        }
    });
};

