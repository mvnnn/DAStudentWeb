var StdUser = require('../../model/stduser');
var Queries = require('../../model/queries');
var Upload = require('../../model/upload');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
// var db = mongoose.connection;
exports.queries=function(req,res){

  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      // Upload.find({std_id:response.std_id},function(err, respo){
          // if(respo){
            Queries.find({std_id:response.std_id},function(err, resp){
              if(resp){
                resp = resp;
              }
              else{
                resp=null;
              }
              res.render('Queries',{data:resp});
            });
          // }
        // });
    }
    else{
      res.render('Authentication');
    }
  });
};


exports.postqueries=function(req,res){

  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Queries.update({text:req.body.text},
        {std_id:response.std_id,
        course:req.body.ccode,
        text:req.body.text},
        { upsert: true },
        function(err, respo){
          if(err) throw err;
          else res.redirect('Queries');
        });
    }
    else{
      res.render('Authentication');
    }
  });
};
