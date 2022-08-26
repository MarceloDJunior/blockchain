const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    // Bitcoin's blockchain proof-of-work to create a block is to generate a hash that starts with 4 0's
    // Since the hash is calculated based on the data of the block and the hash of the previous block, 
    // there is no way to manipulate the hash
    // The only way is to try different nounces until you get lucky to get the golden hash
    // This requires a lot of computational processing and the first miner to do it creates the block
    // and get bitcoins as a reward.
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash)
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(new Date(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let myNewCoin = new BlockChain();

console.log('Mining Block 1...');
myNewCoin.addBlock(new Block(new Date(), { amount: 4 }));
console.log('Mining Block 2...');
myNewCoin.addBlock(new Block(new Date(), { amount: 10 }));
