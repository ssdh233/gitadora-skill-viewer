var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:id/p', function (req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      var sql = 'select * from skillp where id =' + req.params.id + ';';
      client.query(sql, function (err, result) {
        done();

        if (err) {
          console.error(sql);
          console.error(err);
          res.send(sql + "<br>" + err);
        } else {
          if (!result.rows[0]) {
            res.render("skillp");
          } else {
            var skill_data = JSON.parse(result.rows[0].skill_data);
            var skill_point = result.rows[0].skill;
            res.render("skillp" , {
              player_name : result.rows[0].player_name.replace(/^"(.*)"$/, '$1'),
              type : result.rows[0].type,  
              skill_data : skill_data,
              skill_point : skill_point,
              skill_lv : parseInt(skill_point/500),
              update_date : result.rows[0].update_date
            });
          }
        }
      });
    });
  });
}
