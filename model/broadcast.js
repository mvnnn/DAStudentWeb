var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  text:{
    type:String,
    required:true
  },
  comment:{
    type:String,
    required:true
  },
  id:{
    type:Number,
    required:true
  },
  course:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('broadcast',postSchema);
