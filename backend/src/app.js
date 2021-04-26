import {
    Block, generateNextBlock, generatenextBlockWithTransaction, generateRawNextBlock, getAccountBalance,
    getBlockchain, getMyUnspentTransactionOutputs, getUnspentTxOuts, sendTransaction
} from './class/blockchain';
import {getTransactionPool,addToTransactionPool} from './class/transactionPool'
import {Transaction} from './class/transaction'

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const httpSttCode = require('http-status-codes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/blocks',(req,res)=>{
    res.send(getBlockchain())
})

app.get('/unspentTransactionOutputs', (req, res) => {
    res.send(getUnspentTxOuts());
});

// mine block with transaction in pool
app.post('/mineBlock', (req, res) => {
    const {addressFrom, addressTo, amount,reward, miner} = req.body
    const transaction = new Transaction(addressFrom,addressTo,amount,reward)
    const newBlock = generateNextBlock(transaction,miner);
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
        const resp = sendTransaction(addressFrom,addressTo,amount,reward)
        res.send(resp)
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
})

app.get('/transactionPool', (req,res) => {
    res.send(getTransactionPool)
})

app.listen(PORT, () => {
    console.log('Listenning on port: '+ PORT)
})