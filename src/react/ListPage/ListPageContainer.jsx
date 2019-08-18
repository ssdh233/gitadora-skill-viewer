import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

import ListPage from "./ListPage.jsx";

const GET_LISTS = gql`
  fragment Point on SkillTable {
    hot {
      point
    }
    other {
      point
    }
  }

  query UserList($version: Version) {
    users(version: $version) {
      id
      playerName
      updateDate
      updateCount
      drumSkill {
        ...Point
      }
      guitarSkill {
        ...Point
      }
    }
  }
`;

function sumSkillPoint(skill) {
  let sum =
    (skill.hot ? parseFloat(skill.hot.point) : 0) +
    (skill.other ? parseFloat(skill.other.point) : 0);

  return sum.toFixed(2);
}

export default function ListPageContainer(props) {
  const { data, loading, error } = useQuery(GET_LISTS, {
    variables: { version: props.match.params.version },
    fetchPolicy: "network-only" // TODO
  });

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR: {error.toString()}</p>;

  return (
    <ListPage
      data={data.users.map(user => ({
        ...user,
        drumSkill: sumSkillPoint(user.drumSkill),
        guitarSkill: sumSkillPoint(user.guitarSkill)
      }))}
      version="tb"
      version_full="GITADORA Tri-Boost"
      match={props.match}
      isAdmin={props.isAdmin}
    />
  );
}
