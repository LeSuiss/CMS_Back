var DataTypes = require("sequelize").DataTypes;
var _Grants = require("./Grants");
var _Users = require("./Users");

function initModels(sequelize) {
  var Grants = _Grants(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Users.belongsTo(Grants, { as: "fk_grant_Grant", foreignKey: "fk_grant"});
  Grants.hasMany(Users, { as: "Users", foreignKey: "fk_grant"});

  return {
    Grants,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
