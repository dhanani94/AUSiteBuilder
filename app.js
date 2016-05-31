var express 				= require('express');
var path 						= require('path');
var app 						= express();
var bodyParser 			= require('body-parser');
var cookieParser 		= require('cookie-parser');
var expressSession 	= require('express-session');
var passport 				= require('passport');

var pages						= require('./routes/pages');
var auth 						= require('./routes/auth');
var api 						= require('./routes/api');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
	secret  					: process.env.SESSION_SECRET || 'taufiq',
	resave 						: false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pages);
app.use('/auth', auth);
app.use('/api', api);

var port = process.env.PORT || 3000;

app.listen(port, function (){
	console.log('localhost:' + port);
});




