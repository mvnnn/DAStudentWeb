// mongodb schema to store courses taken by the students

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({

std_id : {
        type:Number,
        required:true
},
course_info : [
        {course_name:{
                type:String,
                required:true
         },
          course:{
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
         },
         sem:{
                type:Number,
                required:true
         }}]
});

module.exports = mongoose.model("info", PostSchema);
