var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  title:{
    type:String,
    required:true
  },
  text:{
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
