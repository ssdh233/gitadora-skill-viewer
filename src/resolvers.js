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
      const skillTableName = SKILL_TABLE[version];

      const guitarDataStr = JSON.stringify(data.guitarSkill);
      const drumDataStr = JSON.stringify(data.drumSkill);

      const result = await pg.query(
        `select * from ${skillTableName} where card_number = $$${
          data.cardNumber
        }$$;`
      );
      if (result.rows[0]) {
        const id = result.rows[0].id;
        await pg.query(
          `update ${skillTableName} set player_name = $$${
            data.playerName
          }$$, guitar_skill = $$${guitarDataStr}$$, drum_skill = $$${drumDataStr}$$, update_date = $$${
            data.updateDate
          }$$, update_count = ${(result.rows[0].update_count || 1) +
            1} where id = ${id};`
        );

        return id;
      } else {
        const result = await pg.query(
          `select max(id) as maxid from ${skillTableName};`
        );
        const id = (result.rows[0].maxid || 0) + 1;
        await pg.query(
          `insert into ${skillTableName} values (${id},$$${
            data.cardNumber
          }$$,$$${
            data.playerName
          }$$,$$${guitarDataStr}$$,$$${drumDataStr}$$,$$${
            data.updateDate
          }$$, 1);`
        );

        return id;
      }
    }
  }
};
