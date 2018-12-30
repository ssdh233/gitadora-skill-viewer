var pg = require("../modules/pg");

var { SKILL_TABLE, SKILLP_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.post("/:ver/save", function(req, res) {
    pg.connect(
      process.env.DATABASE_URL,
      function(err, client, done) {
        const version = req.params.ver;
        const skill_table_name = SKILL_TABLE[version];
        const skillp_table_name = SKILLP_TABLE[version];

        if (!skill_table_name || !skillp_table_name) {
          res.send("Unexpected version parameter.");
        } else {
          const skill_id = req.body.skill_id;
          const type = { g: "guitar", d: "drum" }[req.body.type];
          const skill = req.body.skill;

          var sql = `select * from ${skillp_table_name} where skill_id =${skill_id} and type = $$${type}$$ and skill = $$${skill}$$;`;

          client.query(sql, function(err, result) {
            done();

            if (err) {
              res.json({ err, sql });
            }

            if (result.rows[0]) {
              res.json({ savedSkillId: result.rows[0].id });
            } else {
              var sql = `select max(id) as maxid from ${skillp_table_name}`;
              client.query(sql, function(err, result) {
                done();

                if (err) {
                  res.json({ err, sql });
                } else {
                  const savedSkillId = (result.rows[0].maxid || 0) + 1;
                  var sql = `select * from ${skill_table_name} where id =${skill_id};`;
                  client.query(sql, function(err, result) {
                    done();

                    if (err) {
                      res.json({ err, sql });
                    } else {
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
                        client.query(sql, function(err) {
                          done();
                          if (err) {
                            res.json({ err, sql });
                          } else {
                            res.json({ savedSkillId });
                          }
                        });
                      } else {
                        res.json({
                          err: `Cannot find any data by id ${skill_id}`
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        }
      }
    );
  });
};
