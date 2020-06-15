'use strict'

module.exports = (sequelize, DataTypes)=>{
    const Contract = sequelize.define(
        'Contract',
        {
            Name : DataTypes.STRING,
            Category : DataTypes.STRING,
        },
        {}
    );
    
    Contract.associate = (models) =>{
        models.Contract.belongsToMany(models.Article, { through: "Article_Contract"})
    }
    
    return Contract
}