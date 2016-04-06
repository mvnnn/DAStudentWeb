var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  postedBy: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'user'
  }
});

module.exports = mongoose.model("login", PostSchema);
