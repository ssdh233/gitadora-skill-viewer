const pg = require("../modules/pg");

function isValidSkillData(skillData) {
  return (
    skillData.hot &&
    skillData.hot.data &&
    skillData.hot.data.length >= 25 &&
    skillData.other &&
    skillData.other.data &&
    skillData.other.data.length >= 25
  );
}

function gatherKasegiResult({ skillData, kasegiResult }) {
  const newKasegiResult = Object.assign({}, kasegiResult);
  const skillPoint = (
    parseFloat(skillData.hot.point) + parseFloat(skillData.other.point)
  ).toFixed(2);
  const skillLevel = parseInt(skillPoint / 500) * 500;

  if (!newKasegiResult[skillLevel]) {
    newKasegiResult[skillLevel] = {
      hot: {},
      other: {}
    };
  }

  const addToKasegiResult = hotType => item => {
    const key = `${item.name} ${item.diff}-${item.part}`;

    if (!newKasegiResult[skillLevel][hotType][key]) {
      newKasegiResult[skillLevel][hotType][key] = {
        name: item.name,
        diff: item.diff,
        part: item.part,
        diffValue: item.diff_value,
        skills: [item.skill_value],
        playerSkills: [skillPoint]
      };
    } else {
      const { skills, playerSkills, ...rest } = newKasegiResult[skillLevel][
        hotType
      ][key];
      newKasegiResult[skillLevel][hotType][key] = {
        ...rest,
        skills: skills.concat(item.skill_value),
        playerSkills: playerSkills.concat(skillPoint)
      };
    }
  };

  skillData.hot.data.forEach(addToKasegiResult("hot"));
  skillData.other.data.forEach(addToKasegiResult("other"));

  return newKasegiResult;
}

function extractKasegiResult(gatheredKasegiResult) {
  const kasegiResult = {};
  Object.keys(gatheredKasegiResult).forEach(skillLevel => {
    kasegiResult[skillLevel] = {
      hot: [],
      other: []
    };

    const extractKasegiResultByType = hotType => {
      let gatheredResult = gatheredKasegiResult[skillLevel][hotType];
      Object.keys(gatheredResult).forEach(key => {
        const { skills, playerSkills, ...rest } = gatheredResult[key];

        kasegiResult[skillLevel][hotType].push({
          ...rest,
          averageSkill: (
            skills.map(parseFloat).reduce((cur, acc) => cur + acc) /
            skills.length
          ).toFixed(2),
          count: skills.length,
          averagePlayerSKill: (
            playerSkills.map(parseFloat).reduce((cur, acc) => cur + acc) /
            playerSkills.length
          ).toFixed(2)
        });
      });
    };

    extractKasegiResultByType("hot");
    extractKasegiResultByType("other");
  });

  return kasegiResult;
}

async function kasegi({ version, type }) {
  const sql = `select * from skill where version=$$${version}$$ order by "playerId" asc;`;

  const result = await pg.query(sql);
  let gatheredKasegiResult = {};
  result.rows.forEach(userData => {
    try {
      const skillData = userData[`${type}Skill`];

      if (isValidSkillData(skillData)) {
        gatheredKasegiResult = gatherKasegiResult({
          skillData,
          kasegiResult: gatheredKasegiResult
        });
      }
    } catch (e) {
      console.error(e);
    }
  });

  const kasegiResult = extractKasegiResult(gatheredKasegiResult);
  Object.keys(kasegiResult).forEach(async skillLevel => {
    const result = kasegiResult[skillLevel];

    const listHotString = JSON.stringify(result.hot);
    const listOtherString = JSON.stringify(result.other);
    const sql = `
            do $sql$
              begin
                update kasegi set list_hot=$$${listHotString}$$, list_other=$$${listOtherString}$$ where version=$$${version}$$ and type=$$${type}$$ and scope=${skillLevel};
                IF NOT FOUND THEN
                  insert into kasegi values ($$${version}$$,$$${type}$$,${skillLevel},$$${listHotString}$$,$$${listOtherString}$$);
                END IF;
              end
            $sql$
          `;

    await pg.query(sql);
    console.log(
      `Update kasegi data successfully for ${version} ${type} ${skillLevel} `
    );
  });
}

module.exports = {
  job: () => {
    kasegi({ version: "exchain", type: "guitar" });
    kasegi({ version: "exchain", type: "drum" });
  },
  // every day 20:00 UTC = 5:00 JST
  cronSchedule: "0 0 20 * * *"
  // cronSchedule: "0 0 * * * *" // for testing
};
