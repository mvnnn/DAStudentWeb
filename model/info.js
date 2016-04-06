var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  coursename:{
    type:String,
    required:true
  },
  courseid:{
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
  postedBy: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'user'
  }
});

module.exports = mongoose.model("info", PostSchema);
