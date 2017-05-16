const common = require('../commons/md5');
//调用实体类
var User = require('../models/user');
//时间工具包
var moment = require('moment');
//返回code工具
var CODE = require('../commons/Constans').CODE;
//异步处理
var thunkify = require('thunkify');
var co = require('co');

//返回值
var result = {
    'code': '',
    'action': '',
    'success': '',
    'message': '',
    'data': ''
};

/*查询用户是否存在*/
function queryUserFn(condition, callback) {
    User.find({
        where: condition
    }).then(function(user) {
        callback(null, user);
    })
}
var queryUser = thunkify(queryUserFn);


/*注册加密*/
function registerUserFn(password, mobile, callback) {
   var mds = common.md5(password+common.MD5_SUFFIX);
   console.log(mds);
        // 加密处理失败
      if (mds=="" || mds==undefined) {
          callback(null, null);
      }
      // 生成用户数据
      else {
          User.create({
              mobile: mobile,
              password: mds
          }).then(function(user) {
              callback(null, user);
          })
      }
};
var registerUser = thunkify(registerUserFn);

//注册
exports.register = function(req, res) {
    result.action = 'register';
    var password = req.body.password;
    var mobile = req.body.mobile;
    co(function*() {
        try {
            // 根据手机号查找用户
            var condition = {
                mobile: mobile
            };
            var user = yield queryUser(condition);
            if (user) { // 用户存在
                result.code = CODE.USER_FOUND;
                console.log('用户存在');
            } else { // 用户不存在，可以注册
                // 注册用户
                var users = yield registerUser(password, mobile)
                if (users) {
                    result.code = CODE.SUCCESS;
                    result.data = users;
                    console.log("注册成功");
                }
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.jsonp(result);
            result.data = null;
        } catch (err) {
            console.error(err);
            result.code = CODE.INTERNAL_ERROR;
        }
    });
}
//登陆
exports.login = function(req, res) {
    result.action = 'login';
    co(function*() {
        try {
            var condition = {
                mobile: req.body.mobile
            };
            var user = yield queryUser(condition);
            if (user) {
                var mds = common.md5(req.body.password+common.MD5_SUFFIX);
                //相等表示登陆成功
                if (mds == user.password) {
                    result.code = CODE.SUCCESS;
                    result.data = user;
                } else {
                    result.code = CODE.PASSWORD_NOT_INVALID;
                }
            } else {
                result.code = CODE.USER_NOT_FOUND;
            }
            // 返回应答
            res.header("Access-Control-Allow-Origin", "*");
            res.jsonp(result);
        } catch (err) {
            console.error(err);
            result.code = CODE.INTERNAL_ERROR
        }
    })
}
//根据手机号修改密码
function updateMobileFn(mobile, password, callback) {
  console.log("mobile:"+mobile +"password:"+password);
    User.update({
        password: password
    }, {
        where: {
            mobile: mobile
        }
    }).then(function(mobiles) {
        callback(null, mobiles);
    });
};
var updateMobile = thunkify(updateMobileFn);

//修改密码
exports.xg = function(req,res){
    result.action = 'xg';
    var mobile = req.body.mobile;
    var password = common.md5(req.body.password+common.MD5_SUFFIX);
    co(function*(){
        try {
          var condition = {
              mobile: mobile
          };
          var user = yield queryUser(condition);
          if (user) {
              var mobiles = yield updateMobile(mobile,password);
              if (mobiles) {
                result.code = CODE.SUCCESS;
                result.data = mobiles;
              }else {
                  result.code = CODE.ERR;
              }
          } else {
              result.code = CODE.USER_NOT_FOUND;
          }
          res.header("Access-Control-Allow-Origin", "*");
          res.jsonp(result);
        } catch (e) {
          console.error(err);
          result.code = CODE.INTERNAL_ERROR
        }
    })
}
//删除方法
/*根据ID删除商品*/
function deleteProductPriceFn(condition, callback) {
    ProductPrice.destroy({
        where: condition,
    }).then(function(productPrice) {
        callback(null, productPrice);
    })
};
var deleteProductPrice = thunkify(deleteProductPriceFn);

//删除文件
exports.deleteFile = function(req,res){
    fs.unlink('./public/images/' + req.body.fileName, function (err) {
        if (err) throw err;
        console.log('successfully deleted');
        result = {
                    'code': 200,
                    'success': true,
                    'action': 'deleteFile',
                    'message': "删除文件成功"
                  };
        res.json(result);
    });
}
//删除方法
exports.deleteBusinessHour = function(req,res){
	BusinessHour
	.destroy({where:{shop_id:req.body.shopId} })
	.then(function(){id='"+result.data[i].id+"'
		result.code = 200;
		result.action = 'deleteBusinessHour';
    	result.success = true;
    	result.message = "成功删除商家营业时间";
		res.json(result);
	})
}
