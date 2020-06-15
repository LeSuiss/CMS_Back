'use strict'

module.exports = (sequelize, DataTypes)=>{
    
    const User = sequelize.define('User', {
        lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
        email: DataTypes.STRING,


    },{})

    // Users.associate =  function (models){
    //     Users.belongsToMany(
    //         models.Recettes,
    //         {through: "Recettes_Users" 
    //         }
    //     )
    // }


    return User

}


