let transactionpool = []

const getTransactionPool = () => {
    return _.cloneDeep(transactionPool);
};

const addToTransactionPool = (tx) => {
    console.log('adding to txPool: %s', JSON.stringify(tx));
    transactionPool.push(tx);
};

const updateTransactionPool = (tx) => {
    transactionpool.filter(txP => txP == tx)
};

export {
    getTransactionPool,addToTransactionPool,updateTransactionPool
}