import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

import ListPage from "./ListPage.jsx";

const GET_LISTS = gql`
  query UserList($version: Version) {
    users(version: $version) {
      playerId
      playerName
      updateDate
      updateCount
      drumSkillPoint
      guitarSkillPoint
    }
  }
`;

export default function ListPageContainer(props) {
  const { data, loading, error } = useQuery(GET_LISTS, {
    variables: { version: props.match.params.version },
    fetchPolicy: "network-only" // TODO
  });

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR: {error.toString()}</p>;

  return (
    <ListPage
      data={data.users}
      version="tb"
      version_full="GITADORA Tri-Boost"
      match={props.match}
      isAdmin={props.isAdmin}
    />
  );
}
