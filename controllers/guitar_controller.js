var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:ver/:id/g', function (req, res) {
    var skill_table_name;
    var skillp_table_name;

    switch (req.params.ver) {
      case "tb":
        skill_table_name = "skill_tb";
        skillp_table_name = "skillp_tb";
        break;
      default:
        res.send("Unexpected version name");
    }

    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      var sql = 'select * from ' + skill_table_name + ' where id =' + req.params.id + ';';
      client.query(sql, function (err, result) {
        done();

        if (err) {
          console.error(sql);
          console.error(err);
          res.send(sql + "<br>" + err);
        } else {
          if (!result.rows[0]) {
            res.render("guitar");
          } else {
            var result_skill = result.rows[0];
            sql = 'select * from ' + skillp_table_name + ' where skill_id =' + req.params.id + ' and type = $$guitar$$;';
            client.query(sql, function (err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
                res.send(sql + "<br>" + err);
              } else {
                var skill_data = JSON.parse(result_skill.guitar_skill);
                var skill_point = (parseFloat(skill_data.hot.point) + parseFloat(skill_data.other.point)).toFixed(2);
                res.render("guitar" , {
                  player_name : result_skill.player_name.replace(/^"(.*)"$/, '$1'),
                  id : req.params.id,
                  skill_data : skill_data,
                  skill_point : skill_point,
                  update_date : result_skill.update_date,
                  skillp_data : result.rows
                });
              }
            });
          }
        }
      });
    });
  });
}
