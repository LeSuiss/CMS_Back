'use strict';

const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


const sequelizeLogger = require('sequelize-log-syntax-colors');
config.logging = function (text) { console.log(sequelizeLogger(text)); }


let sequelize;

if (process.env){
    sequelize = new Sequelize(
        process.env.DB_SELECTED, 
        
        process.env.DB_USER, 
        process.env.DB_PASSWORD, 
        config)
}
else {
    config.use_env_variable? 
        sequelize = new Sequelize(process.env[config.use_env_variable], config)
    :
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    const initModels = require("./init-models");

Object.assign(db, initModels(sequelize));

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
