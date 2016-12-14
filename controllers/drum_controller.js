var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:ver/:id/d', function (req, res) {
    var skill_table_name;
    var skillp_table_name;
    var version_name;

    switch (req.params.ver) {
      case "tb":
        skill_table_name = "skill_tb";
        skillp_table_name = "skillp_tb";
        version_name = "GITADORA Tri-Boost";
        break;
      case "tbre":
        skill_table_name = "skill_tbre";
        skillp_table_name = "skillp_tbre";
        version_name = "GITADORA Tri-Boost Re:EVOLVE";
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
            res.render("drum");
          } else {
            var result_skill = result.rows[0];
            sql = 'select * from ' + skillp_table_name + ' where skill_id =' + req.params.id + ' and type = $$drum$$;';
            client.query(sql, function (err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
                res.send(sql + "<br>" + err);
              } else {
                var skill_data = JSON.parse(result_skill.drum_skill);
                var skill_point = (parseFloat(skill_data.hot.point) + parseFloat(skill_data.other.point)).toFixed(2);
                res.render("drum" , {
                  version: req.params.ver,
                  version_full: version_name,
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
