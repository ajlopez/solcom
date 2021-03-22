
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty contract'] = function (test) {
    const result = parser.parse('contract', 'contract Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse abstract empty contract'] = function (test) {
    const result = parser.parse('contract', 'abstract contract Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        },
        abstract: true
    });
};

exports['parse empty contract with single inheritance'] = function (test) {
    const result = parser.parse('contract', 'contract Empty is Nothing {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        },
        inheritance: [
            {
                ntype: 'name',
                name: 'Nothing'
            }
        ]
    });
};

exports['parse empty abstract contract with single inheritance'] = function (test) {
    const result = parser.parse('contract', 'abstract contract Empty is Nothing {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        },
        inheritance: [
            {
                ntype: 'name',
                name: 'Nothing'
            }
        ],
        abstract: true
    });
};

exports['parse empty contract with double inheritance'] = function (test) {
    const result = parser.parse('contract', 'contract Empty is Nothing, Nothing2 {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        },
        inheritance: [
            {
                ntype: 'name',
                name: 'Nothing'
            },
            {
                ntype: 'name',
                name: 'Nothing2'
            }
        ]
    });
};

exports['parse contract with variable declaration'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { uint counter; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'counter',
                    type: 'uint'
                }
            ]
        }
    });
};

exports['parse contract with event declaration'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { event EmptyEvent(); }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'event',
                    name: 'EmptyEvent',
                    arguments: []
                }
            ]
        }
    });
};

exports['parse contract with modifier'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { modifier onlyOwner() {} }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'modifier',
                    name: 'onlyOwner',
                    arguments: [],
                    body: {
                        ntype: 'sequence',
                        nodes: []
                    }
                }
            ]
        }
    });
};

exports['parse contract with variable and method declarations'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { uint counter; function increment() { counter = counter + 1; } }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'counter',
                    type: 'uint'
                },
                {
                    ntype: 'method',
                    name: 'increment',
                    arguments: [],
                    attributes: {},
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
                }
            ]
        }
    });
};

exports['parse contract with variable and constructor declarations'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { uint counter; constructor() { counter = counter + 1; } }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'counter',
                    type: 'uint'
                },
                {
                    ntype: 'constructor',
                    arguments: [],
                    attributes: {},
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
                }
            ]
        }
    });
};

