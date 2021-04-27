let transactionpool = []

const getTransactionPool = () => {
    return transactionpool;
};

const addToTransactionPool = (tx) => {
    console.log('adding to txPool: %s', JSON.stringify(tx));
    transactionpool.push(tx);
};

const updateTransactionPool = (tx) => {
    transactionpool.filter(txP => txP != tx)
};

module.exports = {
    getTransactionPool,addToTransactionPool,updateTransactionPool
}