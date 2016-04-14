var StdUser = require('../../model/stduser');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());

exports.home=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    console.log(response);
    if(response){
      res.render('Home');
    }
    else{
      res.render('Authentication');
    }
  });

};
