const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const scoreReceipt = require('./scoring.js');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const myDict = {}

app.post('/receipts/process',(req,res)=>{
    let id = Date.now();
    let score = scoreReceipt(req.body);
    myDict[id] = {"score":score};
    res.send({'id':id});
})

app.get('/',(req,res)=> res.send("Hello World!"));

app.get("/receipts/:id/points", (req,res) =>{ 
    let id = req.params.id;
    res.send(myDict[id]);

});

app.listen(3000);