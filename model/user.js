var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  name:{
    type:String,
    required:true
  },
  job:{
    type:String,
    required:true
  },
  createAt:{
    type:Date,
    default:Date.now
  }
});

module.exports=mongoose.model('user',postSchema);
