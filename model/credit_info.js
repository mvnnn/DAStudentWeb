var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  credit:{
    type:Number,
    required:true
  },
  course:{
    type:String,
    required:true
  },
  course_name:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('credit_info',postSchema);
