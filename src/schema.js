const { gql } = require("apollo-server-express");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users(version: Version): [User]
    user(id: String, type: GameType, version: Version): User
    kasegi(scope: Int, type: GameType, version: Version): Kasegi
    savedSkill(id: String, type: GameType, version: Version): SavedSkill
    savedSkills(id: String, type: GameType, version: Version): [SavedSkill]
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

  input UserInput {
    cardNumber: String
    playerName: String
    updateDate: String
    drumSkill: SkillTableInput
    guitarSkill: SkillTableInput
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

  type User {
    vesion: String
    id: String
    playerName: String
    updateDate: String
    updateCount: Float
    drumSkill: SkillTable
    guitarSkill: SkillTable
    savedSkills: [SavedSkill]
  }

  type SavedSkill {
    id: String
    playerId: String
    playerName: String
    updateDate: String
    type: String
    skillPoint: String
    skillData: SkillTable
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
`;

module.exports = typeDefs;
