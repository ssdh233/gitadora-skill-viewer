import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

import SharedSongsPage from "./SharedSongsPage.jsx";

const FETCH_SHARED_SONGS = gql`
  query FetchSharedSongs($input: String, $type: GameType) {
    sharedSongs(input: $input, type: $type) {
      playerId
      playerName
      gitadoraId
      updateDate
      sharedSongs {
        g
        d
      }
    }
  }
`;

const FETCH_SUGGSTIONS = gql`
  query FetchSuggestions($type: GameType) {
    sharedSongSuggestions(type: $type)
  }
`;

function SharedSongsPageContainer(props) {
  const [
    fetchSharedSongs,
    { data: sharedSongsData, loading: sharedSongsLoading }
  ] = useLazyQuery(FETCH_SHARED_SONGS);

  const [fetchSuggestions, { data: suggestionsData }] = useLazyQuery(
    FETCH_SUGGSTIONS
  );

  const { type } = props.match.params;

  useEffect(() => {
    fetchSuggestions({
      variables: { type }
    });
  }, [type]);

  useEffect(() => {
    localStorage.setItem("sharedSongsPage", type);
  }, [type]);

  useEffect(() => {
    const {
      match: {
        url,
        params: { locale }
      }
    } = props;

    // eslint-disable-next-line no-unused-vars
    var disqus_config = function() {
      this.page.url = `http://gsv.fun/${locale}${url.substring(3)}`;
      this.page.identifier = "sharedSongs - " + type;
    };

    (function() {
      var d = document,
        s = d.createElement("script");
      s.src = "https://gsv-fun.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, [type]);

  return (
    <SharedSongsPage
      sharedSongData={sharedSongsData}
      sharedSongsLoading={sharedSongsLoading}
      suggestionsData={suggestionsData}
      match={props.match}
      onFetchSharedSongs={input =>
        fetchSharedSongs({
          variables: { input, type }
        })
      }
    />
  );
}

export default SharedSongsPageContainer;
