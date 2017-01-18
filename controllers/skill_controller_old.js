var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:id/:type', function (req, res) {
    res.redirect('/tb/'+req.params.id+"/"+req.params.type);
  });
}