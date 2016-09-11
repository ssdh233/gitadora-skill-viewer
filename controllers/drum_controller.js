var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:id/drum', function (req, res) {
    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      var sql = 'select * from skill where id =' + req.params.id + ';';
      client.query(sql, function (err, result) {
        done();

        if (err) {
          console.err(err);
          res.send("Error" + err);
        } else {
          if (!result.rows[0]) {
            res.render("drum");
          } else {
            var skill_data = JSON.parse(result.rows[0].drum_skill);
            var skill_point = parseFloat(skill_data.hot.point) + parseFloat(skill_data.other.point);
            res.render("drum" , {
              player_name : result.rows[0].player_name.replace(/^"(.*)"$/, '$1'),
              skill_data : skill_data,
              skill_point : skill_point,
              skill_lv : parseInt(skill_point/500)
            });
          }
        }
      });
    });
  });
}
