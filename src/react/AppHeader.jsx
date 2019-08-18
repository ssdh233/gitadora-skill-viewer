import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Home from "@material-ui/icons/Home";
import AttachMoney from "@material-ui/icons/AttachMoney";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Language from "@material-ui/icons/Language";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const VERSION = "v1.16.0";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listAnchorEl: null,
      langAnchorEl: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(`Version: ${VERSION}`);
  }

  handleMenuButtonClick = id => event => {
    this.setState({
      [`${id}AnchorEl`]: event.currentTarget
    });
  };

  handleMenuClose = id => () => {
    this.setState({
      [`${id}AnchorEl`]: null
    });
  };

  render() {
    const {
      match: {
        url,
        params: { locale }
      },
      location: { search }
    } = this.props;

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
          <Title>Gitadora Skill Viewer</Title>

          <Button
            onClick={this.handleMenuButtonClick("lang")}
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
            open={Boolean(this.state.langAnchorEl)}
            anchorEl={this.state.langAnchorEl}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom"
            }}
            onClose={this.handleMenuClose("lang")}
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
          <Link
            to={`/${locale}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button id="home-button" aria-haspopup={true}>
              <Home />
              <span style={{ marginLeft: 5 }}>
                <FormattedMessage id="home" />
              </span>
            </Button>
          </Link>
          <Button
            id="kasegi-button"
            onClick={this.handleMenuButtonClick("kasegi")}
            aria-haspopup={true}
          >
            <AttachMoney />
            <span style={{ marginLeft: 5 }}>
              <FormattedMessage id="kasegiSong" />
            </span>
          </Button>
          <Popover
            open={Boolean(this.state.kasegiAnchorEl)}
            anchorEl={this.state.kasegiAnchorEl}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom"
            }}
            onClose={this.handleMenuClose("kasegi")}
            PaperProps={{
              style: {
                display: "flex"
              }
            }}
          >
            <List dense>
              <ListSubheader
                component="div"
                style={{ backgroundColor: "#fff" }}
              >
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
              <ListSubheader
                component="div"
                style={{ backgroundColor: "#fff" }}
              >
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
            onClick={this.handleMenuButtonClick("list")}
          >
            <FormatListBulleted />
            <span style={{ marginLeft: 5 }}>
              <FormattedMessage id="list" />
            </span>
          </Button>
          <Popover
            id="list-popover"
            open={Boolean(this.state.listAnchorEl)}
            anchorEl={this.state.listAnchorEl}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom"
            }}
            onClose={this.handleMenuClose("list")}
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

  @media (max-width: 742px) : {
    width: "100%";
    font-size: 24px;
  }
`;

const SecondLineDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default injectIntl(AppHeader);
