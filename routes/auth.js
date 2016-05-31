var express 				= require('express');
var router 					= express.Router();
var passport 				= require('passport');
var passportlocal 	= require('passport-local');


function verifyCredentials (username, password, done){
	if (password == 'lol'){
		done (null, {user : username});
	} else if (password == 'lol') {
		done (null, {user : username});
	} else {
		done(null, null);
	}
};

passport.use(new passportlocal.Strategy(verifyCredentials));


passport.serializeUser(function (user, done){
	console.log(user);
	done(null, user);
});

passport.deserializeUser(function (user, done){
	done (null, user);
});

router.get('/login', function (req, res){
	res.render('login');
});

router.get('/logout', function (req, res){
	req.logout();
	res.redirect('/');
});

router.post('/login', passport.authenticate('local'),function (req, res){
	res.redirect('/');
});

module.exports = router;

