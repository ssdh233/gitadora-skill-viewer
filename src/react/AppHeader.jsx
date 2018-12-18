import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Radium from "radium";
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

const VERSION = "v1.10.6";

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
        params: { locale }
      }
    } = this.props;

    return (
      <div style={styles.appHeader}>
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href={`http://gsv.fun/${locale}`} />
          <link
            rel="alternate"
            hrefLang={
              {
                ja: "ja",
                en: "en",
                zh: "zh"
              }[locale] || "x-default"
            }
            href={`http://gsv.fun/${locale}`}
          />
        </Helmet>

        <div style={styles.firstLine}>
          <h1 style={styles.title}>Gitadora Skill Viewer</h1>

          <Button
            onClick={this.handleMenuButtonClick("lang")}
            style={{ width: 109 }}
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
              <a href="/en">
                <MenuItem>English</MenuItem>
              </a>
              <a href="/ja">
                <MenuItem>日本語</MenuItem>
              </a>
              <a href="/zh">
                <MenuItem>简体中文</MenuItem>
              </a>
            </MenuList>
          </Popover>
        </div>

        <div style={styles.secondLine}>
          <Link
            to={`/${locale}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button>
              <Home />
              <span style={{ marginLeft: 5 }}>
                <FormattedMessage id="home" />
              </span>
            </Button>
          </Link>
          <Button onClick={this.handleMenuButtonClick("kasegi")}>
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
          <Button onClick={this.handleMenuButtonClick("list")}>
            <FormatListBulleted />
            <span style={{ marginLeft: 5 }}>
              <FormattedMessage id="list" />
            </span>
          </Button>
          <Popover
            open={Boolean(this.state.listAnchorEl)}
            anchorEl={this.state.listAnchorEl}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom"
            }}
            onClose={this.handleMenuClose("list")}
          >
            <MenuList>
              <a href="/exchain/list">
                <MenuItem>EXCHAIN</MenuItem>
              </a>
              <a href="/matixx/list">
                <MenuItem>Matixx</MenuItem>
              </a>
              <a href="/tbre/list">
                <MenuItem>Tri-Boost Re</MenuItem>
              </a>
              <a href="/tb/list">
                <MenuItem>Tri-Boost</MenuItem>
              </a>
            </MenuList>
          </Popover>
        </div>
      </div>
    );
  }
}

const styles = {
  appHeader: {
    fontFamily: "verdana",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 5
  },
  firstLine: {
    display: "flex",
    width: "100%"
  },
  title: {
    flexGrow: 1,
    fontSize: 32,
    fontFamily: "Andada",
    fontWeight: "bold",
    margin: 0,

    "@media (max-width: 742px)": {
      width: "100%",
      fontSize: 24
    }
  },
  secondLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
};

export default injectIntl(Radium(AppHeader));
