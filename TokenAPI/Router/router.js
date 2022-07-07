const {Router} = require('express');
const express = require('express');
const {append} = require('express/lib/response');
const routing = express.Router();
const control = require("../Controller/Controller");
routing.get('/',control.getdata); 
// routing.post('/transfer',control.transfer);
routing.get('/getBalance',control.getBalance);
routing.post('/buyTokensWithEther',control.buyTokensWithEther);
// routing.post('/BbuyTokensWithEther',control.BbuyTokensWithEther);

module.exports = {routing};