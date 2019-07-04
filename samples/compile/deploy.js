
const solcom = require('../..');
const rskapi = require('rskapi');
const fs = require('fs');

const code = fs.readFileSync('Counter.sol').toString();

console.log('compiling contract...');
const result = solcom.compile(code);

const host = rskapi.host('http://localhost:8545');

(async function() {
    const accounts = await host.getAccounts();
    
    const tx = {
        from: accounts[0],
        gas: 6000000,
        gasPrice: 0,
        data: result
    }

    console.log('deploying instance...');
    const txhash = await host.sendTransaction(tx);
    let txrec = await host.getTransactionReceiptByHash(txhash);
    
    while (!txrec)
        txrec = await host.getTransactionReceiptByHash(txhash);

    console.log('deployed at', txrec.contractAddress);
    
    const runcode = await host.getCode(txrec.contractAddress);
    
    const tx2 = {
        from: accounts[0],
        to: txrec.contractAddress,
        gas: 6000000,
        gasPrice: 0,
        data: '8ada066e'
    }
    
    const counter = await host.callTransaction(tx2);
    
    console.log('counter', parseInt(counter));
    
    const tx3 = {
        from: accounts[0],
        to: txrec.contractAddress,
        gas: 6000000,
        gasPrice: 0,
        data: 'd09de08a'
    }

    console.log('increment...');
    
    const txhash3 = await host.sendTransaction(tx3);
    let txrec3 = await host.getTransactionReceiptByHash(txhash3);
    
    while (!txrec3)
        txrec3 = await host.getTransactionReceiptByHash(txhash3);

    const counter2 = await host.callTransaction(tx2);
    
    console.log('counter', parseInt(counter2));
    
    console.log('add 41...');
    
    const tx4 = {
        from: accounts[0],
        to: txrec.contractAddress,
        gas: 6000000,
        gasPrice: 0,
        data: '1003e2d20000000000000000000000000000000000000000000000000000000000000029'
    }

    const txhash4 = await host.sendTransaction(tx4);
    let txrec4 = await host.getTransactionReceiptByHash(txhash4);
    
    while (!txrec4)
        txrec4 = await host.getTransactionReceiptByHash(txhash4);

    const counter3 = await host.callTransaction(tx2);
    
    console.log('counter', parseInt(counter3));
})();

