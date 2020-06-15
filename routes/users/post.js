const express= require('express')
const routing = express.Router()
const models = require ('../../models')

routing.use('/post', (req,res)=>{

    const newUser= req.body

    models
        .Users
        .create(newUser)
        .then(x=>res.send(x))
        .catch(err=>console.log(err))

})

module.exports = routing 