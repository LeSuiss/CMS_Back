const express = require('express')
const Index = express.Router()
const models  = require('../../models');

Index.use("/", (req,res)=>{
    try{
        models.Article.findAll()
        .then(x=>res.send(x))

    }
    catch{(x)=>console.log(x)}
})



module.exports = Index
