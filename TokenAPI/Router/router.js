const {Router} = require('express');
const express = require('express');
const {append} = require('express/lib/response');
const routing = express.Router();
const control = require("../Controller/Controller");
routing.get('/',control.getdata); 
routing.post('/sendToken',control.sendTokens);
routing.get('/getBalance',control.getBalance);
routing.post('/withdrawRaisedFunds' , control.withdrawRaisedFunds);
routing.post('/buyTokensWithEther',control.buyTokensWithEther);
// routing.post('/BbuyTokensWithEther',control.BbuyTokensWithEther);

module.exports = {routing};