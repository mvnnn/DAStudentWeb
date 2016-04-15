var StdUser = require('../../model/stduser');
var Upload = require('../../model/upload');
var TA_info = require('../../model/ta_info');
var Credit_info = require('../../model/credit_info');
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
    var coun = 0;
    var Bdata = [];
    if(response){
      Upload.find({std_id:response.std_id}, function (err, respo) {
        // console.log(respo);
        if(respo){
            for(e=0; e < (respo.length); e++){
            Credit_info.find({course:respo[e].course}, function (err, respon) {
              coun = coun + 1 ;
              if(respon){
                for(t=0; t < (respon.length); t++){
                Bdata.push(respon[t]);
              }
                // console.log(Bdata);
              }
              if(respo.length == coun){
                console.log(Bdata);
                res.render('MyCourses',{data:Bdata});
              }
            });
          }
        }
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

// exports.score=function(req,res){
//   StdUser.findOne({token:req.cookies.token}, function (err, response) {
//     var mdata = "";
//     var cdata = "";
//     if(response){
//       Upload.find({std_id:response.std_id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
//         if(respo){
//           mdata = respo;
//           // console.log(mdata);
//         }
//         else{
//           mdata = null;
//         }
//           Criteria.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respon) {
//             if(respon){
//               cdata = respon;
//               // console.log(cdata);
//             }
//             else{
//               cdata = null;
//             }
//             res.render('Score',{mdata:mdata, cdata:cdata});
//           });
//
//
//       });
//
//     }
//     else{
//       res.render('Authentication');
//     }
//   });
// };


exports.score=function(req,res){
  StdUser.findOne({token:req.cookies.token}, function (err, response) {
    var mdata = [];
    var cdata = [];
    var max = '';
    var average = '';
    var grade = '';
    if(response){
      Upload.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        if(respo){
          for(var q=0;q<respo.length;q++){
            if(respo[q].std_id == response.std_id){
            mdata.push(respo[q]);
          }
          }

          // console.log(mdata);
        }
        else{
          mdata = null;
        }
          Criteria.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respon) {

            if(respon){
              for(t=0; t < (respon.length); t++){
              cdata.push(respon[t]);
              }
          			respon = respon;
          			//console.log(respon.insem1);
          			//console.log(respo[0].insem1);

          			//var students = [['201301001',15,25,35,45,35,5],['201301002',25,35,45,15,5,10],['201301003',35,25,45,45,15,0],['201301004',25,45,35,25,15,8],['201301005',15,25,35,35,25,10]];
          			var students = [];
					      var criteria = [];
					      var max_marks = [60,60,45,40,50,10];
					      var Aggregate = [];
					      var grades = [];
                var average = [0,0,0,0,0,0];
                var max = [0,0,0,0,0,0];

					      for (var i=0; i < respo.length; i++) {
    					  students[i] = [];
        				students[i][0] = respo[i].std_id;
        				students[i][1] = respo[i].insem1;
        				students[i][2] = respo[i].insem2;
        				students[i][3] = respo[i].endsem;
        				students[i][4] = respo[i].project;
        				students[i][5] = respo[i].lab;
        				students[i][6] = respo[i].attendance;
        				Aggregate[i] = 0;

                if(students[i][1] > max[0])
                  max[0] = students[i][1];
                if(students[i][2] > max[1])
                  max[1] = students[i][2];
                if(students[i][3] > max[2])
                  max[2] = students[i][3];
                if(students[i][4] > max[3])
                  max[3] = students[i][4];
                if(students[i][5] > max[4])
                  max[4] = students[i][5];
                if(students[i][6] > max[5])
                  max[5] = students[i][6];
					      }

					criteria[0] = respon.insem1;
					criteria[1] = respon.insem2;
					criteria[2] = respon.endsem;
					criteria[3] = respon.project;
					criteria[4] = respon.lab;
					criteria[5] = respon.attendance;

					for (var i=0; i < respo.length; i++){
    					for(var j = 1;j<7;j++){

        					Aggregate[i] += criteria[j-1]*(students[i][j])/max_marks[j-1];
    					}
    					//console.log(Aggregate[i]);
					}

					for(var j=0;j<students.length;j++){

        				average[0] += students[j][1];
                average[1] += students[j][2];
                average[2] += students[j][3];
                average[3] += students[j][4];
                average[4] += students[j][5];
                average[5] += students[j][6];
                if (Aggregate[j] < 20){
          					//console.log("Grade : FF");
          					grades[j] = 0;
          					//console.log(grades[i]);
        				}
       	 				else if (Aggregate[j] >= 20 && Aggregate[j] < 30){
          					//console.log("Grade : DE");
          					grades[i] = 3;
          					//console.log(grades[i]);
       	 				}
        				else if (Aggregate[j] >= 30 && Aggregate[j] < 40){
          					//console.log("Grade : DD");
          					grades[i] = 4;
          					//console.log(grades[i]);
          			}
     					  else if (Aggregate[j] >= 40 && Aggregate[j] < 50){
                			//console.log("Grade : CD");
                			grades[i] = 5;
                			//console.log(grades[i]);
     					  }
        				else if (Aggregate[j] >= 50 && Aggregate[j] < 60){
                			//console.log("Grade : CC");
                			grades[i] = 6;
                			//console.log(grades[i]);
        				}
        				else if (Aggregate[j] >= 60 && Aggregate[j] < 70){
                			//console.log("Grade : BC");
                			grades[i] = 7;
                			//console.log(grades[i]);
        				}
        				else if (Aggregate[j] >= 70 && Aggregate[j] < 80){
                			//console.log("Grade : BB");
                			grades[i] = 8;
                			//console.log(grades[i]);
        				}
        				else if (Aggregate[j] >= 80 && Aggregate[j] < 90){
                			//console.log("Grade : AB");
                			grades[i] = 9;
                			//console.log(grades[i]);
        				}
        				else if (students[j] >= 90 && students[j] < 100){
                			//console.log("Grade : AA");
                			grades[i] = 10;
                			//console.log(grades[i]);
        				}
					   }
             average[0] = (average[0]/respo.length);
             average[1] = (average[1]/respo.length);
             average[2] = (average[2]/respo.length);
             average[3] = (average[3]/respo.length);
             average[4] = (average[4]/respo.length);
             average[5] = (average[5]/respo.length);
            res.render('Score',{mdata:mdata, cdata:cdata, avg:average, max:max});
          }

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
