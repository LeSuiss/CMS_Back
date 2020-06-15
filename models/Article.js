'use strict';

module.exports = (sequelize, DataTypes) => {

    const Article = sequelize.define('Article', {
        Title: {type : DataTypes.STRING, defaultValue: "miaou"},
        Content: DataTypes.INTEGER,
        Tags: DataTypes.STRING,
    }, {Timestamps: false});
  
    Article.associate = function(models) {
    // associations can be defined here
    
    // Articles.hasOne(models.MenuTiming);
    // Articles.hasOne(models.Origins)
    
    Article.belongsToMany(
        models.Contract,{through: "Article_Contract" }
    )


  };
  return Article;
};