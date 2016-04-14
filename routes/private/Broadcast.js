// var StdUser = require('../../model/stduser');
// var Broadcast = require('../../model/broadcast');
// var PComment = require('../../model/pComment');
// var Upload = require('../../model/upload');
// var Cookies = require( "cookies" );
// var express = require('express');
// var cookieParser = require('cookie-parser');
// var app = express();
// var methodOverride = require('method-override');
// app.use(cookieParser());
//
// exports.home=function(req,res){
//   var Bdata = [];
//   var Cdata = [];
//
//   StdUser.findOne({token:req.cookies.token}, function (err, response) {
//     // console.log(response);
//     if(response){
//       // console.log("response::" +response);
//       Upload.find({std_id:response.std_id},function(err, respo){
//
//         PComment.find({std_id:response.std_id},function(err, ress){
//           if(ress){
//             Cdata = ress;
//             res.render('Home',{cdata:Cdata, std:response.std_id});
//           }
//
//         // for(e=0; e < (respo.length); e++){
//         //   console.log("i----------------------------->"+ e);
//         //   Broadcast.find({course:respo[e].course},function(err, respon){
//         //     if(respon){
//         //       Bdata.push(respon);
//         //     if(respo.length == e){
//         //       console.log("LOLLLLLLLLLLL:" +respo.length +"i::::"+e);
//         //       console.log("Cdata::"+ Cdata);
//         //       console.log("Bdata::"+ Bdata);
//         //       res.render('Home',{cdata:Cdata, bdata:Bdata});
//         //     }
//         //     }
//         //   });
//         // }
//         });
//       });
//     }
//     else{
//       res.render('Authentication');
//     }
//   });
//
// };


exports.broadcast=function(req,res){
  res.render('Broadcast');
};
