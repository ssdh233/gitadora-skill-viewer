var pg = require('pg');

var { SKILL_TABLE, VERSION_NAME } = require('../constants');

pg.defaults.ssl = true;

module.exports.controller = function (app) {
  app.get('/:ver/list', function (req, res) {
    const version = req.params.ver;
    const skill_table_name = SKILL_TABLE[version];
    const version_name = VERSION_NAME[version];

    if (!skill_table_name || !version_name) {
      res.send("Unexpected version parameter.");
    }

    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      if (err) {
        console.log('err', err);
      }
      var sql = 'select * from ' + skill_table_name + ' order by id asc;';
      client.query(sql, function (err, result) {
        done();

        if (err) {
          console.error(sql);
          console.error(err);
          res.send(sql + "<br>" + err);
        } else {
          var data = [];
          for (var i in result.rows) {
            try {
              var guitar_skill = JSON.parse(result.rows[i].guitar_skill);
              var drum_skill = JSON.parse(result.rows[i].drum_skill);
              data.push({
                id : result.rows[i].id,
                player_name : result.rows[i].player_name,
                guitar_skill: (parseFloat(guitar_skill.hot.point) + parseFloat(guitar_skill.other.point)).toFixed(2),
                drum_skill: (parseFloat(drum_skill.hot.point) + parseFloat(drum_skill.other.point)).toFixed(2),
                update_date: result.rows[i].update_date
              });
            } catch (e) {
              // TODO figure out why there is no 'other' skill
              console.log(e);
            }
          }
          res.render("list" , {
            data : data,
            version: req.params.ver,
            version_full: version_name
          });
        }
      });
    });
  });
}
