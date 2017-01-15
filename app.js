var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var i18n = require("i18n");
var cookieParser = require('cookie-parser');

i18n.configure({
  locales: ['jp', 'cn'],
  defaultLocale: 'jp',
  cookie: 'language',
  directory: __dirname + '/locales',
  objectNotation: true
});

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser());
app.use(cookieParser());
app.use(i18n.init);

app.get('/test', function (req, res) {
  res.render('test');
});

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

app.listen(process.env.PORT, function (){
  console.log('This app listening on port 3000!');
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException => ' + err);
});