const pg = require("../modules/pg");
const { VERSION_NAME, SKILL_TABLE } = require("../constants");

module.exports.controller = function(app) {
  app.get("/api/:ver/:id/g", function(req, res) {
    getSkillJson(req, res, "g");
  });

  app.get("/api/:ver/:id/d", function(req, res) {
    getSkillJson(req, res, "d");
  });
};

function getSkillJson(req, res, type) {
  const typeName = {
    d: "drum",
    g: "guitar"
  }[type];

  const versionName = VERSION_NAME[req.params.ver];

  if (!typeName || !versionName) {
    res.send("Unexpected version parameter.");
  } else {
    pg.connect(
      process.env.DATABASE_URL,
      (err, client, done) => {
        getSkill(
          {
            client: client,
            res: res,
            version: req.params.ver,
            type: typeName,
            id: req.params.id
          },
          ({ skillName, updateDate, skillData }) => {
            done();
            res.json({ skillName, updateDate, skillData });
          }
        );
      }
    );
  }
}

function getSkill({ client, res, version, type, id }, callback) {
  let skillTableName = SKILL_TABLE[version];

  const sql = `select * from ${skillTableName} where id =${id};`;
  client.query(sql, (err, result) => {
    if (err) {
      res.send(`${sql}<br>${err}`);
    } else if (!result.rows[0]) {
      // no result
      res.render("skill");
    } else {
      const userData = result.rows[0];
      let skillData;
      if (type == "drum") {
        skillData = JSON.parse(userData.drum_skill);
      } else {
        skillData = JSON.parse(userData.guitar_skill);
      }
      callback({
        skillName: userData.player_name,
        updateDate: userData.update_date,
        skillData: skillData
      });
    }
  });
}
