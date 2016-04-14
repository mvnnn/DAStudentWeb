var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  AA:[{ min: Number, max:Number }],
  AB:[{ min: Number, max:Number }],
  BB:[{ min: Number, max:Number }],
  BC:[{ min: Number, max:Number }],
  CC:[{ min: Number, max:Number }],
  CD:[{ min: Number, max:Number }],
  DD:[{ min: Number, max:Number }],
  DE:[{ min: Number, max:Number }],
  F:[{ min: Number, max:Number }],
  id:{
    type:Number,
    required:true
  },
  course:{
    type:String
  }
});

module.exports=mongoose.model('grade',postSchema);
