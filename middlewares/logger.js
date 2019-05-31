
var moment = require('moment');

exports.putLog = function(req){
    if(req.session.userId){
        console.log(new moment().format('YY-MM-DD HH:mm:ss:SS').toString()+'\tUser: ' +req.session.userInfo.userId+'\tURL: '+req.originalUrl);
    }else{
        console.log(new moment().format('YY-MM-DD HH:mm:ss:SS').toString()+'\tURL:'+req.originalUrl);
    }
}
exports.putLogDetail = function(req,detail){
    console.log(new moment().format('YY-MM-DD HH:mm:ss:SS').toString()+'\tUser: ' +req.session.userInfo.userId+'\tURL: '+req.originalUrl+'\tDetail: '+detail);
}

exports.logIn = function(req,success){
    if(success){
        var result = 'Login Success'
    }else{
        var result = 'Login Failed'
    }
    console.log(new moment().format('YY-MM-DD HH:mm:ss:SS').toString()+'\tUser: ' +req.body.loginId+'\t'+result);
}


