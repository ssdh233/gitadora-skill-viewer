const pg = require("../modules/pg");
const { SKILLP_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.get("/api/savedList/:ver/:userid/:type", function(req, res) {
    const { ver, userid, type } = req.params;
    pg.connect(
      process.env.DATABASE_URL,
      (err, client, done) => {
        const skillpTableName = SKILLP_TABLE[ver];
        const typeName = {
          d: "drum",
          g: "guitar"
        }[type];

        const sql = `select id, skill, update_date from ${skillpTableName} where skill_id =${userid} and type = $$${typeName}$$ order by update_date asc;`;
        client.query(sql, (err, result) => {
          done();

          if (err) {
            res.json({ sql, err });
          }

          res.json(result.rows);
        });
      }
    );
  });
};
