var express=require('express'),
	path=require('path'),
	passport=require('passport'),
	mongoose=require('mongoose'),
	cookieSession=require('cookie-session'),
	session=require('express-session'),
	PORT=3000||env.port,
	authRoutes=require('./routes/authroutes.js'),
	profileRoutes=require('./routes/profile.js'),
	hbs=require('hbs'),
	bodyParser=require('body-parser'),
	morgan=require('morgan'),
	app=express();

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//set up view engine
app.set('view engine','hbs');
//cookie
app.use(cookieSession({
	valid:240000,
	keys:["dasdas"]
}))
//passport
app.use(passport.initialize());
app.use(passport.session());


//setup mongoose
mongoose.connect("mongodb://localhost/drive");

//path
app.use(express.static(path.join(__dirname, 'public')));
//authRoutes
app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
//homeRoutes
app.get("/",(req,res)=>{
	res.render("home");
});

//server running
app.listen(PORT,(err)=>{
	if(err)
		console.log("ERROR");
	else
		console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
})