var http = require('http');
var pg = require('pg');

module.exports.controller = function (app) {
  app.post('/save', function (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      var skill_id = req.body.skill_id;
      var type = req.body.type;
      var skill = req.body.skill;

      var sql = 'select * from skillp where skill_id =' + skill_id + ' and type = $$' + type + '$$ and skill = $$' + skill + '$$;';
      client.query(sql, function(err, result) {
        done();
        
        if (err) {
          console.error(sql);
          console.error(err);
        } else {
          if (result.rows[0]) {
            res.redirect('/' + result.rows[0].id + '/p');
          } else {
            var sql = 'select max(id) as maxid from skillp';
            client.query(sql, function(err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
              } else {
                var id = (result.rows[0].maxid || 0) + 1;
                var sql = 'select * from skill where id =' + skill_id + ';';
                client.query(sql, function(err, result) {
                  done();

                  if (err) {
                    console.error(sql);
                    console.error(err);
                  } else {
                    if (result.rows[0]) {
                      var sql;
                      if (type == 'guitar') {
                        sql = 'insert into skillp values (' + id + ',' + skill_id + ',$$' + type + '$$,$$' + skill + '$$,$$' + result.rows[0].player_name + '$$,$$' + result.rows[0].guitar_skill + '$$,$$' + result.rows[0].update_date + '$$);';
                      } else {
                        sql = 'insert into skillp values (' + id + ',' + skill_id + ',$$' + type + '$$,$$' + skill + '$$,$$' + result.rows[0].player_name + '$$,$$' + result.rows[0].drum_skill + '$$,$$' + result.rows[0].update_date + '$$);';
                      }
                      client.query(sql, function(err, result) {
                        done();
                        if (err) {
                          console.error(sql);
                          console.error(err);
                        } else {
                          res.redirect('/' + id + '/p');

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

