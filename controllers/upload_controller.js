var http = require('http');
var pg = require('pg');

module.exports.controller = function (app) {
  app.post('/upload', function (req, res) {
    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      var card_number = req.body.card_number;
      var player_name = JSON.stringify(req.body.player_name);
      var guitar_data_str = JSON.stringify(req.body.guitar);
      var drum_data_str = JSON.stringify(req.body.drum);
      
      var sql = 'select * from skill where card_number = $$' + card_number + '$$;';
      client.query(sql, function(err, result) {
        done();

        if (err) {
          console.error(err);
          res.send("Error" + err);
        } else {
          if (result.rows[0]) {
            var sql = 'update skill set player_name = $$' + player_name + '$$, guitar_skill = $$' + guitar_data_str + '$$, drum_skill = $$' + drum_data_str + '$$ where id = ' + result.rows[0].id  +';';
            client.query(sql, function(err, result) {
              done();

              if (err) {
                console.error(err);
                res.send("Error" + err);
              } else {
                res.send("Successfully uploaded.");
              }
            });
          } else {
            var sql = 'select max(id) as maxid from skill;';
            client.query(sql, function(err, result) {
              done();

              if (err) {
                console.error(err);
                res.send("Error" + err);
              } else {
                var id = (result.rows[0].maxid || 0) + 1;
                var sql =  'insert into skill values (' + id + ',$$' + card_number + '$$,$$' + player_name + '$$, $$' + guitar_data_str +  '$$,' + '$$' + drum_data_str + '$$);';
                client.query(sql, function(err, result) {
                  done();

                  if (err) {
                    console.error(err);
                    res.send("Error" + err);
                  } else {
                    res.send("Successfully uploaded");
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
