const { BlockChain, Transaction } = require('./blockchain')

let myNewCoin = new BlockChain();
myNewCoin.createTransaction(new Transaction('address1', 'address2', 100));
myNewCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the first mining...');
myNewCoin.minePendingTransactions('miner-address')

console.log('\nBalance of miner: ' + myNewCoin.getBalanceOfAddress('miner-address'));

console.log('\nStarting the second mining...');
myNewCoin.minePendingTransactions('miner-address')

console.log('\nBalance of miner: ' + myNewCoin.getBalanceOfAddress('miner-address'));

