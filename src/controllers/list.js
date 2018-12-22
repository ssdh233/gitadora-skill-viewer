var pg = require("../modules/pg");
var { SKILL_TABLE, VERSION_NAME } = require("../constants");

module.exports.controller = function(app) {
  app.get("/api/:ver/list", function(req, res) {
    const version = req.params.ver;
    const skill_table_name = SKILL_TABLE[version];
    const version_name = VERSION_NAME[version];

    if (!skill_table_name || !version_name) {
      res.send("Unexpected version parameter.");
    } else {
      pg.connect(
        process.env.DATABASE_URL,
        function(err, client, done) {
          if (err) {
            console.error({ err });
            res.json({ err });
          }
          var sql = `select * from ${skill_table_name} order by id asc;`;
          client.query(sql, function(err, result) {
            done();

            if (err) {
              console.error(`${sql} ${err}`);
              res.json({ err, sql });
            } else {
              const data = result.rows.map(result => {
                const guitarSkill = JSON.parse(result.guitar_skill);
                const drumSkill = JSON.parse(result.drum_skill);

                return {
                  id: result.id,
                  player_name: result.player_name,
                  guitar_skill: (
                    Number((guitarSkill.hot && guitarSkill.hot.point) || 0) +
                    Number((guitarSkill.other && guitarSkill.other.point) || 0)
                  ).toFixed(2),
                  drum_skill: (
                    Number((drumSkill.hot && drumSkill.hot.point) || 0) +
                    Number((drumSkill.other && drumSkill.other.point) || 0)
                  ).toFixed(2),
                  update_date: result.update_date,
                  update_count: result.update_count
                };
              });
              res.json({
                data,
                version: req.params.ver,
                version_full: version_name
              });
            }
          });
        }
      );
    }
  });
};
