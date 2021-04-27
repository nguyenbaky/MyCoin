const blockchain = require('./blockchain')
const transaction = require('./transaction')

class Wallet {
    constructor(address,privateKey,publicKey){
        this.address= address;
        this.privateKey = privateKey;
        this.publicKey = publicKey
    }

}

const findTxOutsForAmount = (addressFrom, amount, reward) => {
    let currentAmount = blockchain.getAccountBalance(addressFrom);    
    if( currentAmount >= amount + reward )
        return currentAmount - amount - reward
    const eMsg = 'Cannot create transaction , not enough balance' 
    throw Error(eMsg);
};


const createTransaction = (addressFrom,addressTo, amount,reward) => {
    const leftOverAmount = findTxOutsForAmount(addressFrom,amount,reward);  
    const txOut1 = new Transaction(addressFrom,addressTo, amount);
    if (leftOverAmount === 0) {
        return [txOut1];
    } else {
        const leftOverTx = new Transaction(addressFrom,addressFrom, leftOverAmount,0);
        return [txOut1, leftOverTx];
    };
};

module.exports= {
    Wallet,findTxOutsForAmount,createTransaction
}