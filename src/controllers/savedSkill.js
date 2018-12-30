const pg = require("../modules/pg");
const { SKILLP_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.get("/api/:ver/:id/p", function(req, res) {
    const { id, ver } = req.params;
    pg.connect(
      process.env.DATABASE_URL,
      function(err, client, done) {
        done();

        let skillpTableName = SKILLP_TABLE[ver];

        const sql = `select * from ${skillpTableName} where id =${id};`;
        client.query(sql, (err, result) => {
          if (err) {
            res.json({ sql, err });
          } else {
            const userData = result.rows[0];
            res.json({
              playerId: userData.skill_id,
              type: result.rows[0].type === "drum" ? "d" : "g",
              skillName: userData.player_name,
              updateDate: userData.update_date,
              skillData: JSON.parse(userData.skill_data)
            });
          }
        });
      }
    );
  });
};
