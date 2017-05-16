const crypto = require('crypto');
module.exports={
  MD5_SUFFIX:'%^hexia^%--+-..??//Xajnlmo>>ss,,<admin',
  md5: function (str){
    // console.log(str+'----------');
    //创建加密
    var obj = crypto.createHash('md5');
    //加密
    obj.update(str);
    //返回16进制
      // console.log(obj.digest('hex'));
    return obj.digest('hex');
  }
};

/*-----------------------------------------------------------------------------*/

// const crypto = require('crypto');
// var obj = crypto.createHash('md5');
// //要加密的内容
// obj.update('123456');
// //16进制
// var str=obj.digest('hex');
// console.log(str);
