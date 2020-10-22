const pg = require("./modules/pg");
const { CURRENT_VERSION } = require("./constants");

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
      const sql = `select "playerId", "version", "cardNumber", "gitadoraId", "playerName", "guitarSkillPoint", "drumSkillPoint", "updateDate", "updateCount" from skill where version='${version}' order by "playerId" asc;`;
      const result = await pg.query(sql);

      return result.rows;
    },
    user: async (_, { playerId, version }) => {
      if (playerId == null) return null;
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
        const count = kasegiResult.count;

        return {
          version,
          type,
          scope,
          count,
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
    },
    sharedSongSuggestions: async (_, { type }) => {
      const result = await pg.query(
        `SELECT "songName" FROM shared_songs WHERE type='${type}' AND version='${CURRENT_VERSION}' ORDER BY count desc;`
      );
      const allSuggestions = result.rows;

      return allSuggestions.map(suggestion => suggestion.songName);
    },
    sharedSongs: async (_, { input, type }) => {
      if (!input) return null;

      pg.query(
        `UPDATE shared_songs SET count = count + 1 WHERE "songName"=$$${input}$$ AND version='${CURRENT_VERSION}' AND type='${type}';`
      );

      const result = await pg.query(
        `select * from skill where version='${CURRENT_VERSION}' and "sharedSongs"->>'${type}' LIKE $$%${input}%$$ ORDER BY "updateDate" DESC LIMIT 20;`
      );

      return result.rows;
    },
    errors: async () => {
      const result = await pg.query(
        `SELECT * FROM errorReports ORDER BY "date" DESC;`
      );
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
      const sharedSongsStr = JSON.stringify(data.sharedSongs) || "{}";

      updateSharedSongList(data.sharedSongs);

      let playerDataRow;

      // try to get player data by gitadora id
      if (data.gitadoraId) {
        const searchByGitadoraIdResult = await pg.query(
          `select * from skill where "gitadoraId" = $$${
            data.gitadoraId
          }$$ and version='${version}';`
        );

        if (searchByGitadoraIdResult.rows[0]) {
          playerDataRow = searchByGitadoraIdResult.rows[0];
        }
      }

      // try to get player data by card number
      if (!playerDataRow) {
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
              "updateCount" = ${(playerDataRow.updateCount || 1) + 1},
              "sharedSongs" = $$${sharedSongsStr}$$::json
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
            $$${data.updateDate}$$, 1, $$${sharedSongsStr}$$::json
          );
        `);

        await saveSkill({ version, data, playerId, type: "g" });
        await saveSkill({ version, data, playerId, type: "d" });

        await pg.query("COMMIT");
        return playerId;
      }
    },
    postError: async (_, { version, error, date, userAgent }) => {
      await pg.query(`INSERT INTO errorReports VALUES (
        $$${version}$$ , $$${error}$$, $$${date}$$, $$${userAgent}$$
      );`);
      return;
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

async function updateSharedSongList(sharedSongs) {
  if (!sharedSongs) return;
  sharedSongs.d &&
    sharedSongs.d.forEach(async songName => {
      await pg.query(`INSERT INTO shared_songs VALUES(
      $$${songName}$$, $$${CURRENT_VERSION}$$, 'd', 0
    ) ON CONFLICT DO NOTHING;`);
    });

  sharedSongs.g &&
    sharedSongs.g.forEach(async songName => {
      await pg.query(`INSERT INTO shared_songs VALUES(
      $$${songName}$$, $$${CURRENT_VERSION}$$, 'g', 0
    ) ON CONFLICT DO NOTHING;`);
    });
}
