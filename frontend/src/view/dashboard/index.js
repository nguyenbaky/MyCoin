import axios from 'axios'
import React,{useState,useEffect} from 'react'

const URL = 'http://localhost:5000'

const Dashboard = () => {

    const [address,setAddress] = useState('0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223')
    const [transactionPool,setTransactionPool] = useState([])
    const [blockchain,setBlockchain] = useState([])
    const [balance,setBalance] = useState(0)
    const [history,setHistory] = useState([])
    const [loading,setLoading] = useState(true)

    blockchain.map(block => console.log(block.hash))

    useEffect(() =>{
        axios.get(`${URL}/blocks`)
        .then(response=>{
            console.log(response.data)
            setBlockchain(response.data)
        })

        axios.get(`${URL}/balance/${address}`)
        .then(response =>{
            console.log(response.data.balance)
            setBalance(response.data.balance)
        })

        axios.get(`${URL}/transactionPool`)
        .then(response=>{
            console.log(response.data)
            setTransactionPool(response.data)
        })
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
                                        <button className='btn btn-primary' style={{float:''}}>Show history</button>
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
                            <input style={{width:'100%' ,textAlign:'right'}}></input>
                            <p>Amount</p>
                            <input style={{width:'100%' ,textAlign:'right'}}></input>
                            <p>Fund</p>
                            <input style={{width:'100%' ,textAlign:'right'}}></input><br/>
                            <button className='btn btn-primary' style={{marginTop:'5px',float:'right'}}>Send</button>
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