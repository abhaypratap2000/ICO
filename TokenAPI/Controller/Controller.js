const express = require("express");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../../build/contracts/GBTokenAndCrowdsale.json");
const ContractAddress = cons.networks[5777].address;
const ABI = cons.abi;
const cont1 = new web3.eth.Contract(ABI, ContractAddress);
const PRIVATE_KEY =
  "56afdd7fab5a53c7a6a998c96666b75d74f11bf9bfdd298564ca2dcead80f1a3;";
// const getdata = async(req , res) =>{
//     res.send("Hello From the Post Side !");
//     // res.render('home',{name :"Abhay Pratap Singh"});
// }
const getdata = async (req, res) => {
  res.render("home");
};
const sendTokens = async (req, res) => {
  const _from = req.body.from;
  const _reciver = req.body.reciver;
  const _amount = req.body.amount;
  const _nonce1 = req.body.nounce;
  const _nonce = await web3.eth.getTransactionCount(_nonce1);
  const sendToken1 = await cont1.methods.sendTokens(_reciver, _amount);
  const data = sendToken1.encodeABI();
  const transaction = {
    from: _from,
    nonce: _nonce,
    gasPrice: "200000",
    gas: "300000",
    to: ContractAddress,
    data,
    // _amount
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  );
  const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(reciept);
  res.send(reciept);
  //    console.log(signedTx);
  //    res.send(signedTx);
};

const getBalance = async (req, res) => {
  const addressOfAccount = req.body.address;
  const addressOfAccount1 = await cont1.methods
    .getBalance(addressOfAccount)
    .call({ from: addressOfAccount });
  res.send(addressOfAccount1);
  console.log(addressOfAccount1);
};

const buyTokensWithEther = async (req, res) => {
  const _value = req.body.value;
  const _buyerAddress = req.body.buyersAddress;
  const addressOfAccount1 = await cont1.methods.getBalance("0xD32A8F84d3472c7599e8fF23A8a0C0629bCc7772")
  .call();
  const x = parseInt(addressOfAccount1);
  if (_value <= x) {
    const buyTokensWithEther1 = await cont1.methods.buyTokensWithEther().send({ from: `${_buyerAddress}`, value: _value });
    const x = await cont1.getPastEvents("TokenBuy", {
      fromBlock: "latest",
    });
    const c = {
      from: `${x[0].returnValues.from}`,
      to: `${x[0].returnValues.to}`,
      fundsReceived: `${x[0].returnValues.fundsReceived}`,
      tokensIssued: `${x[0].returnValues.tokensIssued}`,
    };
    console.log(buyTokensWithEther1);

    if (buyTokensWithEther1.status == true) {
      // res.send(buyTokensWithEther1)
      res.send(
        `Transaction sucessfull \n recepit is from: ${x[0].returnValues.from}, \n to:${x[0].returnValues.to},\n fundsReceived:${x[0].returnValues.fundsReceived}, \n tokensIssued:${x[0].returnValues.numberOfTokens}`
      );
    } else {
      res.send("transaction failed");
    }
  } else res.send("value is less");
};

module.exports = {
  getdata,
  sendTokens,
  getBalance,
  buyTokensWithEther,
};
