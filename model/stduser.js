// mongodb schema to store the signed in users in the system


var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  std_id:{
    type:Number,
    required:true
  },
  std_name:{
    type:String,
    required:true
  },
  DOB:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  token:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('stduser',postSchema);
