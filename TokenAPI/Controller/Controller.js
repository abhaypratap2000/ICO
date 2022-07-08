const express = require("express");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../../build/contracts/ICO.json");
const ContractAddress = cons.networks[5777].address;
const ABI = cons.abi;
const cont1 = new web3.eth.Contract(ABI, ContractAddress);
const PRIVATE_KEY =
  "dc56947b11c04229586ea80de853522c7df03ec0f024bf5f2c6551476b3aa310";
// const getdata = async(req , res) =>{
//     res.send("Hello From the Post Side !");
//     
// }
const getdata = async (req, res) => {
  res.render("home");
};
// const transfer = async (req, res) => {
//   const _from = req.body.from;
//   const _reciver = req.body.reciver;
//   const _amount = req.body.amount;
//   const _nonce1 = req.body.nounce;
//   const _nonce = await web3.eth.getTransactionCount(_nonce1);
//   const sendToken1 = await cont1.methods.transfer(_reciver, _amount);
//   const data = sendToken1.encodeABI();
//   const transaction = {
//     from: _from,
//     nonce: _nonce,
//     gasPrice: "200000",
//     gas: "300000",
//     to: ContractAddress,
//     data,
//     // _amount
//   };
//   const signedTx = await web3.eth.accounts.signTransaction(
//     transaction,
//     PRIVATE_KEY
//   );
//   const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   console.log(reciept);
//   res.send(reciept);
//   //    console.log(signedTx);
//   //    res.send(signedTx);
// };

const getBalance = async (req, res) => {
  const addressOfAccount = req.body.address;
  const addressOfAccount1 = await cont1.methods
    .getBalance(addressOfAccount)
    .call({ from: addressOfAccount });
  let x = parseInt(addressOfAccount1);
  x = x / 1 * Math.pow(10, 18);
  console.log(addressOfAccount1);
  res.send(x.toString());
};

const buyTokensWithEther = async (req, res) => {
  const x = req.body.value;
  const _value = x * Math.pow(10, 18);
  const _buyerAddress = req.body.buyersAddress;
  const data = await cont1.methods.buyTokensWithEther().encodeABI()
 
  const _nonce = await web3.eth.getTransactionCount(`${_buyerAddress}`);
  
  const transaction = {
        from: `${_buyerAddress}`,
        nonce: _nonce,
        value: _value,
        gasPrice: "200000",
        gas: "300000",
        to: ContractAddress,
        data,
      
      };
      const signedTx = await web3.eth.accounts.signTransaction(
            transaction,
            PRIVATE_KEY
          );
      const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
          console.log(reciept);
          // res.send(reciept);
          //    console.log(signedTx);
          //    res.send(signedTx);

  const x1 = await cont1.getPastEvents("TokenBuy", {
    fromBlock: "latest",
  });
  // res.send(x1);
  // console.log(x1);
  const c = {
    sender: `${x1[0].returnValues.sender}`,
    receiver: `${x1[0].returnValues.receiver}`,
    fundTransfered: `${x1[0].returnValues.fundTransfered}`,
    tokensIssued: `${parseInt(x1[0].returnValues.tokensIssued)/10**18}`,
  };
  // c.tokensIssued = parseInt(c.tokensIssued);
  // c.tokensIssued = c.tokensIssued/10**18;
  console.log(c);
  // console.log(buyTokensWithEther1);

  if (reciept.status == true) {
    // res.send(buyTokensWithEther1)
       res.send(
      `Transaction sucessfull \n recepit is from: ${x1[0].returnValues.sender}, \n to:${x1[0].returnValues.receiver},\n fundsReceived:${x1[0].returnValues.fundTransfered}, \n tokensIssued:${parseInt(x1[0].returnValues.tokensIssued)/10**18}`
    );
  } else {
    res.send("transaction failed");
  }
};

module.exports = {
  getdata,
  getBalance,
  buyTokensWithEther,
};
