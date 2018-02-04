var pg = require('pg');

module.exports.controller = function (app) {
  app.get('/:ver/:id/g', function (req, res) {
    doSomething(req, res, 'g');
  });

  app.get('/:ver/:id/d', function (req, res) {
    doSomething(req, res, 'd');
  });
}

function doSomething(req, res, type) {
  const typeName = {
    d: "drum",
    g: "guitar"
  }[type];

  const versionName =  {
    tb: "GITADORA Tri-Boost",
    tbre: "GITADORA Tri-Boost Re:EVOLVE",
    matixx: "GITADORA Matixx",
  }[version];

  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    getSkill({
      client: client,
      res: res,
      version: req.params.ver,
      type: typeName,
      id: req.params.id,
    }, ({ skillName, updateDate, skillData }) => {
      getSavedSkillList({
        client: client,
        res: res,
        version: req.params.ver,
        type: typeName,
        id: req.params.id,
      }, (savedSkillList) => {
        done();
        const skillPoint = (parseFloat(skillData.hot.point) + parseFloat(skillData.other.point)).toFixed(2);
        res.render("skill" , {
          version : req.params.ver,
          version_full : versionName,
          player_name : skillName.replace(/^"(.*)"$/, '$1'),
          id : req.params.id,
          skill_data : skillData,
          skill_point : skillPoint,
          update_date : updateDate,
          skillp_data : savedSkillList,
          type : (typeName == "drum") ? 0 : 1 //1:guitar 0:drum
        });
      })
    });
  });
}

function getSkill({client, res, version, type, id}, callback) {
  let skillTableName = {
    tb: "skill_tb",
    tbre: "skill_tbre",
    matixx: "skill_matixx",
  }[version];

  const sql = 'select * from ' + skillTableName + ' where id =' + id + ';';
  client.query(sql, (err, result) => {
    if (err) {
      res.send(sql + "<br>" + err);
    } else if(!result.rows[0]) {
      // no result
      res.render("skill");
    } else {
      const userData = result.rows[0];
      let skillData;
      if (type == "drum"){
        skillData = JSON.parse(userData.drum_skill);
      } else {
        skillData = JSON.parse(userData.guitar_skill);
      }
      callback({
        skillName: userData.player_name,
        updateDate: userData.update_date,
        skillData: skillData,
      });
    }
  });
}

function getSavedSkillList({client, res, version, type, id}, callback) {
  let skillpTableName = {
    tb: "skillp_tb",
    tbre: "skillp_tbre",
    matixx: "skillp_matixx",
  }[version];

  const sql = 'select * from ' + skillpTableName + ' where skill_id =' + id + ' and type = $$' + type + '$$;';
  client.query(sql, (err, result) => {
    if (err) {
      res.send(sql + "<br>" + err);
    } else {
      callback(result.rows);
    }
  });
}
