const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Transactionpool = require('./class/transactionPool')
const Transaction = require('./class/transaction')
const blockchain =  require('./class/blockchain');

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
// app.use(cors())

//get blockchain
app.get('/blocks',(req,res)=>{
    res.send(blockchain.getBlockchain())
})

app.get('/unspentTransactionOutputs', (req, res) => {
    res.send(blockchain.getUnspentTxOuts());
});

app.get('/balance/:address', (req, res) => {
    const {address} = req.params
    console.log('address '+ address)
    // const unspentTxOuts = getUnspentTxOuts()
    // const balance = unspentTxOuts.find(uTxO => uTxO.addressTo = address).map(uTxO => uTxO.amount).reduce((a,b)=> a+b,0)
    const balance = blockchain.getAccountBalance(address)
    res.send({'balance': balance});
});


// mine block with transaction in pool
app.post('/mineBlock', (req, res) => {
    const {transactions} = req.body
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
        if (addressFrom === undefined || amount === undefined || addressTo === undefined || reward === undefined) {
            throw Error('invalid information');
        }
        const resp = blockchain.sendTransaction(addressFrom,addressTo,amount,reward)
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