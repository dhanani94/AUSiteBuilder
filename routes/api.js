var express 		= require('express');
var router 			= express.Router();
var db 					= require('../data/data');
var fs 					= require('fs');
var multer 			= require('multer');




var upload = multer({
  dest: 'public/images/',
});


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
			res.send("");
	  } else {
			fs.readFile(pathURL, (err, data) => {
			  if (err) res.send(err);
			  res.send(data);
			});
	  }
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

// router.post('/uploadImg', upload.single('avatar'), function (req, res){
// 	res.send(200);
// });



/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('image');

router.post('/uploadImg', type, function (req,res) {
	// console.log();


  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var oldPath = req.file.path;
  var newPath = 'public/images/' + req.body.ogname + ".jpg";
  console.log(oldPath);

  fs.rename(oldPath, newPath, function(){res.redirect('/');});

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  // var target_path = 'public/images/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  // var src = fs.createReadStream(tmp_path);
  // var dest = fs.createWriteStream(target_path);
  // src.pipe(dest);
  // src.on('end', function() { res.render('complete'); });
  // src.on('error', function(err) { res.render('error'); });

});


module.exports = router;

