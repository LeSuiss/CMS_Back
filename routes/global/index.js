const express = require('express')
const Index = express.Router()
const models  = require('../../models');

Index.use("/", (req,res)=>{
    try{
        setTimeout(() => {
            res.send('xfsdfdqs')
        }, 1000);
        
    }
    catch{(x)=>console.log(x)}
})



module.exports = Index
