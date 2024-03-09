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
import AttachMoney from "@material-ui/icons/AttachMoney";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Language from "@material-ui/icons/Language";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import { CURRENT_VERSION } from "../constants";
import { versionInfo } from "graphql";
import { withTheme } from "styled-components";

const VERSION = "v1.36.2";

function AppHeader(props) {
  const [langAnchorEl, setLangAnchorEl] = useState();
  const [kasegiAnchorEl, setKasegiAnchorEl] = useState();

  const isPC = useMediaQuery("(min-width:742px)");

  useEffect(() => {
    console.log(`Version: ${VERSION}`);
  }, []);

  const {
    match: {
      params: { locale }
    },
    location: { search, pathname },
    setThemeKey,
    theme
  } = props;

  const isDark = theme.key === "dark";

  return (
    <AppHeaderDiv>
      <Helmet htmlAttributes={{ lang: locale }}>
        <meta charSet="utf-8" />
        <link rel="canonical" href={`http://gsv.fun/${locale}${pathname.substring(3)}`} />
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
        <RightTopButtons>
          <MuiIconButton
            size={isPC ? "" : "small"}
            onClick={() =>
              setThemeKey(key => {
                const newThemeKey = key === "default" ? "dark" : "default";
                document.cookie = `gsv_theme=${newThemeKey}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
                return newThemeKey;
              })
            }
          >
            {isDark ? (
              <BrightnessHighIcon fontSize={isPC ? "" : "small"} />
            ) : (
              <Brightness4Icon fontSize={isPC ? "" : "small"} />
            )}
          </MuiIconButton>
        </RightTopButtons>
      </FirstLineDiv>

      <SecondLineDiv>
        {isPC && (
          <Link
            to={`/${locale}`}
            style={{
              textDecoration: "none",
              color: "black"
            }}
          >
            <MuiButton size={isPC ? "" : "small"} id="home-button" aria-haspopup={true}>
              <HomeIcon fontSize={isPC ? "" : "small"} />
              <ButtonLabel>
                <FormattedMessage id="home" />
              </ButtonLabel>
            </MuiButton>
          </Link>
        )}
        <MuiButton
          size={isPC ? "" : "small"}
          id="kasegi-button"
          onClick={event => setKasegiAnchorEl(event.target)}
          aria-haspopup={true}
        >
          <AttachMoney fontSize={isPC ? "" : "small"} />
          <ButtonLabel>
            <FormattedMessage id="kasegiSong" />
          </ButtonLabel>
        </MuiButton>
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
              background: theme.header.popoverBg
            }
          }}
        >
          <List dense style={{ paddingTop: 0 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                position: "sticky",
                top: 0,
                zIndex: 1
              }}
            >
              <MuiListSubHeader component="div">Drum</MuiListSubHeader>
              <MuiListSubHeader component="div">Guitar</MuiListSubHeader>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                maxHeight: "50vh",
                paddingBottom: 20
              }}
            >
              {[...Array(27).keys()].reverse().map(key => {
                const skill = 3000 + key * 250;
                return (
                  <>
                    <Link key={key} to={`/${locale}/${CURRENT_VERSION}/kasegi/d/${skill}`}>
                      <ListItem button>
                        <ListItemText primary={`${skill} ~`} />
                      </ListItem>
                    </Link>
                    <Link key={key} to={`/${locale}/${CURRENT_VERSION}/kasegi/g/${skill}`}>
                      <ListItem button>
                        <ListItemText primary={`${skill} ~`} />
                      </ListItem>
                    </Link>
                  </>
                );
              })}
            </div>
          </List>
        </Popover>
        <Link to={`/${locale}/${CURRENT_VERSION}/list`} key={versionInfo}>
          <MuiButton size={isPC ? "" : "small"} id="list-button">
            <FormatListBulleted fontSize={isPC ? "" : "small"} />
            <ButtonLabel>
              <FormattedMessage id="list" />
            </ButtonLabel>
          </MuiButton>
        </Link>
        <MuiButton
          size={isPC ? "" : "small"}
          onClick={event => setLangAnchorEl(event.target)}
          id="lang-button"
          aria-haspopup={true}
        >
          <Language fontSize={isPC ? "" : "small"} />
          <ButtonLabel>
            <FormattedMessage id="lang" />
          </ButtonLabel>
        </MuiButton>
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
  border-bottom: 2px solid ${({ theme }) => theme.header.bottomLine};
`;

const FirstLineDiv = styled.div`
  display: flex;
  width: 100%;
  height: 36.5px;
`;

const RightTopButtons = styled.div`
  transform: translate(8px, -8px);

  @media (max-width: 742px) {
    transform: none;
  }
`;

const Title = styled.h1`
  flex-grow: 1;
  font-size: 28px;
  font-family: Andada;
  font-weight: bold;
  margin: 0;

  @media (max-width: 742px) {
    width: 100%;
    font-size: 22px;
  }

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.header.title};

    &:visited {
      color: ${({ theme }) => theme.header.title};
    }
  }
`;

const SecondLineDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MuiButton = styled(Button)`
  &&& {
    color: ${({ theme }) => theme.header.button};
  }
`;

const MuiIconButton = styled(IconButton)`
  &&& {
    color: ${({ theme }) => theme.header.button};
  }
`;

export const MuiMenuList = styled(MenuList)`
  & a {
    color: ${({ theme }) => theme.header.popover};
  }
`;

export const MuiMenuItem = styled(MenuItem)`
  &&&:hover {
    background: ${({ theme }) => theme.header.popoverHoverBg};
  }
`;

export const MuiListSubHeader = styled(ListSubheader)`
  &&& {
    color: ${({ theme }) => theme.header.popoverHeader};
    background: ${({ theme }) => theme.header.popoverBg};
  }
`;

const ButtonLabel = styled.span`
  margin-left: 5px;
  white-space: nowrap;
`;

export default withTheme(injectIntl(AppHeader));
