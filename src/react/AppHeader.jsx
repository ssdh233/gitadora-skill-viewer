import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MuiMenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import AttachMoney from "@material-ui/icons/AttachMoney";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Language from "@material-ui/icons/Language";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import { ALL_VERSIONS, CURRENT_VERSION, VERSION_NAME } from "../constants";

const VERSION = "v1.31.0";

function AppHeader(props) {
  const [listAnchorEl, setListAnchorEl] = useState();
  const [langAnchorEl, setLangAnchorEl] = useState();
  const [kasegiAnchorEl, setKasegiAnchorEl] = useState();

  const isPC = useMediaQuery("(min-width:742px)");

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`Version: ${VERSION}`);
  }, []);

  const {
    match: {
      params: { locale }
    },
    location: { search, pathname }
  } = props;

  return (
    <AppHeaderDiv>
      <Helmet htmlAttributes={{ lang: locale }}>
        <meta charSet="utf-8" />
        <link
          rel="canonical"
          href={`http://gsv.fun/${locale}${pathname.substring(3)}`}
        />
        {["ja", "en", "zh", "ko"].map(hrefLocale => (
          <link
            key={hrefLocale}
            rel="alternate"
            hrefLang={hrefLocale}
            href={`http://gsv.fun/${hrefLocale}${pathname.substring(3)}`}
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
            <MenuItem component="a" href={`/en${pathname.substring(3)}${search}`}>English</MenuItem>
            <MenuItem component="a" href={`/ja${pathname.substring(3)}${search}`}>日本語</MenuItem>
            <MenuItem component="a" href={`/ko${pathname.substring(3)}${search}`}>한국어</MenuItem>
            <MenuItem component="a" href={`/zh${pathname.substring(3)}${search}`}>简体中文</MenuItem>
          </MenuList>
        </Popover>
      </FirstLineDiv>

      <SecondLineDiv>
        {isPC && (
          <ButtonLink to={`/${locale}`}>
            <Button id="home-button" aria-haspopup={true}>
              <HomeIcon />
              <span style={{ marginLeft: 5 }}>
                <FormattedMessage id="home" />
              </span>
            </Button>
          </ButtonLink>
        )}
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
            <ListSubheader component="div">
              Drummania
            </ListSubheader>
            <ListItem button component={Link} to={`/${locale}/${CURRENT_VERSION}/kasegi/d/9000`} >
              <ListItemText primary="9000 ~" />
            </ListItem>
            {[...Array(12).keys()].reverse().map(key => {
              const skill = 3000 + key * 500;
              return (
                <ListItem button component={Link} to={`/${locale}/${CURRENT_VERSION}/kasegi/d/${skill}`}>
                  <ListItemText primary={`${skill} ~`} />
                </ListItem>
              );
            })}
          </List>
          <List dense>
            <ListSubheader component="div">
              Guitarfreaks
            </ListSubheader>
            <ListItem button component={Link} to={`/${locale}/${CURRENT_VERSION}/kasegi/g/9000`} >
              <ListItemText primary="9000 ~" />
            </ListItem>
            {[...Array(12).keys()].reverse().map(key => {
              const skill = 3000 + key * 500;
              return (
                <ListItem button component={Link} to={`/${locale}/${CURRENT_VERSION}/kasegi/g/${skill}`}>
                  <ListItemText primary={`${skill} ~`} />
                </ListItem>
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
            {
              ALL_VERSIONS.map(version => (
                <MenuItem component={Link} to={`/${locale}/${version}/list`}>{VERSION_NAME[version].replace(":EVOLVE", "")}</MenuItem>
              ))
            }
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
  border-color: ${props => props.theme.primary};
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
    color: ${props => props.theme.primary};

    &:visited {
      color: ${props => props.theme.primary};
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

const MenuItem = styled(MuiMenuItem)`

`;

export default injectIntl(AppHeader);
