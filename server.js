const express = require('express');
var app = require('express')();
//POST 传输
const bodyParser = require('body-parser');
//模板配置
const consolidate = require('consolidate');
//ejs模板
const ejs = require('ejs');
//日志
const logger = require('morgan');
//引入方法
var users = require("./routes/users");

//----------------------------------以下插件暂时没用到---------------------------------------------------------------
//文件操作
const multer = require('multer');
const multerObj = multer({dest:'./static/upload'});
//cookie And  session
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
//路由暂时没有用到
const expressRoute = require('express-route');
//get表示取 post表示给  use表示双向  上传的东西(头像文件之类的)
app.use(multerObj.any());
//cookie
app.use(cookieParser());
//session服务器编译
(function(){
  var keys = [];
  for (var i = 0; i < 100000; i++) {
    keys[i]='a_'+ Math.random();
  }
  app.use(cookieSession({
    name:'sess_id',
    keys:keys,
    maxAge:20*60*1000 //20分钟
  }));
})();
//----------------------------------------------以上暂时没用到--------------------------------------------------------

//POST(提交数据必须引用)
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//日志打印在控制台CMD中
app.use(logger('dev'));

//指定模板引擎
app.engine('html',consolidate.ejs);

//这里设置为ejs 路由文件就可不带.ejs
app.set('view engine','ejs');

//文件存放位置,静态的文件
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));


//首页
app.use ('/login',function(req,res){
    res.render('login');
});
//注册
app.use ('/zhuce',function(req,res){
    res.render('registered');
});
app.use("/xiugaimima",function(req,res){
    res.render('changePass');
});
//方法
// register
app.post('/user/register', users.register); // 用户注册
app.post('/user/login', users.login); // 用户登陆
app.post('/user/xg',users.xg);//修改密码

//启动端口
var http = require('http').Server(app);
http.listen(8888, function(){
  console.log('listening on *:8888');
});
