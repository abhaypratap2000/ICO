const express = require("express");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../../build/contracts/GBTokenAndCrowdsale.json");
const ContractAddress = cons.networks[5777].address;
const ABI = cons.abi;
const cont1 =  new web3.eth.Contract(ABI,ContractAddress);
const PRIVATE_KEY = "f1bee004181b9f6a76f80e3d6a58c4cb7560c20bf4d1ae86c2608034dcf50636";

const getdata = async(req , res) =>{
    res.send("Hello From the Post Side !");
}

const sendTokens = async(req , res) => {
    const _from = req.body.from;
    const _reciver = req.body.reciver;
    const _amount = req.body.amount;
    const _nonce1 = req.body.nounce;
    const _nonce = await web3.eth.getTransactionCount(_nonce1);
    const sendToken1 = await cont1.methods.sendTokens(_reciver, _amount);
    const data = sendToken1.encodeABI();
    const transaction = {
        from: _from,
        nonce:_nonce,
        gasPrice:"200000",
        gas:"300000",
        to:ContractAddress,
        data,
        // _amount
    }
       const signedTx = await web3.eth.accounts.signTransaction(transaction , PRIVATE_KEY);
       const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
       console.log(reciept);
       res.send(reciept);
    //    console.log(signedTx);
    //    res.send(signedTx);

}

const getBalance = async(req , res)=>{
    const addressOfAccount = req.body.address;
    const addressOfAccount1 = await cont1.methods.getBalance(addressOfAccount).call({from:addressOfAccount});
    res.send(addressOfAccount1);
    console.log(addressOfAccount1);
}

const withdrawRaisedFunds = async(req , res)=>{
    const _Owner = req.body.ownerAddress;
    //const withdrawRaisedFunds2 = await cont1.methods.withdrawRaisedFunds().call({from:`${_Owner}`});
    const withdrawRaisedFunds1 = await cont1.methods.withdrawRaisedFunds().send({from:`${_Owner}`});
    
   // console.log(withdrawRaisedFunds1);
    res.send(withdrawRaisedFunds1);
    // console.log(withdrawRaisedFunds2);
    
}
const buyTokensWithEther = async(req , res)=>{
    const _buyerAddress = req.body.buyersAddress;
    const buyTokensWithEther1 = await cont1.methods.buyTokensWithEther().send({from:`${_buyerAddress}`,value :20});
    res.send(buyTokensWithEther1);
    console.log(buyTokensWithEther1);
    const MyEvent = buyTokensWithEther1.returnValues;
    console.log(MyEvent);
}
module.exports = {
    getdata,
    sendTokens,
    getBalance,
    withdrawRaisedFunds,
    buyTokensWithEther
}
