import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Radium from "radium";
import { Helmet } from "react-helmet";

import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import AttachMoney from "@material-ui/icons/AttachMoney";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Language from "@material-ui/icons/Language";

const VERSION = "v1.10.4";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listAnchorEl: null,
      langAnchorEl: null
    };
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
        <h1 style={styles.title}>
          Gitadora Skill Viewer
          <span style={styles.version}>{VERSION}</span>
        </h1>
        <span style={styles.buttons}>
          <Button onClick={this.handleMenuButtonClick("kasegi")}>
            <span style={{ marginRight: 5 }}>
              <FormattedMessage id="kasegiSong" />
            </span>
            <AttachMoney />
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
                maxHeight: 400
              }
            }}
          >
            <MenuList>
              <Link to={`/${locale}/exchain/kasegi/d/9000`}>
                <MenuItem>Drummania 9000 ~</MenuItem>
              </Link>
              {[...Array(12).keys()].reverse().map(key => {
                const scope = `${3000 + key * 500} ~ ${3500 + key * 500}`;
                return (
                  <Link
                    key={key}
                    to={`/${locale}/exchain/kasegi/d/${3000 + key * 500}`}
                  >
                    <MenuItem>Drummania {scope}</MenuItem>
                  </Link>
                );
              })}
              <Link to={`/${locale}/exchain/kasegi/d/9000`}>
                <MenuItem>Guitarfreaks 9000 ~</MenuItem>
              </Link>
              {[...Array(12).keys()].reverse().map(key => {
                const scope = `${3000 + key * 500} ~ ${3500 + key * 500}`;
                return (
                  <Link
                    key={key}
                    to={`/${locale}/exchain/kasegi/g/${3000 + key * 500}`}
                  >
                    <MenuItem key={key}>Guitarfreaks {scope}</MenuItem>
                  </Link>
                );
              })}
            </MenuList>
          </Popover>
          <Button onClick={this.handleMenuButtonClick("list")}>
            <span style={{ marginRight: 5 }}>
              <FormattedMessage id="list" />
            </span>
            <FormatListBulleted />
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
          <Button onClick={this.handleMenuButtonClick("lang")}>
            <span style={{ marginRight: 5 }}>
              <FormattedMessage id="lang" />
            </span>
            <Language />
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
        </span>
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
  version: {
    fontSize: 16,

    "@media (max-width: 742px)": {
      fontSize: 12
    }
  },
  buttons: {
    marginTop: 10,

    "@media (max-width: 742px)": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
    }
  }
};

export default injectIntl(Radium(AppHeader));
