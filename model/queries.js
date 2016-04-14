var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  std_id:{
    type:Number,
    required:true
  },
  course:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  comment:{
    type:String
  }
});

module.exports=mongoose.model('queries',postSchema);
