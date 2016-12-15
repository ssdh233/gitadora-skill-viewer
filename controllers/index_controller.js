var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/', function (req, res) {
    res.render("index_jp");
  });
  app.get('/jp', function (req, res) {
    res.render("index_jp");
  });
  app.get('/cn', function (req, res) {
    res.render("index_cn");
  });
}
