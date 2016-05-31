var express = require('express');
var router = express.Router();


function ensureAthenticated (req, res, next){
	if (req.isAuthenticated()){
		next();
	} else {
		res.redirect('/')
	}
}

router.get('/', function (req, res){
	if (!req.isAuthenticated()) {
		res.redirect('/auth/login');
	} else {
		res.render('index', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	}
});

module.exports = router;
