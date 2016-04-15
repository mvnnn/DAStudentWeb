var StdUser = require('../../model/stduser');
var Info = require('../../model/info');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
// var db = mongoose.connection;
exports.results=function(req,res){

  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    var data = [];
    if(response){
      var year = response.std_id.toString();
      var pp = year.charAt(3);
      if(pp == 3){
        nn = 5;
        var sem0 = [];
        var sem1 = [];
        var sem2 = [];
        var sem3 = [];
        var sem4 = [];
      }
      if(pp == 4){
        nn = 3;
        var sem0 = [];
        var sem1 = [];
        var sem2 = [];
      }
      if(pp == 5){
        var sem0 = [];
        nn = 1;
      }
      // console.log(nn);
      Info.find({std_id:response.std_id}, function(err, respo){
        for(var j=0;j<nn;j++){
          for(var i=0;i<respo.length;i++){
            if(respo[i].sem == (j+1)){
              if(j == 0){
                sem0.push(respo[i]);
              }
              if(j == 1){
                sem1.push(respo[i]);
              }
              if(j == 2){
                sem2.push(respo[i]);
              }
              if(j == 3){
                sem3.push(respo[i]);
              }
              if(j == 4){
                sem4.push(respo[i]);
              }
            }
        }
      }

      for(var j=0;j<nn;j++){
        for(var i=0;i<respo.length;i++){
          if(respo[i].sem == (j+1)){
            if(j == 0){
              sem0.push(respo[i]);
            }
            if(j == 1){
              sem1.push(respo[i]);
            }
            if(j == 2){
              sem2.push(respo[i]);
            }
          }
      }
    }

    for(var j=0;j<nn;j++){
      for(var i=0;i<respo.length;i++){
        if(respo[i].sem == (j+1)){
          if(j == 0){
            sem0.push(respo[i]);
          }
        }
    }
    }

      if(nn == 5){
        data.push(sem0);
        data.push(sem1);
        data.push(sem2);
        data.push(sem3);
        data.push(sem4);
      }
      if(nn == 3){
        data.push(sem0);
        data.push(sem1);
        data.push(sem2);
      }
      if(nn == 1){
        data.push(sem0);
      }
      console.log(data);
      res.render('Results',{data:data});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};
