const { gql } = require("apollo-server-express");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users(version: Version): [User]
    user(playerId: Int, type: GameType, version: Version): User
    kasegi(scope: Int, type: GameType, version: Version): Kasegi
    savedSkill(skillId: Int, type: GameType, version: Version): SavedSkill
    savedSkills(playerId: Int, type: GameType, version: Version): [SavedSkill]
  }

  type Mutation {
    upload(version: Version, data: UserInput): Int
  }

  enum GameType {
    g
    d
  }

  enum Version {
    exchain
    matixx
    tbre
    tb
  }

  type User {
    version: String
    playerId: Int
    playerName: String
    updateDate: String
    updateCount: Float
    drumSkillPoint: Float
    guitarSkillPoint: Float
    drumSkill: SkillTable
    guitarSkill: SkillTable
    savedSkills: [SavedSkill]
  }

  type SavedSkill {
    skillId: Int
    playerId: Int
    playerName: String
    updateDate: String
    type: String
    skillPoint: Float
    skill: SkillTable
  }

  type SkillTable {
    hot: HalfSkillTable
    other: HalfSkillTable
  }

  type HalfSkillTable {
    point: Float
    data: [SkillRecord]
  }

  type SkillRecord {
    name: String
    part: String
    diff: String
    skill_value: Float
    achive_value: String
    diff_value: Float
  }

  type Kasegi {
    version: Version
    type: GameType
    scope: Int
    hot: [KasegiRecord]
    other: [KasegiRecord]
  }

  type KasegiRecord {
    name: String
    diff: String
    part: String
    diffValue: Float
    averageSkill: Float
    count: Int
    averagePlayerSKill: Float
  }

  input UserInput {
    cardNumber: String
    gitadoraId: String
    playerName: String
    updateDate: String
    drumSkill: SkillTableInput
    guitarSkill: SkillTableInput
    sharedSongs: SharedSongsInput
  }

  input SkillTableInput {
    hot: HalfSkillTableInput
    other: HalfSkillTableInput
  }

  input HalfSkillTableInput {
    point: String
    data: [SkillRecordInput]
  }

  input SkillRecordInput {
    name: String
    part: String
    diff: String
    skill_value: String
    achive_value: String
    diff_value: String
  }

  input SharedSongsInput {
    drum: [String]
    guitar: [String]
  }
`;

module.exports = typeDefs;
