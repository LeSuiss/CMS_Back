const express = require('express')
const Index = express.Router()
const models  = require('../../models');
const CRUD = require('express-sequelize-crud')




Index.use(CRUD.crud('/articles', models.Article)) 
Index.use(CRUD.crud('/contracts', models.Contract)) 


module.exports = Index



