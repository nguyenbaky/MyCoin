import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

const ethers = require('ethers');
const bip39 = require('bip39')
const Web3 = require('web3')
const path = "m/44'/60'/0'/0/0"


const Login = () => {
    let history = useHistory()
    const web3 = new Web3()
    const [mnemonic,setMnemonic] = useState(bip39.generateMnemonic()) 
    const [checkMnemonic,setCheckMnemonic] = useState('')    
    const [privateKey,setPrivateKey] = useState('')
    const [mnemonicLogin,setMnemonicLogin] = useState('')

    const verifyMnemonic = () => {
        if(mnemonic === checkMnemonic) alert('you have create your wallet')
        else alert('mnemonic not match')
    }

    return (
        <div className='container-fluid' style={{backgroundColor:'#f2f2f2',height:'100vh'}}>
            <div className='row'>
                <div className="col-md-3"></div>
                <div className="col-md-9"><h1>MyCoin</h1></div>
            </div>
            <div className='row'>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2>Get a New Wallet</h2>
                    <p style={{display:'inline'}}>Already have a wallet? </p>
                    <a style={{color:'green'}} data-toggle="modal" data-target="#AccessBy"> Access My Wallet</a>

                    {/* modal choose login  */}
                    <div class="modal fade" id="AccessBy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Access By</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <button type="button" class="btn btn-light" data-dismiss='modal' data-toggle='modal' data-target='#PrivateKey' style={{width:'100%',margin:'5px'}}>Private key</button><br/>
                                    <button type="button" class="btn btn-light" data-dismiss='modal' data-toggle='modal' data-target='#Mnemonic' style={{width:'100%',margin:'5px'}}>Mnemonic Phrases</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mnemonic modal */}
                    <div class="modal fade " id="Mnemonic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Mnemonic</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <input placeholder='Enter your mnemonic' style={{width:'100%'}} value={mnemonicLogin} onChange={(e)=>setMnemonicLogin(e.target.value)}></input>
                                    <button className='btn btn-primary' style={{marginTop:'10px'}} onClick={()=>{
                                        const check = bip39.validateMnemonic(mnemonicLogin)
                                        if(!check) {
                                            alert('invalid mnemonic')
                                            return
                                        }
                                        let wallet = ethers.Wallet.fromMnemonic(mnemonicLogin,path)
                                        history.push({
                                            pathname:'/dashboard',   
                                            state:{ address : wallet.address, privateKey:wallet.privateKey}
                                        })
                                    }}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PrivateKey modal */}
                    <div class="modal fade" id="PrivateKey" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">PrivateKey</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <input placeholder='Enter your private key' style={{width:'100%'}} value={privateKey} onChange={(e) => setPrivateKey(e.target.value)}></input>
                                    <button className='btn btn-primary' style={{marginTop:'10px'}} onClick={()=>{
                                        console.log(privateKey)
                                        try{
                                            var account = web3.eth.accounts.privateKeyToAccount(privateKey);
                                            history.push({
                                                pathname:'/dashboard',
                                                state:{ address : account.address, privateKey}
                                            })
                                        }catch(e){
                                            alert('Invalid private key')
                                            return
                                        } 
                                    }}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                                      
                <div className="col-md-4"></div>
            </div>
            <div className='row' style={{marginTop:'30px',}}>
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{borderStyle:'groove',padding:'10px',backgroundColor:'white'}}>
                    <h4>Your Mnemonic Phrase</h4>
                    <i className="fas fa-random" style={{float:'right',margin:'10px',fontSize:'20px'}} onClick={() => setMnemonic(bip39.generateMnemonic())}> Random </i> 
                    <textarea style={{width:'100%'}} value={mnemonic} ></textarea>
                    <button type="button" className="btn btn-success" style={{padding:'10px',left:'150%'}} data-toggle="modal" data-target="#verifyMnemonic">I Wrote Down My Mnemonic Phrase</button>
                    <p><span style={{color:'red',fontWeight:'bold'}}> DO NOT FORGET </span> to save your mnemonic phrase. You will need this to access your wallet. </p> 
                    {/* modal  verify mnemonic*/}
                    <div class="modal fade" id="verifyMnemonic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Verify your mnemonic</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <textarea style={{width:'100%'}} value={checkMnemonic} onChange={(e) => setCheckMnemonic(e.target.value)}> </textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={verifyMnemonic}>Verify</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
            
        </div>

        // modal 
    )
     
}

export default Login