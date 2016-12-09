var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:id/g', function (req, res) {
    res.redirect('/tb/'+req.params.id+"/g");
  });
}
