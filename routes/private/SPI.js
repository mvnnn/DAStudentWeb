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
exports.spi_cpi=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      var data = null;
      res.render('SPI',{data:data});
    }
    else{
      res.redirect('Authentication');
    }
  });
};


exports.Gen_spi_cpi=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      var grades = [10,10,10,10,10,10];
        var credit = [4.5,4,4.5,3,4,4];
        var prev_grades = [8,9,10,7,7,8,6,9,9,8,8,10];
        var prev_credit = [4,4.5,3,4,4,4,3,4.5,4,3,4,4.5];
        var tot_creditpoints = 0;
        var prev_creditpoints = 0;
        var tot_credits = 0;
        var prev_credits = 0;
        var spi = 0;
        var exp_cpi = req.body.desired_cpi;
        var spi_req = 0;
        var cpi = 0;

        for(var i=0;i<grades.length;i++){

          tot_creditpoints += grades[i]*credit[i];
          tot_credits += credit[i];
        }

        for(var i=0;i<prev_grades.length;i++){

          prev_creditpoints += prev_grades[i]*prev_credit[i];
          prev_credits += prev_credit[i];
        }

        spi = (tot_creditpoints/tot_credits);
        cpi = prev_creditpoints/prev_credits;
        var max = (prev_creditpoints + tot_creditpoints)/(tot_credits + prev_credits);
        spi_req = ((exp_cpi*(prev_credits + tot_credits)) - prev_creditpoints)/(tot_credits);
        // console.log("cpi is " + cpi);
        // console.log("max cpi achievable is " + max);
        // console.log('spi_req is ' + spi_req);

        if(spi_req > 10){
          var data = "NN";
          res.render('SPI',{data:data});
        }
        else{
          var data = "AA";
          res.render('SPI',{data:data, cpi:cpi, max:max,spi_req:spi_req});
        }

    }
    else{
      res.redirect('Authentication');
    }
  });
};
