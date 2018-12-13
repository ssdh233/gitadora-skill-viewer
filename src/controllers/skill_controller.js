var pg = require("../modules/pg");
var {
  SKILL_TABLE,
  SKILLP_TABLE,
  VERSION_NAME,
  OLD_NAME_MAP
} = require("../constants");

module.exports.controller = function(app) {
  app.get("/:ver/:id/g", function(req, res) {
    doSomething(req, res, "g");
  });

  app.get("/:ver/:id/d", function(req, res) {
    doSomething(req, res, "d");
  });
};

function doSomething(req, res, type) {
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
            let currentSkillData = skillData;
            getSavedSkillList(
              {
                client: client,
                res: res,
                version: req.params.ver,
                type: typeName,
                id: req.params.id
              },
              savedSkillList => {
                const skillPoint = (
                  parseFloat(skillData.hot.point) +
                  parseFloat(skillData.other.point)
                ).toFixed(2);

                const comparingSkillId = req.query.c;
                if (comparingSkillId) {
                  getSavedSkill(
                    {
                      client: client,
                      res: res,
                      version: req.params.ver,
                      skillid: comparingSkillId
                    },
                    ({ skillData: savedSkillData }) => {
                      done();
                      currentSkillData = compareSkill(
                        skillData,
                        savedSkillData
                      );
                      res.render("skill", {
                        version: req.params.ver,
                        version_full: versionName,
                        player_name: skillName.replace(/^"(.*)"$/, "$1"),
                        id: req.params.id,
                        skill_data: currentSkillData,
                        skill_point: skillPoint,
                        update_date: updateDate,
                        skillp_data: savedSkillList,
                        type: typeName == "drum" ? 0 : 1 //1:guitar 0:drum
                      });
                    }
                  );
                } else {
                  done();
                  res.render("skill", {
                    version: req.params.ver,
                    version_full: versionName,
                    player_name: skillName.replace(/^"(.*)"$/, "$1"),
                    id: req.params.id,
                    skill_data: currentSkillData,
                    skill_point: skillPoint,
                    update_date: updateDate,
                    skillp_data: savedSkillList,
                    type: typeName == "drum" ? 0 : 1 //1:guitar 0:drum
                  });
                }
              }
            );
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

function getSavedSkillList({ client, res, version, type, id }, callback) {
  let skillpTableName = SKILLP_TABLE[version];

  const sql = `select * from ${skillpTableName} where skill_id =${id} and type = $$${type}$$ order by update_date asc;`;
  client.query(sql, (err, result) => {
    if (err) {
      res.send(`${sql}<br>${err}`);
    } else {
      callback(result.rows);
    }
  });
}

function getSavedSkill({ client, res, version, skillid }, callback) {
  let skillpTableName = SKILLP_TABLE[version];

  const sql = `select * from ${skillpTableName} where id =${skillid};`;
  client.query(sql, (err, result) => {
    if (err) {
      res.send(`${sql}<br>${err}`);
    } else {
      const userData = result.rows[0];
      callback({
        skillName: userData.player_name,
        updateDate: userData.update_date,
        skillData: JSON.parse(userData.skill_data)
      });
    }
  });
}

function compareSkill(current, old) {
  let result = Object.assign({}, current);

  result.hot = compareSkillHalf(result.hot, old.hot);
  result.other = compareSkillHalf(result.other, old.other);

  return result;
}

function compareSkillHalf(current, old) {
  let result = Object.assign({}, current);

  if (!current.data || !old.data) {
    return result;
  }

  if (result) {
    result.data.forEach(item => {
      let newSkillFlag = true;
      for (let i = 0; i < old.data.length; i++) {
        if (
          old.data[i].name === item.name ||
          OLD_NAME_MAP[old.data[i].name] === item.name
        ) {
          newSkillFlag = false;
          const newSkill = Number(item.skill_value);
          const oldSkill = Number(old.data[i].skill_value);
          if (newSkill > oldSkill) {
            const sub = (newSkill - oldSkill).toFixed(2);
            item.compare = `${sub}↑`;
          }
          break;
        }
      }
      if (newSkillFlag) {
        item.compare = "New!";
      }
    });
  }

  return result;
}
