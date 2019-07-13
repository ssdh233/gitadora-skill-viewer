const pg = require("../modules/pg");
const { SKILLP_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.get("/api/savedList/:ver/:userid/:type", async (req, res) => {
    const { ver, userid, type } = req.params;

    const skillpTableName = SKILLP_TABLE[ver];
    const typeName = {
      d: "drum",
      g: "guitar"
    }[type];

    const sql = `select id, skill, update_date from ${skillpTableName} where skill_id =${userid} and type = $$${typeName}$$ order by update_date asc;`;
    const result = await pg.query(sql);
    res.json(result.rows);
  });
};
