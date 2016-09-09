var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/guitar', function (req, res) {
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
            res.render("guitar");
          } else {
            res.render("guitar" , {
              user_id : result.rows[0].id,
              skill_data : JSON.parse(result.rows[0].guitar_skill)
            });
          }
        }
      });
    });
  });
}
