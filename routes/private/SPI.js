var StdUser = require('../../model/stduser');
var Info = require('../../model/info');
var TCourse = require('../../model/tCourse');
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
      Info.find({std_id:response.std_id},functon(err, respo){
        TCourse.find({});
      });
      res.render('SPI');
    }
    else{
      res.render('Authentication');
    }
  });
};
