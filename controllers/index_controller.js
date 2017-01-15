var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/', function (req, res) {
    res.render("index");
  });
  app.get('/jp', function (req, res) {
    res.cookie('language', 'jp');
    res.redirect('/');
  });
  app.get('/cn', function (req, res) {
    res.cookie('language', 'cn');
    res.redirect('/');
  });
}
