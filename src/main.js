const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { BlockChain, Transaction } = require('./blockchain')

const myKey = ec.keyFromPrivate('a51b9b39a028cafc2b05771d715e8c08da2167749af08739ed3128e77bceb63d');
const myWalletAddress = myKey.getPublic('hex');

let myNewCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
myNewCoin.addTransaction(tx1);

console.log('\nStarting the mining...');
myNewCoin.minePendingTransactions(myWalletAddress)

// Here we mine one more block to see the miner balance with the reward
// Because the mining reward in the previous mining is only added to the next block
myNewCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of miner: ' + myNewCoin.getBalanceOfAddress(myWalletAddress));

// Tampering the blockchain
// myNewCoin.chain[1].transactions[0].amount = 1

console.log('Is chain valid?', myNewCoin.isChainValid());

