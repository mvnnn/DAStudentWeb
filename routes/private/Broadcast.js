var StdUser = require('../../model/stduser');
var Broadcast = require('../../model/broadcast');
var Upload = require('../../model/upload');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());

exports.broadcast=function(req,res){
  var Bdata = [];
  var count = 0;
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      // console.log("response::" +response);
      Upload.find({std_id:response.std_id},function(err, respo){
        // console.log(respo);
        for(e=0; e < (respo.length); e++){
          Broadcast.find({course:respo[e].course},function(err, respon){
            count = count + 1 ;
            if(respon){
              // console.log(respon.length);
              for(t=0; t < (respon.length); t++){
              Bdata.push(respon[t]);
            }
              // console.log(Bdata);
            }
            // console.log("EEEEEEEEEEEEEEEEE:"+count);
            if(respo.length == count){
              console.log(Bdata);
              res.render('Broadcast',{data:Bdata});
            }
          });

        }

      });
    }
    else{
      res.render('Authentication');
    }
  });
};
