import React, {useState} from 'react'

const bip39 = require('bip39')

const Login = () => {
    const [mnemonic,setMnemonic] = useState(bip39.generateMnemonic()) 
    const [checkMnemonic,setCheckMnemonic] = useState('')    

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
                    <a style={{color:'green'}} data-toggle="modal" data-target="#exampleModal"> Access My Wallet</a>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        {/* modal choose login  */}
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Access By</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <button type="button" class="btn btn-light" style={{width:'100%',margin:'5px'}}>Private key</button><br/>
                                <button type="button" class="btn btn-light" style={{width:'100%',margin:'5px'}}>Mnemonic Phrases</button>
                            </div>
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