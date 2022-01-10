import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

import { OLD_NAME_MAP, CURRENT_VERSION } from "../../constants";
import queryParser from "../../modules/query";
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

  fragment SkillTable on SkillTable {
    hot {
      ...HalfSkillTable
    }
    other {
      ...HalfSkillTable
    }
  }

  query User(
    $playerId: Int
    $version: Version
    $type: GameType
    $savedSkillId: Int
    $rivalPlayerId: Int
  ) {
    user(playerId: $playerId, version: $version) {
      version
      playerId
      playerName
      updateDate
      updateCount
      drumSkill {
       ...SkillTable
      }
      guitarSkill {
        ...SkillTable
      }
    }

    savedSkills(playerId: $playerId, type: $type, version: $version) {
      skillId
      playerName
      updateDate
      skillPoint
    }

    savedSkill(skillId: $savedSkillId, type: $type, version: $version) {
      skillId
      skill {
        ...SkillTable
      }
    }

    rival: user(playerId: $rivalPlayerId, version: $version) {
      playerId
      playerName
      updateDate
      drumSkill {
        ...SkillTable
      }
      guitarSkill {
        ...SkillTable
      }
    }
  }
`;

export default function SkillPageContainer(props) {
  const { playerId, version, type } = props.match.params;
  const query = queryParser(props.location.search);

  const { data, loading, error } = useQuery(GET_SKILL, {
    variables: {
      playerId: parseInt(playerId),
      version,
      type,
      // ignore comparing with savedSkill while comparing with rival
      savedSkillId: query.r ? null : parseInt(query.c), 
      rivalPlayerId: parseInt(query.r)
    }
  });

  useEffect(() => {
    const gsvId = query.setLocalStorage;

    if (gsvId) {
      if (version === CURRENT_VERSION) {
        localStorage.setItem("gsvId", gsvId);
        localStorage.setItem("gsvName", data.user.playerName);
      }
      window.history.pushState("", "", window.location.href.split("?")[0]);
    }
  }, []);

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR: {error.toString()}</p>;

  return (
    <SkillPage
      {...props}
      skillData={getSkillData(data.user, data.savedSkill, type)}
      rivalSkillData={getSkillData(data.rival, null, type)}
      hasComparedSkill={Boolean(data.savedSkill)}
      skillSavedList={data.savedSkills}
    />
  );
}

function getSkillData(skill, skillComparedSkill, type) {
  if (!skill) return null;
  if (!skillComparedSkill) {
    const result = type === "d" ? skill.drumSkill : skill.guitarSkill;
    return {
      ...skill,
      skill: result
    };
  } else {
    const result = type === "d" ? skill.drumSkill : skill.guitarSkill;
    const old = skillComparedSkill.skill;

    result.hot = compareSkillHalf(result.hot, old.hot);
    result.other = compareSkillHalf(result.other, old.other);

    const skillPointDiff = (
      Number(result.hot.point || 0) +
      Number(result.other.point || 0) -
      Number(old.hot.point || 0) -
      Number(old.other.point || 0)
    ).toFixed(2);

    return {
      ...skill,
      skill: result,
      skillPointDiff
    };
  }
}

function compareSkillHalf(current, old) {
  let result = Object.assign({}, current);

  if (!current.data || !old.data) {
    return result;
  }

  if (result) {
    result.data.forEach(item => {
      let newSkillFlag = true;
      for (let i = 0; i < old.data.length; i++) {
        if (
          old.data[i].name === item.name ||
          OLD_NAME_MAP[old.data[i].name] === item.name
        ) {
          newSkillFlag = false;
          const newSkill = Number(item.skill_value);
          const oldSkill = Number(old.data[i].skill_value);
          if (newSkill > oldSkill) {
            const sub = (newSkill - oldSkill).toFixed(2);
            item.compare = `${sub}↑`;
          }
          break;
        }
      }
      if (newSkillFlag) {
        item.compare = "New!";
      }
    });
  }

  return result;
}
