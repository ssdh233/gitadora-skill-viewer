import React, { useState } from "react";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";

import SlideToggle from "../SlideToggle.jsx";
import SearchBox from "./SearchBox.jsx";

function SharedSongsPage(props) {
  const [inputValue, setInputValue] = useState("");

  const {
    match: {
      params: { locale, type }
    },
    intl: { formatMessage },
    sharedSongData,
    sharedSongsLoading
  } = props;

  const { sharedSongs } = sharedSongData || {};

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href={`http://gsv.fun/${locale}/shared/${type}`}
        />
        <title>
          {formatMessage({ id: "sharedSongs.title" })} |
          {type === "d" ? " Drummania" : " GuitarFreaks"} | Gitadora Skill
          Viewer
        </title>
        <meta
          name="description"
          content={formatMessage({ id: "sharedSongs.desc" })}
        />
      </Helmet>
      <div>
        {type === "g" && (
          <>
            <span>GuitarFreaks/</span>
            <Link to={`/${locale}/shared/d`}>Drummania</Link>
          </>
        )}
        {type === "d" && (
          <>
            <Link to={`/${locale}/shared/g`}>GuitarFreaks</Link>
            <span>/Drummania</span>
          </>
        )}
      </div>
      <Title>
        <FormattedMessage id="sharedSongs.title" />
        {type === "d" ? " - Drummania" : " - GuitarFreaks"}
      </Title>

      <SearchArea>
        <SearchBox
          type={type}
          inputValue={inputValue}
          onChangeInputValue={setInputValue}
          onFetchSharedSongs={props.onFetchSharedSongs}
          suggestionsData={props.suggestionsData}
        />
        {sharedSongsLoading && <LoadingCircle />}
        {sharedSongs && sharedSongs.length === 0 && (
          <Paragraph>
            <FormattedMessage id="sharedSongs.noResults" />
          </Paragraph>
        )}
        {sharedSongs &&
          sharedSongs.length > 0 &&
          sharedSongs.map(
            (
              { playerId, playerName, gitadoraId, sharedSongs, updateDate },
              index
            ) => {
              return (
                <React.Fragment key={index}>
                  <ResultRoot>
                    <HalfLine>
                      <Link to={`/${locale}/exchain/${playerId}/${type}`}>
                        {playerName}
                      </Link>
                    </HalfLine>
                    <HalfLine>ギタドラID: {gitadoraId}</HalfLine>
                    <OneLine>
                      ギター：
                      {sharedSongs.g.map(song => (
                        <SongName key={song} searched={song === inputValue}>
                          {song}
                        </SongName>
                      ))}
                    </OneLine>
                    <OneLine>
                      ドラム：
                      {sharedSongs.d.map(song => (
                        <SongName key={song} searched={song === inputValue}>
                          {song}
                        </SongName>
                      ))}
                    </OneLine>
                    <OneLine>Updated at：{updateDate}</OneLine>
                  </ResultRoot>
                  {index !== sharedSongs.length - 1 && (
                    <Divider style={{ margin: "10px 0" }} />
                  )}
                </React.Fragment>
              );
            }
          )}
      </SearchArea>
      <SlideToggle
        defaultOpen
        title={<FormattedHTMLMessage id="sharedSongs.howToUse.title" />}
      >
        <ol>
          <li>
            <FormattedHTMLMessage id="sharedSongs.howToUse.step1" />
          </li>
          <li>
            <FormattedMessage
              id="sharedSongs.howToUse.step2"
              values={{
                /* eslint-disable-next-line react/display-name */
                a: msg => {
                  return (
                    <a
                      href={`https://p.eagate.573.jp/game/gfdm/gitadora_exchain/p/eam/setting/friend_edit.html?gtype=${
                        type === "g" ? "gf" : "dm"
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {msg}
                    </a>
                  );
                },
                /* eslint-disable-next-line react/display-name */
                strong: msg => <strong>{msg}</strong>
              }}
            />
          </li>
        </ol>
        <Image src="/image/addFriend.jpg" />
      </SlideToggle>
      <SlideToggle
        title={<FormattedHTMLMessage id="sharedSongs.howToShare.title" />}
      >
        <Paragraph>
          <FormattedMessage
            id="sharedSongs.howToShare.desc1"
            values={{
              /* eslint-disable-next-line react/display-name */
              a: msg => (
                <a
                  href="https://p.eagate.573.jp/game/gfdm/gitadora_exchain/p/eam/setting/recommend.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {msg}
                </a>
              ),
              /* eslint-disable-next-line react/display-name */
              strong: msg => <strong>{msg}</strong>
            }}
          />
          <br />
          <FormattedMessage
            id="sharedSongs.howToShare.desc2"
            values={{
              /* eslint-disable-next-line react/display-name */
              internallink: msg => <Link to={`/${locale}`}>{msg}</Link>
            }}
          />
        </Paragraph>
        <Paragraph>
          <FormattedHTMLMessage id="sharedSongs.howToShare.ps1" />
          <br />
          <FormattedHTMLMessage id="sharedSongs.howToShare.ps2" />
        </Paragraph>
        <Image src="/image/sharedSongEdit.jpg" />
      </SlideToggle>
      <SlideToggle
        defaultOpen
        title={<FormattedHTMLMessage id="sharedSongs.forum" />}
      >
        <FormattedHTMLMessage id="sharedSongs.forumDesc" />
      </SlideToggle>
      <div style={{ marginTop: 20 }} id="disqus_thread" />
    </>
  );
}

const Title = styled.h1`
  font-size: 19px;
`;

const SearchArea = styled.div`
  @media (min-width: 742px) {
    max-width: 600px;
  }
`;

const LoadingCircle = styled(CircularProgress)`
  position: relative;
  left: calc(50% - 30px);
`;

const ResultRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
`;

const HalfLine = styled.span`
  flex: 1 50%;
`;

const OneLine = styled.span`
  flex: 1 100%;
`;

const SongName = styled.span`
  font-weight: ${props => (props.searched ? "bold" : "normal")};

  &:not(:last-child)::after {
    content: ", ";
  }
`;

const Paragraph = styled.p`
  margin: 1em;
`;

const Image = styled.img`
  width: 100%;

  @media (min-width: 742px) {
    max-width: 600px;
  }
`;

export default injectIntl(SharedSongsPage);
