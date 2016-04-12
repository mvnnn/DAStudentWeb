var StdUser = require('../../model/stduser');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
// var db = mongoose.connection;
exports.myProfile=function(req,res){

  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.render('MyProfile',{data:response});
    }
    else{
      res.render('Authentication');
    }
  });
};
