var express 		= require('express');
var router 			= express.Router();
var db 					= require('../data/data');
var fs 					= require('fs');

router.get('/names', function (req, res){
	console.log(req.user.user);
	if(req.user.user == "one") {
		res.send(db.group1);
	} else	if(req.user.user == "two") {
		res.send(db.group2);
	} else	if(req.user.user == "three") {
		res.send(db.group3);
	} else	if(req.user.user == "four") {
		res.send(db.group4);
	}
	
});


router.get('/file/:ref', function (req, res) {
	var pathURL = 'public/sites/' + req.params.ref;
	fs.access(pathURL, fs.R_OK, (err) => {
	  if (err) {
			pathURL = 'public/sites/template.html';
	  }
		fs.readFile(pathURL, (err, data) => {
		  if (err) res.send(err);
		  // console.log(data);
		  res.send(data);
		});
	});
});

router.post('/file/:ref', function (req, res) {
	var pathURL = 'public/sites/' + req.params.ref;	
	fs.writeFile(pathURL, req.body.data, (err) => {
	  if (err) throw err;
	  console.log('It\'s saved!');
		res.send(200);
	});
})


module.exports = router;

