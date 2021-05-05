// let transactionpool = [{
//     addressFrom: '0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223',
//     addressTo:'0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223',
//     amount:50,
//     reward:5
// }]

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

const clearTransactionPool = () => transactionpool = []

module.exports = {
    getTransactionPool,addToTransactionPool,updateTransactionPool,clearTransactionPool
}