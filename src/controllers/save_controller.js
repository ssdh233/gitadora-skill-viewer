var http = require('http');
var pg = require('pg');

module.exports.controller = function (app) {
  app.post('/:ver/save', function (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      var skill_table_name;
      var skillp_table_name;

      switch (req.params.ver) {
        case "tb":
          skill_table_name = "skill_tb";
          skillp_table_name = "skillp_tb";
          break;
        case "tbre":
          skill_table_name = "skill_tbre";
          skillp_table_name = "skillp_tbre";
          break;
        case "matixx":
          skill_table_name = "skill_matixx";
          skillp_table_name = "skillp_matixx";
          break;
        case "exchain":
          skill_table_name = "skill_exchain";
          skillp_table_name = "skillp_exchain";
          break;
        default:
          res.send("Unexpected version name");
      }
      
      var skill_id = req.body.skill_id;
      var type = req.body.type;
      var skill = req.body.skill;

      var sql = 'select * from ' + skillp_table_name + ' where skill_id =' + skill_id + ' and type = $$' + type + '$$ and skill = $$' + skill + '$$;';
      client.query(sql, function(err, result) {
        done();
        
        if (err) {
          console.error(sql);
          console.error(err);
        } else {
          if (result.rows[0]) {
            res.redirect('/' + req.params.ver + '/' + result.rows[0].id + '/p');
          } else {
            var sql = 'select max(id) as maxid from ' + skillp_table_name;
            client.query(sql, function(err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
              } else {
                var id = (result.rows[0].maxid || 0) + 1;
                var sql = 'select * from ' + skill_table_name + ' where id =' + skill_id + ';';
                client.query(sql, function(err, result) {
                  done();

                  if (err) {
                    console.error(sql);
                    console.error(err);
                  } else {
                    if (result.rows[0]) {
                      var sql;
                      if (type == 'guitar') {
                        sql = 'insert into ' + skillp_table_name + ' values (' + id + ',' + skill_id + ',$$' + type + '$$,$$' + skill + '$$,$$' + result.rows[0].player_name + '$$,$$' + result.rows[0].guitar_skill + '$$,$$' + result.rows[0].update_date + '$$);';
                      } else {
                        sql = 'insert into ' + skillp_table_name + ' values (' + id + ',' + skill_id + ',$$' + type + '$$,$$' + skill + '$$,$$' + result.rows[0].player_name + '$$,$$' + result.rows[0].drum_skill + '$$,$$' + result.rows[0].update_date + '$$);';
                      }
                      client.query(sql, function(err, result) {
                        done();
                        if (err) {
                          console.error(sql);
                          console.error(err);
                        } else {
                          res.redirect('/' + req.params.ver + '/' + id + '/p');
                        }
                      });
                    } else {
                      console.error('Cannot find any data by id ' + skill_id);
                    }
                  }
                });
              }
            });
          }
        }
      });
    });
  });
}

