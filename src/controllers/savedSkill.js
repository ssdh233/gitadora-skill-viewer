const pg = require("../modules/pg");
const { SKILLP_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.get("/api/:ver/:id/p", async (req, res) => {
    const { id, ver } = req.params;
    const skillpTableName = SKILLP_TABLE[ver];
    const result = await pg.query(
      `select * from ${skillpTableName} where id =${id};`
    );
    const userData = result.rows[0];
    res.json({
      playerId: userData.skill_id,
      type: userData.type === "drum" ? "d" : "g",
      skillName: userData.player_name,
      updateDate: userData.update_date,
      skillData: JSON.parse(userData.skill_data)
    });
  });
};
