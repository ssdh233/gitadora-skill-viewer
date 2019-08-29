import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachMoney from "@material-ui/icons/AttachMoney";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Language from "@material-ui/icons/Language";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";

import useLocalStorage from "./useLocalStorage";

const VERSION = "v1.18.3";

function AppHeader(props) {
  const [listAnchorEl, setListAnchorEl] = useState();
  const [langAnchorEl, setLangAnchorEl] = useState();
  const [kasegiAnchorEl, setKasegiAnchorEl] = useState();

  const sharedSongsPageType = useLocalStorage("sharedSongsPage", "g");
  const isPC = useMediaQuery("(min-width:742px)");

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`Version: ${VERSION}`);
  }, []);

  const {
    match: {
      url,
      params: { locale }
    },
    location: { search }
  } = props;

  return (
    <AppHeaderDiv>
      <Helmet htmlAttributes={{ lang: locale }}>
        <meta charSet="utf-8" />
        <link
          rel="canonical"
          href={`http://gsv.fun/${locale}${url.substring(3)}`}
        />
        {["ja", "en", "zh"].map(hrefLocale => (
          <link
            key={hrefLocale}
            rel="alternate"
            hrefLang={hrefLocale}
            href={`http://gsv.fun/${hrefLocale}${url.substring(3)}`}
          />
        ))}
      </Helmet>

      <FirstLineDiv>
        <Title>
          <Link to={`/${locale}`}>Gitadora Skill Viewer</Link>
        </Title>
        <Button
          onClick={event => setLangAnchorEl(event.target)}
          style={{ width: 109 }}
          id="lang-button"
          aria-haspopup={true}
        >
          <Language />
          <span style={{ marginLeft: 5, whiteSpace: "nowrap" }}>
            <FormattedMessage id="lang" />
          </span>
        </Button>
        <Popover
          open={Boolean(langAnchorEl)}
          anchorEl={langAnchorEl}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom"
          }}
          onClose={() => setLangAnchorEl(null)}
          onClick={() => setLangAnchorEl(null)}
        >
          <MenuList>
            <a href={`/en${url.substring(3)}${search}`}>
              <MenuItem>English</MenuItem>
            </a>
            <a href={`/ja${url.substring(3)}${search}`}>
              <MenuItem>日本語</MenuItem>
            </a>
            <a href={`/zh${url.substring(3)}${search}`}>
              <MenuItem>简体中文</MenuItem>
            </a>
          </MenuList>
        </Popover>
      </FirstLineDiv>

      <SecondLineDiv>
        {isPC && (
          <Link
            to={`/${locale}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button id="home-button" aria-haspopup={true}>
              <HomeIcon />
              <span style={{ marginLeft: 5 }}>
                <FormattedMessage id="home" />
              </span>
            </Button>
          </Link>
        )}
        <ButtonLink to={`/${locale}/shared/${sharedSongsPageType}`}>
          <Button id="shared-button" aria-haspopup={true}>
            <MusicNoteIcon />
            <span style={{ marginLeft: 5 }}>
              <FormattedMessage id="sharedSongs.title" />
            </span>
          </Button>
        </ButtonLink>
        <Button
          id="kasegi-button"
          onClick={event => setKasegiAnchorEl(event.target)}
          aria-haspopup={true}
        >
          <AttachMoney />
          <span style={{ marginLeft: 5 }}>
            <FormattedMessage id="kasegiSong" />
          </span>
        </Button>
        <Popover
          open={Boolean(kasegiAnchorEl)}
          anchorEl={kasegiAnchorEl}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom"
          }}
          onClose={() => setKasegiAnchorEl(null)}
          onClick={() => setKasegiAnchorEl(null)}
          PaperProps={{
            style: {
              display: "flex"
            }
          }}
        >
          <List dense>
            <ListSubheader component="div" style={{ backgroundColor: "#fff" }}>
              Drummania
            </ListSubheader>
            <Link to={`/${locale}/exchain/kasegi/d/9000`}>
              <ListItem button>
                <ListItemText primary="9000 ~" />
              </ListItem>
            </Link>
            {[...Array(12).keys()].reverse().map(key => {
              const skill = 3000 + key * 500;
              return (
                <Link key={key} to={`/${locale}/exchain/kasegi/d/${skill}`}>
                  <ListItem button>
                    <ListItemText primary={`${skill} ~`} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
          <List dense>
            <ListSubheader component="div" style={{ backgroundColor: "#fff" }}>
              Guitarfreaks
            </ListSubheader>
            <Link to={`/${locale}/exchain/kasegi/g/9000`}>
              <ListItem button>
                <ListItemText primary="9000 ~" />
              </ListItem>
            </Link>
            {[...Array(12).keys()].reverse().map(key => {
              const skill = 3000 + key * 500;
              return (
                <Link key={key} to={`/${locale}/exchain/kasegi/g/${skill}`}>
                  <ListItem button>
                    <ListItemText primary={`${skill} ~`} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Popover>
        <Button
          id="list-button"
          aria-haspopup={true}
          onClick={event => setListAnchorEl(event.target)}
        >
          <FormatListBulleted />
          <span style={{ marginLeft: 5 }}>
            <FormattedMessage id="list" />
          </span>
        </Button>
        <Popover
          id="list-popover"
          open={Boolean(listAnchorEl)}
          anchorEl={listAnchorEl}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom"
          }}
          onClose={() => setListAnchorEl(null)}
          onClick={() => setListAnchorEl(null)}
        >
          <MenuList>
            <Link to={`/${locale}/exchain/list`}>
              <MenuItem>EXCHAIN</MenuItem>
            </Link>
            <Link to={`/${locale}/matixx/list`}>
              <MenuItem>Matixx</MenuItem>
            </Link>
            <Link to={`/${locale}/tbre/list`}>
              <MenuItem>Tri-Boost Re</MenuItem>
            </Link>
            <Link to={`/${locale}/tb/list`}>
              <MenuItem>Tri-Boost</MenuItem>
            </Link>
          </MenuList>
        </Popover>
      </SecondLineDiv>
    </AppHeaderDiv>
  );
}

const AppHeaderDiv = styled.div`
  font-family: verdana;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  border-bottom: 2px solid;
`;

const FirstLineDiv = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.h1`
  flex-grow: 1;
  font-size: 32px;
  font-family: Andada;
  font-weight: bold;
  margin: 0;

  @media (max-width: 742px) {
    width: "100%";
    font-size: 24px;
  }

  & > a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);

    &:visited {
      color: rgba(0, 0, 0, 0.87);
    }
  }
`;

const SecondLineDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
`;

export default injectIntl(AppHeader);
