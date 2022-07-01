const express = require("express");
const rout = require("../Router/router");
const parser = require('body-parser')
let path = require('path');
const app = express();
app.set('view engine','ejs');
const port = process.env.PORT||2001;
app.use(parser.urlencoded());
app.use("/",rout.routing);
app.use(express.static(__dirname +'/views'));
app.listen(port , ()=> {
    console.log(`Connection Successfull on ${port}`);
    console.log(`Server started at http://localhost:${port}`);
})