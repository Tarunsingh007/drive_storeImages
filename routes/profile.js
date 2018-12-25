const router=require('express').Router(),
	  mongoose=require('mongoose'),
	  userData=require('../models/userdata'),
	  multer  = require('multer'),
	  fs=require('fs'),
	  download=require('download');
//AUTH
var check=(req,res,next)=>{
	if(!req.user)
	{
		res.render('home',{warn:"Login Please"});
	}
	else
	{
		next();
	}
}

//Multer setup
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})

//file check
var fileFilter=(req,file,cb)=>{
	if((file.originalname).substring((file.originalname).length-4,(file.originalname).length)!=='.jpg')
	{return cb(new Error('Only images are allowed'));}
	else
	cb(null,true);
}
//file size check
var upload = multer({
	storage:storage,
	limits:{fileSize:1024*1024*100},
	fileFilter:fileFilter
});

router.get('/',check,(req,res)=>{
	res.render("profile",{user:req.user});
});
router.post('/upload',check,upload.single('avatar'),(req,res,err)=>{
	new userData({
		image:(req.file.path).substring(6,(req.file.path).length),
		author_id:req.user._id
	}).save().then((userdata)=>{
		if(!userdata)
			console.log("error upload");
		else
		{
			res.redirect('/profile');
		}
	});
	console.log(req.file);
});

router.get("/view/upload",check,(req,res)=>{
	userData.find({author_id:req.user._id}).then((userdata)=>{
		if(!userdata)
			res.send("no uploads yet");
		else
			res.render("uploads.hbs",{user:userdata});
	});
});

//separate view of image
router.get("/view/image/:id",check,(req,res)=>{
	userData.findById(req.params.id).then((image)=>{
		if(!image)
			res.redirect("/profile/view/upload");
		else
			res.render("imageview",{image:image});
	})
});
//download
router.get("/image/download/:id",check,(req,res)=>{
	userData.findById(req.params.id).then((image)=>{
		if(!image)
			res.redirect("/profile/view/upload");
		else
			{
				download(`${image.image}`, '/downloads').then(() => {
			    console.log('done!');
				});
			
			}
	});
});


module.exports=router;




