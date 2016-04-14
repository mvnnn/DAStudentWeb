var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  course:{
    type:String,
    required:true
  },
  std_id:{
    type:Number,
    required:true
  },
  post:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("pComment", PostSchema);
