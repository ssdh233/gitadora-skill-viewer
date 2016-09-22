var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/userlist', function (req, res) {
    //pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      var sql = 'select * from skill order by id asc;';
      client.query(sql, function (err, result) {
        done();

        if (err) {
          console.error(sql);
          console.error(err);
          res.send(sql + "<br>" + err);
        } else {
          var data = [];
          for (var i in result.rows) {
            var guitar_skill = JSON.parse(result.rows[i].guitar_skill);
            var drum_skill = JSON.parse(result.rows[i].drum_skill);
            data.push({
              id : result.rows[i].id,
              player_name : result.rows[i].player_name,
              guitar_skill: (parseFloat(guitar_skill.hot.point) + parseFloat(guitar_skill.other.point)).toFixed(2),
              drum_skill: (parseFloat(drum_skill.hot.point) + parseFloat(drum_skill.other.point)).toFixed(2),
              update_date: result.rows[i].update_date
            });
          }
          res.render("userlist" , { data : data });
        }
      });
    });
  });
}
