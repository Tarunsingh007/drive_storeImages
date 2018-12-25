var passport=require('passport');
var googleStrategy=require('passport-google-oauth').OAuth2Strategy;
var mongoose =require('mongoose');
var secrets=require('../avoid/secret.js');
var User=require('../models/users.js');

passport.serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(new googleStrategy({
	clientID:secrets.secret.ID,
	clientSecret:secrets.secret.Secret,
	callbackURL:"/auth/google/redirect"
},(token,tokenSecret,profile,done)=>{
	User.findOne({email:profile.id}).then((currentuser)=>{
		if(currentuser)
			{console.log("user exists");done(null,currentuser);}
		else
		{
			new User({
				username:profile.displayName,
				email:profile.id
			}).save().then((newuser)=>{
					console.log("ASd");
					done(null,newuser);
			});
		}
	})
})
);