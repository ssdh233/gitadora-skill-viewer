var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:ver/:id/:type/', function (req, res) {
    var skill_table_name;
    var skillp_table_name;
    var version_name;
    var type_name;

    switch (req.params.type) {
      case "d":
        type_name = "drum";
        break;
      case "g":
        type_name = "guitar";
        break;
      default:
        res.send("Unexpected type name");
    }

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
            //tmp
            res.render("skill");
          } else {
            var result_skill = result.rows[0];
            sql = 'select * from ' + skillp_table_name + ' where skill_id =' + req.params.id + ' and type = $$' + type_name + '$$;';
            client.query(sql, function (err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
                res.send(sql + "<br>" + err);
              } else {
                var skill_data;
                if (type_name == "drum"){
                  skill_data = JSON.parse(result_skill.drum_skill);
                } else {
                  skill_data = JSON.parse(result_skill.guitar_skill);
                }

                var skill_point = (parseFloat(skill_data.hot.point) + parseFloat(skill_data.other.point)).toFixed(2);
                res.render("skill" , {
                  version : req.params.ver,
                  version_full : version_name,
                  player_name : result_skill.player_name.replace(/^"(.*)"$/, '$1'),
                  id : req.params.id,
                  skill_data : skill_data,
                  skill_point : skill_point,
                  update_date : result_skill.update_date,
                  skillp_data : result.rows,
                  type : (type_name == "drum") ? 0 : 1 //1:guitar 0:drum
                });
              }
            });
          }
        }
      });
    });
  });
}
