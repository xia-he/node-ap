var Sequelize = require("sequelize");
var sequelize = new Sequelize('testhx', 'root', '123', {//数据库名，账号，密码
      host: "localhost",//服务器名字
      port: 3306
  });

module.exports = sequelize;
