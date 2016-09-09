var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/drum', function (req, res) {
    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      var sql = 'select * from skill where id = 1';
      client.query(sql, function (err, result) {
        done();

        if (err) {
          console.err(err);
          res.send("Error" + err);
        } else {
          if (!result.rows[0]) {
            res.render("drum");
          } else {
            res.render("drum" , {
              user_id : result.rows[0].id,
              skill_data : JSON.parse(result.rows[0].drum_skill)
            });
          }
        }
      });
    });
  });
}
