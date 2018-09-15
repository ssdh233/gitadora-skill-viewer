var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:ver/:id/p', function (req, res) {
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
      case "matixx":
        skill_table_name = "skill_matixx";
        skillp_table_name = "skillp_matixx";
        version_name = "GITADORA Matixx";
        break;
      case "exchain":
        skill_table_name = "skill_exchain";
        skillp_table_name = "skillp_exchain";
        version_name = "GITADORA EXCHAIN";
        break;
      default:
        res.send("Unexpected version name");
    }

    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      var sql = 'select * from ' + skillp_table_name + ' where id =' + req.params.id + ';';
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
              version: version_name,
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
