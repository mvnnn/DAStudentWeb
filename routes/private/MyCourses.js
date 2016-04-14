var StdUser = require('../../model/stduser');
var Upload = require('../../model/upload');
var TA_info = require('../../model/ta_info');
var TCourse = require('../../model/tCourse');
var Criteria = require('../../model/criteria');
var Queries = require('../../model/queries');
var link = require('../../model/link');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
var url = require('url') ;



exports.myCourses=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({std_id:response.std_id}, function (err, respo) {
        if(respo){
          respo = respo;
        }
        else{
          respo = null;
        }
        res.render('MyCourses',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};



exports.aboutCourse=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      var respo = url.parse(req.url).pathname.split("/")[2];
      res.render('AboutCourse',{data:respo});
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.taDetails=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      TA_info.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        if(respo){
          respo = respo;
        }
        else{
          respo = null;
        }
        res.render('TADetails',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.score=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    var mdata = "";
    var cdata = "";
    if(response){
      Upload.find({std_id:response.std_id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        if(respo){
          mdata = respo;
          // console.log(mdata);
        }
        else{
          mdata = null;
        }
          Criteria.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, resp) {
            if(resp){
              cdata = resp;
              // console.log(cdata);
            }
            else{
              cdata = null;
            }
            res.render('Score',{mdata:mdata, cdata:cdata});
          });


      });

    }
    else{
      res.render('Authentication');
    }
  });
};

exports.courseQueries=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Queries.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        if(respo){
          respo = respo;
        }
        else{
          respo = null;
        }
        res.render('CourseQueries',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.courseLink=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      link.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        if(respo){
          respo = respo;
        }
        else{
          respo = null;
        }
        res.render('CourseLink',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.courseHome=function(req,res){
  res.render('CourseHome');
};
