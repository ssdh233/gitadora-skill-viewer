const pg = require("../modules/pg");

const { SKILL_TABLE, SKILLP_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.post("/:ver/save", async (req, res) => {
    const version = req.params.ver;
    const skill_table_name = SKILL_TABLE[version];
    const skillp_table_name = SKILLP_TABLE[version];

    if (!skill_table_name || !skillp_table_name) {
      res.send("Unexpected version parameter.");
    } else {
      const skill_id = req.body.skill_id;
      const type = { g: "guitar", d: "drum" }[req.body.type];
      const skill = req.body.skill;

      const result = await pg.query(
        `select * from ${skillp_table_name} where skill_id =${skill_id} and type = $$${type}$$ and skill = $$${skill}$$;`
      );

      if (result.rows[0]) {
        res.json({ savedSkillId: result.rows[0].id });
      } else {
        const maxIdResult = await pg.query(
          `select max(id) as maxid from ${skillp_table_name}`
        );
        const savedSkillId = (maxIdResult.rows[0].maxid || 0) + 1;
        const result = await pg.query(
          `select * from ${skill_table_name} where id =${skill_id};`
        );

        if (result.rows[0]) {
          var sql;
          if (type == "guitar") {
            sql = `insert into ${skillp_table_name} values (${savedSkillId},${skill_id},$$${type}$$,$$${skill}$$,$$${
              result.rows[0].player_name
            }$$,$$${result.rows[0].guitar_skill}$$,$$${
              result.rows[0].update_date
            }$$);`;
          } else {
            sql = `insert into ${skillp_table_name} values (${savedSkillId},${skill_id},$$${type}$$,$$${skill}$$,$$${
              result.rows[0].player_name
            }$$,$$${result.rows[0].drum_skill}$$,$$${
              result.rows[0].update_date
            }$$);`;
          }
          await pg.query(sql);
          res.json({ savedSkillId });
        } else {
          res.json({
            err: `Cannot find any data by id ${skill_id}`
          });
        }
      }
    }
  });
};
