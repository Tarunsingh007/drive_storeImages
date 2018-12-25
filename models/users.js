var mongoose=require('mongoose');
var schema=mongoose.Schema;

var userSchema=new schema({
	username:String,
	email:String,
});
var User=mongoose.model('User',userSchema);
module.exports=User;