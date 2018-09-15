var http = require('http');
var pg = require('pg');

module.exports.controller = function (app) {
  app.post('/:ver/upload', function (req, res) {
    const skill_table_name = SKILL_TABLE[version];

    if (!skill_table_name) {
      res.send("Unexpected version parameter.");
    }

    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      var card_number = req.body.card_number;
      var player_name = req.body.player_name;
      var guitar_data_str = JSON.stringify(req.body.guitar);
      var drum_data_str = JSON.stringify(req.body.drum);
      var update_date = req.body.update_date;
      
      var sql = 'select * from ' + skill_table_name + ' where card_number = $$' + card_number + '$$;';
      client.query(sql, function(err, result) {
        done();

        if (err) {
          console.error(sql);
          console.error(err);
          res.send({ 
            status: 1, 
            message: sql + ' | ' + err 
          });
        } else {
          if (result.rows[0]) {
            var id = result.rows[0].id;
            var sql = 'update ' + skill_table_name + ' set player_name = $$' + player_name + '$$, guitar_skill = $$' + guitar_data_str + '$$, drum_skill = $$' + drum_data_str + '$$, update_date = $$' + update_date + '$$, update_count = ' + ((result.rows[0].update_count || 1) + 1) + ' where id = ' + id  +';';
            client.query(sql, function(err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
                res.send({
                  status: 1,
                  message: sql + ' | ' + err 
                });
              } else {
                res.send({
                  status: 0,
                  message: id
                });
              }
            });
          } else {
            var sql = 'select max(id) as maxid from ' + skill_table_name + ';';
            client.query(sql, function(err, result) {
              done();

              if (err) {
                console.error(sql);
                console.error(err);
                res.send({
                  status: 1,
                  message: sql + ' | ' + err 
                });
              } else {
                var id = (result.rows[0].maxid || 0) + 1;
                var sql = 'insert into ' + skill_table_name + ' values (' + id + ',$$' + card_number + '$$,$$' + player_name + '$$,$$' + guitar_data_str +  '$$,$$' + drum_data_str + '$$,$$' + update_date + '$$, 1);';
                client.query(sql, function(err, result) {
                  done();

                  if (err) {
                    console.error(sql);
                    console.error(err);
                    res.send({
                      status: 1,
                      message: sql + ' | ' + err 
                    });
                  } else {
                    res.send({
                      status: 0,
                      message: id
                    });
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
