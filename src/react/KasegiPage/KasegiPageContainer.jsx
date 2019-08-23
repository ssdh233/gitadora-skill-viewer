import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

import queryParser from "../../modules/query";
import KasegiPage from "./KasegiPage.jsx";

// TODO move away fragments
// TODO find way to fetch only guitar/drum skill (write 2 queries?)
const GET_KASEGI = gql`
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

  fragment KasegiRecord on KasegiRecord {
    name
    diff
    part
    diffValue
    averageSkill
    count
    averagePlayerSKill
  }

  query Kasegi(
    $version: Version
    $type: GameType
    $scope: Int
    $playerId: Int
  ) {
    kasegi(version: $version, type: $type, scope: $scope) {
      version
      type
      scope
      hot {
        ...KasegiRecord
      }
      other {
        ...KasegiRecord
      }
    }
    user(playerId: $playerId, version: $version) {
      playerId
      playerName
      drumSkill {
        hot {
          ...HalfSkillTable
        }
        other {
          ...HalfSkillTable
        }
      }
      guitarSkill {
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

export default function KasegiPageContainer(props) {
  const { version, type, scope } = props.match.params;
  const query = queryParser(props.location.search);

  const { data, loading, error } = useQuery(GET_KASEGI, {
    variables: {
      version,
      type,
      scope: parseInt(scope),
      playerId: parseInt(query.c)
    }
  });

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR: {error.toString()}</p>;

  return (
    <KasegiPage
      kasegiData={getKasegiData(data.kasegi, data.user, type)}
      comparedSkillData={data.user}
      match={{
        ...props.match,
        query: queryParser(props.location.search)
      }}
    />
  );
}

// TODO rethink about this function
function getKasegiData(kasegiData, kasegiComparedSkill, type) {
  const sortByCountAndSkill = (a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count;
    } else if (b.averageSkill - a.averageSkill) {
      return b.averageSkill - a.averageSkill;
    }
  };

  const processData = skillData => (data, index) => {
    const { name, diff, part, diffValue, averageSkill } = data;

    let displayedDiff = `${diffValue.toFixed(2)} ${diff}`;
    if (part !== "D") {
      displayedDiff = `${displayedDiff}-${part}`;
    }

    const averageAchieve =
      ((averageSkill / (diffValue * 20)) * 100).toFixed(2) + "%";
    const displayedAverageSkill = `${averageSkill.toFixed(
      2
    )} (${averageAchieve})`;

    let compare = null;
    if (skillData) {
      let comparedData = skillData.find(
        skillDataItem =>
          skillDataItem.name === name &&
          skillDataItem.diff === diff &&
          skillDataItem.part === part
      );
      if (comparedData) {
        compare = comparedData.skill_value - averageSkill;
        if (compare > 0) {
          compare = `${compare.toFixed(2)}↑`;
        } else if (compare < 0) {
          compare = `${compare.toFixed(2).substring(1)}↓`;
        } else {
          compare = `0.00`;
        }
      }
    }

    return {
      index: index + 1,
      diff,
      displayedDiff,
      displayedAverageSkill,
      compare,
      ...data
    };
  };

  if (!kasegiData) {
    return null;
  }

  const { hot: kasegiHot, other: kasegiOther, ...rest } = kasegiData;
  const { hot: skillHot, other: skillOther } =
    (kasegiComparedSkill &&
      kasegiComparedSkill[type === "d" ? "drumSkill" : "guitarSkill"]) ||
    {};

  return {
    ...rest,
    hot:
      kasegiHot &&
      kasegiHot
        .sort(sortByCountAndSkill)
        .map(processData(skillHot && skillHot.data)),
    other:
      kasegiOther &&
      kasegiOther
        .sort(sortByCountAndSkill)
        .map(processData(skillOther && skillOther.data))
  };
}
