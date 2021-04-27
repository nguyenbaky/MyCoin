const CryptoJS = require('crypto-js')
const transaction = require('./transaction');
const transactionPool = require('./transactionPool')
const wallet = require('./wallet')

class Block{
    constructor(index,previousHash,timestamp,transactions,hash,difficulty,nonce){
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = hash;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }
}

const genesisTransaction = [{
    addressFrom: 'admin',
    addressTo: '0x04a25215daa87f58b1369fadd316e03b3b074c5e3cc05d74739b0e3149ee7a46a9bc046b7829bf29a822e459364d7722f8f6c54fd3f9cedb554b423f41494a6352',
    amount: 50,
    reward: 0
},{
    addressFrom: 'admin',
    addressTo: '0x04a25215daa87f58b1369fadd316e03b3b074c5e3cc05d74739b0e3149ee7a46a9bc046b7829bf29a822e459364d7722f8f6c54fd3f9cedb554b423f41494a6352',
    amount: 30,
    reward: 0
}]

const genesisBlock = new Block(
    0,'',1465154705,genesisTransaction ,'91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627', 0, 0
);

let blockchain = [genesisBlock]
let unspentTxOuts = transaction.processTransactions(blockchain[0].transactions, [], 0);
const getLatestBlock = () => blockchain[blockchain.length - 1];

const getBlockchain = () => blockchain;
const getUnspentTxOuts = () => unspentTxOuts;

const calculateHash = (index, previousHash, timestamp, transactions,difficulty, nonce) => CryptoJS.SHA256(index + previousHash + timestamp + transactions + difficulty + nonce).toString();
const calculateHashForBlock = (block) => calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);

const findBlock = (index, previousHash, timestamp, transactions, difficulty) => {
    let nonce = 0;
    while (true) {
        const hash = calculateHash(index, previousHash, timestamp, transactions, difficulty, nonce);
        if (hashMatchesDifficulty(hash, difficulty)) {
            return new Block(index, hash, previousHash, timestamp, transactions, difficulty, nonce);
        }
        nonce++;
    }
};

const hashMatchesDifficulty = (hash, difficulty) => {
    const hashInBinary = hexToBinary(hash);
    const requiredPrefix = '0'.repeat(difficulty);
    return hashInBinary.startsWith(requiredPrefix);
};

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

const generateNextBlock = (transaction,miner) => {
    const previousBlock = getLatestBlock();
    const difficulty = getDifficulty(getBlockchain());
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = getCurrentTimestamp();
    const newBlock = findBlock(nextIndex, previousBlock.hash, nextTimestamp, transactions, difficulty);
    if (addBlockToChain(newBlock)) {
        // add reward for miner to unspentTxOuts
        let rewardForMiner = new UnspentTxOut(transaction.addressFrom,miner,transactions[0].reward)
        unspentTxOuts.push(rewardForMiner)
        // update transaction pool
        transactions.map(tx => transactionPool.updateTransactionPool(tx))
        return newBlock;
    } else {
        return null;
    }

};

const addBlockToChain = (newBlock) => {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        const retVal = processTransactions(newBlock.data, getUnspentTxOuts(), newBlock.index);
        if (retVal === null) {
            console.log('block is not valid in terms of transactions');
            return false;
        } else {
            blockchain.push(newBlock);
            setUnspentTxOuts(retVal);
            updateTransactionPool(unspentTxOuts);
            return true;
        }
    }
    return false;
};

const setUnspentTxOuts = (newUnspentTxOut) => {
    console.log('replacing unspentTxouts with: %s', newUnspentTxOut);
    unspentTxOuts = newUnspentTxOut;
};

const isValidBlockStructure = (block) => {
    return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previousHash === 'string'
        && typeof block.timestamp === 'number'
        && typeof block.data === 'object';
};

const isValidTimestamp = (newBlock, previousBlock) => {
    return ( previousBlock.timestamp - 60 < newBlock.timestamp )
        && newBlock.timestamp - 60 < getCurrentTimestamp();
};

const hasValidHash = (block) => {

    if (!hashMatchesBlockContent(block)) {
        console.log('invalid hash, got:' + block.hash);
        return false;
    }

    if (!hashMatchesDifficulty(block.hash, block.difficulty)) {
        console.log('block difficulty not satisfied. Expected: ' + block.difficulty + 'got: ' + block.hash);
    }
    return true;
};

const hashMatchesBlockContent = (block) => {
    const blockHash = calculateHashForBlock(block);
    return blockHash === block.hash;
};

const isValidNewBlock = (newBlock, previousBlock) => {
    if (!isValidBlockStructure(newBlock)) {
        console.log('invalid block structure: %s', JSON.stringify(newBlock));
        return false;
    }
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (!isValidTimestamp(newBlock, previousBlock)) {
        console.log('invalid timestamp');
        return false;
    } else if (!hasValidHash(newBlock)) {
        return false;
    }
    return true;
};


const getAccountBalance = (address) => {
    const u = getUnspentTxOuts()
    return getBalance(address, getUnspentTxOuts());
};

const getBalance = (address,unspentTxOuts) => {
    const balance = findUnspentTxOuts(address,unspentTxOuts)
                    .map(uTxo => uTxo.amount)
                    .reduce((a,b) => a+b,0)
    return balance 
}

// 
const findUnspentTxOuts = (ownerAddress, unspentTxOuts) => {
    return unspentTxOuts.filter((uTxO) => uTxO.addressTo === ownerAddress);
};

// create 3 transaction pool from transaction
const sendTransaction = (addressFrom,addressTo, amount,reward) => {
    const tx= wallet.createTransaction(addressFrom, addressTo, amount, reward);
    transactionPool.addToTransactionPool(tx);
    return tx;
};

module.exports ={
    Block,getLatestBlock,getUnspentTxOuts,addBlockToChain,getAccountBalance,getBlockchain,sendTransaction,generateNextBlock
}