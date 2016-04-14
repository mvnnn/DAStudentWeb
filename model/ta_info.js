var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  ta_id: {type:Number},
  ta_name: {type:String},
  ta_room_no: {type:String},
  ta_phone_no: {type:Number},
  course: {type:String}
});

module.exports=mongoose.model('ta_info',postSchema);
