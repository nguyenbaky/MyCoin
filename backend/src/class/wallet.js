import {getAccountBalance} from './blockchain'
import {Transaction} from './transaction'

class Wallet {
    constructor(public,private){
        this.public = public
        this.private = private
    }

}

const findTxOutsForAmount = (addressFrom, amount, reward) => {
    let currentAmount = getAccountBalance(addressFrom);    
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
        const leftOverTx = new Transaction(addressFrom,addressFrom, leftOverAmount);
        return [txOut1, leftOverTx];
    };
};

export {
    Wallet,findTxOutsForAmount,createTransaction
}