var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  id:{
    type:Number,
    required:true
  },
  course_list:[{ course: String, course_name:String ,credit:Number}]
});

module.exports=mongoose.model('tCourse',postSchema);
