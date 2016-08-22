var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/', function (req, res) {
    // read skill data from db
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      var sql = 'select * from skill where user_id = 1';
      client.query(sql, function(err, result) {
        done();
        
        if (err) {
          console.error(err);
          res.send("Error" + err);
        } else {
          //console.log(JSON.parse(result.rows[0]));
          res.render("index", { 
            user_id : result.rows[0].user_id,
            skill_data : JSON.parse(result.rows[0].skill_json)
          });
        }      
      });
    });
  });
}
