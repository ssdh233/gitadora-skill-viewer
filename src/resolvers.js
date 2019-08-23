const pg = require("./modules/pg");

// Provide resolver functions for your schema fields
module.exports = {
  GameType: {
    g: "g",
    d: "d"
  },
  Version: {
    exchain: "exchain",
    matixx: "matixx",
    tbre: "tbre",
    tb: "tb"
  },
  Query: {
    users: async (_, { version }) => {
      const sql = `select * from skill where version='${version}' order by "playerId" asc;`;
      const result = await pg.query(sql);

      return result.rows;
    },
    user: async (_, { playerId, version }) => {
      if (!playerId) return null;
      const sql = `select * from skill where version='${version}' and "playerId"=${playerId};`;
      const result = await pg.query(sql);
      return result.rows[0];
    },
    kasegi: async (_, { version, type, scope }) => {
      const typeFull = {
        d: "drum",
        g: "guitar"
      }[type];

      const sql = `select * from kasegi where version=$$${version}$$ and type=$$${typeFull}$$ and scope=${scope};`;

      const result = await pg.query(sql);
      const kasegiResult = result.rows[0];

      if (kasegiResult) {
        const kasegiListHot = JSON.parse(kasegiResult.list_hot);
        const kasegiListOther = JSON.parse(kasegiResult.list_other);

        return {
          version,
          type,
          scope,
          hot: kasegiListHot,
          other: kasegiListOther
        };
      } else {
        return {
          version,
          type,
          scope
        };
      }
    },
    savedSkill: async (_, { skillId, version }) => {
      if (!skillId) return null;
      const result = await pg.query(
        `select * from skillp where version='${version}' and "skillId"=${skillId};`
      );
      return result.rows[0];
    },
    savedSkills: async (_, { playerId, version, type }) => {
      const sql = `select "skillId", "playerName", "skillPoint", "updateDate" from skillp where "playerId"=${playerId} and "version"='${version}' and type='${type}' order by "updateDate" asc;`;
      const result = await pg.query(sql);
      return result.rows;
    }
  },
  Mutation: {
    upload: async (_, { version, data }) => {
      const guitarSkillPoint = (
        parseFloat(data.guitarSkill.hot.point) +
        parseFloat(data.guitarSkill.other.point)
      ).toFixed(2);
      const drumSkillPoint = (
        parseFloat(data.drumSkill.hot.point) +
        parseFloat(data.drumSkill.other.point)
      ).toFixed(2);
      const guitarDataStr = JSON.stringify(data.guitarSkill);
      const drumDataStr = JSON.stringify(data.drumSkill);

      let playerDataRow;

      const searchByGitadoraIdResult = await pg.query(
        `select * from skill where "gitadoraId" = $$${
          data.gitadoraId
        }$$ and version='${version}';`
      );

      if (searchByGitadoraIdResult.rows[0]) {
        playerDataRow = searchByGitadoraIdResult.rows[0];
      } else {
        const searchByCardNumberResult = await pg.query(
          `select * from skill where "cardNumber" = $$${
            data.cardNumber
          }$$ and version='${version}';`
        );
        if (searchByCardNumberResult.rows[0]) {
          playerDataRow = searchByCardNumberResult.rows[0];
        }
      }

      if (playerDataRow) {
        await pg.query("BEGIN");

        const {
          playerId,
          guitarSkillPoint: oldGuitarSkillPoint,
          drumSkillPoint: oldDrumSkillPoint
        } = playerDataRow;

        if (oldGuitarSkillPoint < guitarSkillPoint)
          await saveSkill({ version, data, playerId, type: "g" });

        if (oldDrumSkillPoint < drumSkillPoint)
          await saveSkill({ version, data, playerId, type: "d" });

        await pg.query(`
            UPDATE skill SET 
              "playerName" = $$${data.playerName}$$,
              "cardNumber" = $$${data.cardNumber}$$,
              "gitadoraId" = $$${data.gitadoraId}$$,
              "guitarSkillPoint" = $$${guitarSkillPoint}$$,
              "drumSkillPoint" = $$${drumSkillPoint}$$,
              "guitarSkill" = $$${guitarDataStr}$$::json,
              "drumSkill" = $$${drumDataStr}$$::json,
              "updateDate" = $$${data.updateDate}$$,
              "updateCount" = ${(playerDataRow.updateCount || 1) + 1}
            WHERE "playerId" = ${playerId} and version = '${version}';`);

        await pg.query("COMMIT");

        return playerId;
      } else {
        await pg.query("BEGIN");
        const idResult = await pg.query(
          `SELECT coalesce(max("playerId") + 1,0) as "playerId" FROM skill WHERE version='${version}';`
        );

        const playerId = idResult.rows[0].playerId;

        await pg.query(`
          INSERT INTO skill VALUES (
            ${playerId}, $$${version}$$, $$${data.cardNumber}$$,
            $$${data.gitadoraId}$$, $$${data.playerName}$$,
            $$${guitarSkillPoint}$$, $$${drumSkillPoint}$$,
            $$${guitarDataStr}$$::json, $$${drumDataStr}$$::json,
            $$${data.updateDate}$$,
            1
          );
        `);

        await saveSkill({ version, data, playerId, type: "g" });
        await saveSkill({ version, data, playerId, type: "d" });

        await pg.query("COMMIT");
        return playerId;
      }
    }
  }
};

async function saveSkill({ version, data, playerId, type }) {
  const guitarSkillPoint = (
    parseFloat(data.guitarSkill.hot.point) +
    parseFloat(data.guitarSkill.other.point)
  ).toFixed(2);
  const drumSkillPoint = (
    parseFloat(data.drumSkill.hot.point) +
    parseFloat(data.drumSkill.other.point)
  ).toFixed(2);
  const guitarDataStr = JSON.stringify(data.guitarSkill);
  const drumDataStr = JSON.stringify(data.drumSkill);

  const skillIdResult = await pg.query(
    `SELECT coalesce(max("skillId") + 1,0) as "skillId" FROM skillp WHERE version='${version}';`
  );

  const skillId = skillIdResult.rows[0].skillId;

  await pg.query(`
    INSERT INTO skillp VALUES (
      ${skillId}, $$${version}$$, ${playerId}, $$${data.playerName}$$,
      $$${type}$$,
      $$${type === "g" ? guitarSkillPoint : drumSkillPoint}$$,
      $$${type === "g" ? guitarDataStr : drumDataStr}$$::json,
      $$${data.updateDate}$$
    );
  `);
}
