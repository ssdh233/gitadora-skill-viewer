var pg = require("../modules/pg");

var { SKILLP_TABLE, VERSION_NAME } = require("../constants");

module.exports.controller = function(app) {
  app.get("/:ver/:id/p", function(req, res) {
    const version = req.params.ver;
    const skillp_table_name = SKILLP_TABLE[version];
    const version_name = VERSION_NAME[version];

    if (!skillp_table_name || !version_name) {
      res.send("Unexpected version parameter.");
    } else {
      pg.connect(
        process.env.DATABASE_URL,
        function(err, client, done) {
          var sql = `select * from ${skillp_table_name} where id =${
            req.params.id
          };`;
          client.query(sql, function(err, result) {
            done();

            if (err) {
              console.error(sql);
              console.error(err);
              res.send(`${sql}<br>${err}`);
            } else {
              if (!result.rows[0]) {
                res.render("skillp");
              } else {
                var skill_data = JSON.parse(result.rows[0].skill_data);
                var skill_point = result.rows[0].skill;
                res.render("skillp", {
                  version_full: version_name,
                  player_name: result.rows[0].player_name.replace(
                    /^"(.*)"$/,
                    "$1"
                  ),
                  type: result.rows[0].type, // guitar / drum
                  skill_data: skill_data,
                  skill_point: skill_point,
                  skill_lv: parseInt(skill_point / 500),
                  update_date: result.rows[0].update_date
                });
              }
            }
          });
        }
      );
    }
  });
};
