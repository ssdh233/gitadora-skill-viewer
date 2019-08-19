const { SKILL_TABLE, VERSION_NAME, SKILLP_TABLE } = require("./constants");
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
      const skill_table_name = SKILL_TABLE[version];
      const version_name = VERSION_NAME[version];

      if (!skill_table_name || !version_name) {
        return "Unexpected version parameter.";
      } else {
        const sql = `select * from ${skill_table_name} order by id asc;`;
        const result = await pg.query(sql);
        const data = result.rows.map(result => ({
          id: result.id,
          playerName: result.player_name,
          guitarSkill: JSON.parse(result.guitar_skill), // TODO find a smarter way
          drumSkill: JSON.parse(result.drum_skill),
          updateDate: result.update_date,
          updateCount: result.update_count
        }));

        return data;
      }
    },
    user: async (_, { id, version }) => {
      if (!id) return null;
      const skillTableName = SKILL_TABLE[version];

      const sql = `select * from ${skillTableName} where id =${id};`;
      const result = await pg.query(sql);
      if (!result.rows[0]) {
        return null;
      }

      const userData = result.rows[0];
      return {
        vesion: version,
        id: id,
        playerName: userData.player_name,
        updateDate: userData.update_date,
        updateCount: userData.update_count,
        drumSkill: JSON.parse(userData.drum_skill),
        guitarSkill: JSON.parse(userData.guitar_skill)
      };
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
    savedSkill: async (_, { id, version }) => {
      if (!id) return null;

      const skillpTableName = SKILLP_TABLE[version];
      const result = await pg.query(
        `select * from ${skillpTableName} where id =${id};`
      );
      const userData = result.rows[0];
      return {
        id: id,
        playerId: userData.skill_id,
        playerName: userData.player_name,
        updateDate: userData.update_date,
        type: userData.type === "drum" ? "d" : "g",
        skillPoint: userData.skill,
        skillData: JSON.parse(userData.skill_data)
      };
    },
    savedSkills: async (_, { id, version, type }) => {
      const skillpTableName = SKILLP_TABLE[version];
      const typeName = {
        d: "drum",
        g: "guitar"
      }[type];

      const sql = `select id, player_name, skill, update_date from ${skillpTableName} where skill_id =${id} and type = $$${typeName}$$ order by update_date asc;`;
      const result = await pg.query(sql);
      return result.rows.map(row => ({
        id: row.id,
        playerId: id,
        playerName: row.player_name,
        updateDate: row.update_date,
        type: type,
        skillPoint: row.skill
      }));
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
