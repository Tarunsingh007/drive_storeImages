var router=require('express').Router();
var passport=require('passport');
var passportconfig=require('../config/passportconfig.js');

router.get('/google',passport.authenticate('google',{
	scope: ['profile']
})
);
router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect("/");
});

module.exports=router;




