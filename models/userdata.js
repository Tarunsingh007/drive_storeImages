var mongoose=require('mongoose');
var schema=mongoose.Schema;

var userDataSchema=new schema({
	image:String,
	author_id:String,
	created:{
		type:Date,
		default:Date.now
	}
});
var UserData=mongoose.model('UserData',userDataSchema);

module.exports=UserData;