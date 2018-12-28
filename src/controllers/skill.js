const pg = require("../modules/pg");
const { VERSION_NAME } = require("../constants");
const { getSkill } = require("./skill_controller");

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
