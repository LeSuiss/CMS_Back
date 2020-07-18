const express = require('express')
const fs = require('fs');
const CRUD = require('express-sequelize-crud')
const path = require('path')

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
                fileTopush !== 'index' &&AllTables.push(fileTopush)
            });

            resolve()
        } 
        catch (error) {
            console.log('error')
        }       //listing all files using forEach
        
    })
    )
    
    getModels.then((res)=>
        AllTables.map(ModelName=>{Index.use(CRUD.crud(`/${ModelName}s`, models[ModelName]))})
    )        
                

module.exports = Index



