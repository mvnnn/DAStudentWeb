var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  id:{
    type:Number,
    required:true,
    min:201301001,
    max:201301200
  },
  name:{
    type:String,
    required:true
  },
  DOB:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('user',postSchema);
