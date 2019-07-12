var pg = require("../modules/pg");
var { SKILL_TABLE } = require("../constants");

module.exports.controller = app => {
  app.post("/:ver/upload", async (req, res) => {
    const version = req.params.ver;
    const skill_table_name = SKILL_TABLE[version];

    if (!skill_table_name) {
      res.send("Unexpected version parameter.");
    } else {
      var card_number = req.body.card_number;
      var player_name = req.body.player_name;
      var guitar_data_str = JSON.stringify(req.body.guitar);
      var drum_data_str = JSON.stringify(req.body.drum);
      var update_date = req.body.update_date;

      const result = await pg.query(
        `select * from ${skill_table_name} where card_number = $$${card_number}$$;`
      );
      if (result.rows[0]) {
        const id = result.rows[0].id;
        await pg.query(
          `update ${skill_table_name} set player_name = $$${player_name}$$, guitar_skill = $$${guitar_data_str}$$, drum_skill = $$${drum_data_str}$$, update_date = $$${update_date}$$, update_count = ${(result
            .rows[0].update_count || 1) + 1} where id = ${id};`
        );

        res.send({
          status: 0,
          message: id
        });
      } else {
        const result = await pg.query(
          `select max(id) as maxid from ${skill_table_name};`
        );
        const id = (result.rows[0].maxid || 0) + 1;
        await pg.query(
          `insert into ${skill_table_name} values (${id},$$${card_number}$$,$$${player_name}$$,$$${guitar_data_str}$$,$$${drum_data_str}$$,$$${update_date}$$, 1);`
        );

        res.send({
          status: 0,
          message: id
        });
      }
    }
  });
};
