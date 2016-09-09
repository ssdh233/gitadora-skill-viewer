var http = require('http');
var pg = require('pg');

module.exports.controller = function (app) {
  app.post('/upload', function (req, res) {
    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      //TODO check whether user id has already existed or not
      var guitar_data_str = JSON.stringify(req.body.guitar);
      var drum_data_str = JSON.stringify(req.body.drum);
      var sql = 'insert into skill values (1, $$' + guitar_data_str +  '$$,' + '$$' + drum_data_str + '$$);';
      client.query(sql, function(err, result) {
        done();

        if (err) {
          console.error(err);
          res.send("Error" + err);
        } else {
          res.send("Successfully uploaded.");
        }
      });
    });
  });
}
