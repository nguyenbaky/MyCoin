import axios from 'axios'
import React,{useState,useEffect} from 'react'

const URL = 'localhost:5000'

const Dashboard = () => {

    const [transactionPool,setTransactionPool] = useState({
        addressFrom: '0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223',
        addressTo:'0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223',
        amount:50,
        fund:5
    })
    const [blockchain,setBlockchain] = useState([])
    const [wallet,setWallet] = useState({
        Address:'0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223',
        privateKey:'0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223',
        balance:100,
    })
    const [history,setHistory] = useState([])

    useEffect(()=>{
        axios.get(`${URL}/blocks`).then(response=>{
            setBlockchain(response)
        })
        axios.get
    })

    return (
        <div className='container-fluid' style={{marginTop:'5px',marginLeft:'20px',marginRight:'50px'}}>
            <div className='row'>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="card">
                                <span className="text-center">
                                    <h2>Address</h2>
                                    <p>0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                </span>
                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        Balance: 100
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
                                    <div className='border' style={{padding:'5px',textAlign:'center',marginBottom:'10px'}}>
                                        <h3>Block number: 0</h3>
                                        <h4>Previous Hash </h4>
                                        <p>0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                        <h4>Data </h4>
                                        <p>From: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                        <p>To: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                        <p>Amount: 50, Fund: 5</p>
                                        <h4>Time</h4>
                                        <p>Tue 27/4/2021 8:32 AM</p>
                                        <h4>Hash</h4>
                                        <p>0x12molasdp49aadaasdjnoijjmlpoajsdpop</p>
                                    </div>
                                    <div className='border' style={{padding:'5px',textAlign:'center'}}>
                                        <h3>Block number: 1</h3>
                                        <h4>Previous Hash </h4>
                                        <p>0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                        <h4>Data </h4>
                                        <p>From: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                        <p>To: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                                        <p>Amount: 50, Fund: 5</p>
                                        <h4>Time</h4>
                                        <p>Tue 27/4/2021 8:32 AM</p>
                                        <h4>Hash</h4>
                                        <p>0x12molasdp49aadaasdjnoijjmlpoajsdpop</p>
                                    </div>
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
                           <button className='border' style={{padding:'5px',width:'100%',marginBottom:'10px'}} >
                               <p>From: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                               <p>To: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                               <p>Amount: 50</p>
                               <p>Fund: 5</p>
                           </button>
                           <button className='border' style={{padding:'5px',width:'100%',marginBottom:'10px'}}>
                               <p>From: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                               <p>To: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                               <p>Amount: 50</p>
                               <p>Fund: 5</p>
                           </button>
                           <button className='border' style={{padding:'5px',width:'100%',marginBottom:'10px'}}>
                               <p>From: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                               <p>To: 0x6AAc7F545312d4202d72DAeA39daCF3f05aC3223</p>
                               <p>Amount: 50</p>
                               <p>Fund: 5</p>
                           </button>
                            <button className='btn btn-primary' style={{float:'right'}} >Mine</button>
                        </div>
                    </div>
                </div>
            </div>
                   
        </div>
    )
}

export default Dashboard