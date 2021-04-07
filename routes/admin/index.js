
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
const ModelsFolder = path.dirname(require.main.filename)+'/models/';
const AllTables =  []


const getModels = new Promise ( (resolve, reject) => fs.readdir(ModelsFolder, function (err, files) {
    //handling error
    try {
        files.forEach(function (file) {
            //remove .js extension then push // first letter is uppercase and singular: Article
            const fileTopush = file.slice(0, file.length-3)
            const exceptions = ['index', 'init-models']
            !exceptions.includes(fileTopush) && AllTables.push(fileTopush)
        });

        resolve()
    } 
    catch (error) {
        console.log('error')
        reject()
    }       //listing all files using forEach
    
}) )

const globalStructure = {}

getModels
    .then(function declareAllCRUDRoutes(){
        AllTables.map(ModelName=>{
            Object.assign(globalStructure, {[ModelName]: Object.keys(models[ModelName].rawAttributes)})
            Index.use(CRUD.crud(`/${ModelName}`, models[ModelName]))
        })
} )   

Index.get('/getStructure', (req, res) => {
    res.send(globalStructure)
});

Index.post("/login", async (req,res)=>{
    // get account from database

    const firstConnection = await models.Users.findAll({ raw:true})
    if (firstConnection.length===0){
        console.log('creating new user as it is first connection')
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await models.Users.create({ email: req.body.username, password: hashedPassword})
    }
    
    const account = await models.Users.findOne({ where:{email: req.body.username}, raw:true});

    
    // check account found and verify password
    if (!account || !bcrypt.compareSync(req.body.password, account.password)) {
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



