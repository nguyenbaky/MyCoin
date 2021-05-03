import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

const URL = 'http://localhost:5000'

const Dashboard = (props) => {

    let browserHistory = useHistory()
    const [address,setAddress] = useState(props.location.state.address)
    const [transactionPool,setTransactionPool] = useState([])
    const [blockchain,setBlockchain] = useState([])
    const [balance,setBalance] = useState(0)
    const [history,setHistory] = useState([])
    const [amount,setAmount] = useState(0)
    const [reciever,setReciever] = useState('')
    const [reward,setReward] = useState(0)

    const sendTransaction = () => {
        const check = transactionPool.filter(tx => tx.addressFrom === address)
        if(check.length > 0) {
            alert('Wating for transaction completed')
            return
        }
        if(amount === 0) {
            alert('Amount need to greater than 0')
            return
        }
        if(reciever === ''){
            alert('Select reciver')
            return
        }
        if(parseInt(balance) < parseInt(amount) + parseInt(reward)){
            alert('Not enough balance')
            return
        }

        axios.post(`${URL}/sendTransaction`,{
            addressFrom:address,
            addressTo:reciever,
            amount,
            reward
        }).then(response =>{
            fetchTransactionPool()
        })


    }

    
    const fetchTransactionPool = () => {
        axios.get(`${URL}/transactionPool`)
        .then(response=>{
            setTransactionPool(response.data)
        })
    }

    const fetchBlocks = () => {
        axios.get(`${URL}/blocks`)
        .then(response=>{
            setBlockchain(response.data)
        })
    }

    const fetchBalacne = () => {
        axios.get(`${URL}/balance/${address}`)
        .then(response =>{
            setBalance(response.data.balance)
        })
    }

    const fetchHistory = () => {
        axios.get(`${URL}/history/${address}`)
        .then(response => {
            setHistory(response.data)
        })
    }

    useEffect(() =>{
        if(!address){
            browserHistory.push({pathname:'/'})
            return
        }

        fetchBlocks()
        fetchBalacne()
        fetchHistory()
        fetchTransactionPool()
    },[])


    return (
        <div className='container-fluid' style={{marginTop:'15px',marginLeft:'20px',marginRight:'50px'}}>
            <div className='row'>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="card">
                                <span className="text-center">
                                    <h2>Address</h2>
                                    <p>{address}</p>
                                </span>
                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        Balance: {balance}
                                    </h5>
                                    <div style={{textAlign:'center'}}>
                                        <button className='btn btn-primary' data-toggle='modal' data-target='#History' style={{float:''}}>Show history</button>
                                        {/* history modal */}
                                        <div class="modal fade" id="History" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">History</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        { history.map(item => (
                                                            item.addressFrom === address ? 
                                                            <p>Send {item.amount} coins to {item.addressTo} </p>:
                                                            <p>Recieve {item.amount} coins from {item.addressFrom}</p>
                                                        )) }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   

                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                    <div className="card">
                        <span className="text-center">
                            <h2>Reciept</h2>
                        </span>
                        <div className="card-body">
                            <p>Select user</p>
                            <input style={{width:'100%' ,textAlign:'right'}} value={reciever} onChange={(e) => setReciever(e.target.value)}></input>
                            <p>Amount</p>
                            <input style={{width:'100%' ,textAlign:'right'}} value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                            <p>Reward</p>
                            <input style={{width:'100%' ,textAlign:'right'}} value={reward} onChange={(e) => setReward(e.target.value)}></input><br/>
                            <button className='btn btn-primary' style={{marginTop:'5px',float:'right'}} onClick={sendTransaction}>Send</button>
                        </div>
                    </div>
                </div>
                    </div>
                    <div className='row' style={{marginTop:'10px'}}>
                        <div className='col-sm-12'>
                            <div className="card">
                                <span className="text-center">
                                    <h2>BlockChain</h2>
                                </span>
                                <div className="card-body">
                                    {                                     
                                        blockchain.map(block => (
                                            <div className='border' style={{padding:'5px',textAlign:'center',marginBottom:'10px'}}>
                                                <h3>Block number: {block?.index}</h3>
                                                <h4>Previous Hash </h4>
                                                <p>{block?.previousHash}</p>
                                                <h4>Data </h4>
                                                {/* <p>From: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                                <p>To: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                                <p>Amount: 50, Fund: 5</p> */}
                                                <p>Transactions: {block?.transactions.length}</p>
                                                <h4>Time</h4>
                                                <p>{block?.timestamp}</p>
                                                <h4>Hash</h4>
                                                <p>{block?.hash}</p>
                                            </div>
                                        ))    
                                    }
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <div className='col-sm-4'>
                    <div className="card">
                        <span className="text-center">
                            <h2>Transaction pool</h2>
                        </span>
                        <div className="card-body">
                            {
                               transactionPool.map(item => (
                                <div className='border' style={{padding:'5px',width:'100%',marginBottom:'10px'}} >
                                    <p>From: {item.addressFrom}</p>
                                    <p>To: {item.addressTo}</p>
                                    <p>Amount: {item.amount}</p>
                                    <p>Reward: {item.reward}</p>
                                </div>
                               ))
                            }
                            <button className='btn btn-primary' style={{float:'right'}} >Mine</button>
                        </div>
                    </div>
                </div>
            </div>
                   
        </div>
    )
}

export default Dashboard