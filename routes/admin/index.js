
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

const express = require('express')
const fs = require('fs');
const CRUD = require('express-sequelize-crud')
const path = require('path')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const models  = require('../../models');

const Index = express.Router()

const globalStructure = {}

for (const ModelName of Object.keys(models.sequelize.models)) {
    Object.assign(globalStructure, {[ModelName]: Object.keys(models[ModelName].rawAttributes)})
    Index.use(CRUD.crud(`/${ModelName}`, models[ModelName]))
    
}
console.log(models.sequelize.modelManager)

Index.get('/getStructure', (req, res) => {
    res.send(globalStructure)
});

Index.post("/login", async (req,res)=>{
    // get account from database

    const firstConnection = await models.Users.findAll({ raw:true})
    if (firstConnection.length===0){
        console.log('creating new user as it is first connection')
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await models.Users.create({ "email_email": req.body.username, text_password: hashedPassword})
    }
    
    const account = await models.Users.findOne({ where:{"email_email": req.body.username}, raw:true});

    
    // check account found and verify password
    if (!account || !bcrypt.compareSync(req.body.password, account.text_password)) {
        // authentication failed
        console.log('refused')
        res.send({isAuth: false});
    } else {
        console.log('succes in logging: sending token to front')
        // authentication successful
        const token = jwt.sign({data:req.body.username}, config.jwt_secret, { expiresIn: '1h', });
        res.send({isAuth: true, jwt_token: token});
    }
})


Index.post("/checkAuth", async (req,res)=>{
    // get account from database
    let result = {
        isAuth: false,
        message: null, 
    }
    try {
        let token = jwt.verify(req.body.jwt_token, config.jwt_secret)
        let current = new Date()
        result.isAuth = new Date(token.iat) < current && current >new Date(token.exp)
        if (!result.isAuth) result.message= 'token périmé' 
    } 
    catch (error) {
        console.log("catching token verification error:" , error)
    } 
   console.log(result)
   res.send(result)
})




module.exports = Index



