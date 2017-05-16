var Sequelize = require("sequelize");
var sequelize = require("../configs/DAO");

module.exports = sequelize.define("admin_table",{
  mobile:Sequelize.STRING,
  password:Sequelize.STRING
},{
  timestamps:false,
   tableName: 'admin_table'
})
