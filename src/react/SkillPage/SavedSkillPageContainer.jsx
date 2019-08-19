import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

import SkillPage from "./SkillPage.jsx";

const GET_SKILL = gql`
  fragment SkillRecord on SkillRecord {
    name
    part
    diff
    skill_value
    achive_value
    diff_value
  }

  fragment HalfSkillTable on HalfSkillTable {
    point
    data {
      ...SkillRecord
    }
  }

  query SavedSkill($id: String, $version: Version, $type: GameType) {
    savedSkill(id: $id, type: $type, version: $version) {
      id
      playerId
      playerName
      updateDate
      type
      skillPoint
      skillData {
        hot {
          ...HalfSkillTable
        }
        other {
          ...HalfSkillTable
        }
      }
    }
  }
`;

export default function SavedSkillPageContainer(props) {
  const { id, version } = props.match.params;
  const { data, loading, error } = useQuery(GET_SKILL, {
    variables: { id, version },
    fetchPolicy: "network-only" // TODO
  });

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR: {error.toString()}</p>;

  return <SkillPage saved {...props} skillData={data.savedSkill} />;
}
