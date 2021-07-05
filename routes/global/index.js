const express = require('express')
const Index = express.Router()
const models  = require('../../models');

Index.use("/", (req,res)=>{
  console.log("object")
            res.send({testBack:'xfsdfdqs', test222:"totoestMagique", onemore:"hoho"})
        
    }
)



module.exports = Index
