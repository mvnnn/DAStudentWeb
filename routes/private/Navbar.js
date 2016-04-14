var StdUser = require('../../model/stduser');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());



exports.changePass=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.render('ChangePass');
    }
    else{
      res.redirect('Authentication');
    }
    });
};

exports.PostchangePass=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      StdUser.update({std_id:response.std_id},
        {std_id:response.std_id,
        std_name:response.std_name,
        DOB:response.dob,
        password:req.body.confirmPassword,
        token:response.token},
        { upsert: true },
        function(err, response){
          if(err) throw err;
          else res.redirect('Home');
        });
    }
    else{
      res.redirect('Authentication');
    }
    });
};

exports.help=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.render('Help');
    }
    else{
      res.redirect('Authentication');
    }
  });
};

exports.logout=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.clearCookie('token');
      res.redirect('Authentication');
    }
    else{
      res.redirect('Authentication');
    }
  });
};
