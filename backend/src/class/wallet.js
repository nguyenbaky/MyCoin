const blockchain = require('./blockchain');
const transaction = require('./transaction')

class Wallet {
    constructor(address,privateKey,publicKey){
        this.address= address;
        this.privateKey = privateKey;
        this.publicKey = publicKey
    }

}

const findTxOutsForAmount = ( amount, reward,currentAmount) => {   
    if(parseInt(currentAmount) >= parseInt(amount) + parseInt(reward))
        return parseInt(currentAmount)- parseInt(amount) - parseInt(reward)
    const eMsg = 'Cannot create transaction , not enough balance' 
    throw Error(eMsg);
};


const createTransaction = (addressFrom,addressTo, amount,reward,currentAmount) => {
    const leftOverAmount = findTxOutsForAmount(amount,reward,currentAmount);  
    const txOut1 = new transaction.Transaction(addressFrom,addressTo, amount,reward);
    if (leftOverAmount === 0) {
        return [txOut1];
    } else {
        const leftOverTx = new transaction.Transaction(addressFrom,addressFrom, leftOverAmount,0);
        return [txOut1, leftOverTx];
    };
};

module.exports= {
    Wallet,findTxOutsForAmount,createTransaction
}