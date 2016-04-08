var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({

_id : {
        type:Number,
        required:true
        
},
semester:{
      type:Number,
      required:true
      course : [{coursename:{
                      type:String,
                      required:true
                },
                courseid:{
                      type:String,
                      required:true
                },
                credit:{
                      type:Number,
                      required:true
                },
                grade:{
                      type:String,
                      required:true
                }}]
    }
});

module.exports = mongoose.model("info", PostSchema);
