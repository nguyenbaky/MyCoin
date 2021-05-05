const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Transactionpool = require('./class/transactionPool')
const blockchain =  require('./class/blockchain');

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(cors())

//get blockchain
app.get('/blocks',(req,res)=>{
    res.send(blockchain.getBlockchain())
})

app.get('/unspentTransactionOutputs', (req, res) => {
    res.send(blockchain.getUnspentTxOuts());
});

app.get('/balance/:address', (req, res) => {
    const {address} = req.params
    const balance = blockchain.getAccountBalance(address)
    res.send({'balance': balance});
});

app.get('/history/:address',(req,res)=>{
    const aTransactions = blockchain.getAllTransaction()
    const transactionpool = Transactionpool.getTransactionPool()
    const {address} = req.params
    // all transaction
    const result1 = aTransactions.filter(item => {
        return (item.addressFrom === address || item.addressTo === address)
    })
    // filter transaction in transaction pool
    const result = result1.filter(item => {
        return !transactionpool.includes(item) 
    })

    res.send(result)
})

// mine block with transaction in pool
app.post('/mineBlock', (req, res) => {
    const {miner} = req.body
    const transactions = Transactionpool.getTransactionPool()
    const newBlock = blockchain.generateNextBlock(transactions,miner);
    if (newBlock === null) {
        res.status(400).send('could not generate block');
    } else {
        res.send(newBlock);
    }
});

// send transaction to pool
app.post('/sendTransaction', (req,res) => {
    try {
        const {addressFrom, addressTo, amount, reward} = req.body
        // if (addressFrom === undefined || amount === undefined || addressTo === undefined || reward === undefined) {
        //     throw Error('invalid information');
        // }
        const currentAmount = blockchain.getAccountBalance(addressFrom) 
        const resp = blockchain.sendTransaction(addressFrom,addressTo,amount,reward,currentAmount)
        res.send(resp)
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
})

// get transaction pool
app.get('/transactionPool', (req,res) => {
    res.send(Transactionpool.getTransactionPool())
})

app.listen(PORT, () => {
    console.log('Listenning on port: '+ PORT)
})