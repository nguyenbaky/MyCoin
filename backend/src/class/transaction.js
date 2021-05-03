const CryptoJS = require('crypto-js')
class UnspentTxOut {
    constructor(addressFrom, addressTo, amount) {
        this.addressFrom = addressFrom;
        this.addressTo = addressTo;
        this.amount = amount;
    }
}

class Transaction{
    constructor(addressFrom, addressTo, amount,reward) {
        this.addressFrom = addressFrom;
        this.addressTo = addressTo;
        this.amount = amount;
        this.reward = reward
    }
}

const processTransactions = (aTransactions, aUnspentTxOuts, blockIndex) => {

    if (!validateBlockTransactions(aTransactions, aUnspentTxOuts, blockIndex)) {
        console.log('invalid block transactions');
        return null;
    }
    return updateUnspentTxOuts(aTransactions, aUnspentTxOuts);
};

const validateBlockTransactions = (aTransactions, aUnspentTxOuts, blockIndex) => {
    return true
};

const updateUnspentTxOuts = (aTransactions, aUnspentTxOuts) => {
    const newUnspentTxOuts = aTransactions
        .map((t) => {
            return new UnspentTxOut(t.addressFrom, t.addressTo,t.amount );
        })
        .reduce((a, b) => a.concat(b), []);
    
    const consumedTxOuts = aTransactions
        .map((t) => t.addressFrom)

    const resultingUnspentTxOuts = aUnspentTxOuts
        .filter(((uTxO) => consumedTxOuts.includes(uTxO.addressFrom) ))
        .concat(newUnspentTxOuts);
    return resultingUnspentTxOuts;
};

module.exports = {
    processTransactions,Transaction,UnspentTxOut
}