import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

import { OLD_NAME_MAP, CURRENT_VERSION } from "../../constants";
import queryParser from "../../modules/query";
import SkillPage from "./SkillPage.jsx";
import { useHistory } from "react-router";
import { injectIntl } from "react-intl";

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

const SAVE_SKILL = gql`
  mutation SaveSkill($version: Version, $data: SimpleUserInput, $playerId: Int, $type: GameType) {
    saveSkill(version: $version, data: $data, playerId: $playerId, type: $type)
  }
`

const omitTypename = (key, value) => (key === '__typename' ? undefined : value)

function SkillPageContainer(props) {
  const { locale, playerId, version, type } = props.match.params;
  const query = queryParser(props.location.search);
  const {
    intl: { formatMessage },
  } = props;


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

  const [saveSkill] = useMutation(SAVE_SKILL, {
    onCompleted: (data) => { 
      if (data.saveSkill >=0) {
        location.href = `/${locale}/${version}/${data.saveSkill}/p`;
      } else {
        alert(formatMessage({ id: "skill.alreadySaved" }));
      }
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

  const handleSaveSkill = () => {
    return saveSkill({variables: {
      playerId: parseInt(playerId),
      version,
      type,
      data: {
        playerName: data.user.playerName,
        updateDate: data.user.updateDate,
        drumSkill: JSON.parse(JSON.stringify(data.user.drumSkill), omitTypename),
        guitarSkill: JSON.parse(JSON.stringify(data.user.guitarSkill), omitTypename),
      }
    }})
  }

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR: {error.toString()}</p>;

  return (
    <SkillPage
      {...props}
      skillData={getSkillData(data.user, data.savedSkill, type)}
      rivalSkillData={getSkillData(data.rival, null, type)}
      hasComparedSkill={Boolean(data.savedSkill)}
      skillSavedList={data.savedSkills}
      onSaveSkill={handleSaveSkill}
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

export default injectIntl(SkillPageContainer);