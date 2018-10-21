import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";

import FlatButton from "material-ui/FlatButton";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Popover from "material-ui/Popover";

import SlideToggle from "./SlideToggle.jsx";

//import styles from "./Index.modules.scss";

const VERSION = "v1.8.0";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: {
        open: false
      },
      lang: {
        open: false
      }
    };
  }

  // TODO extract i18n function to an independent component
  componentWillMount() {
    // if (
    //   this.props.match.params.locale &&
    //   this.props.match.params.locale !== i18n.language
    // ) {
    //   i18n.changeLanguage(this.props.match.params.locale);
    // }
  }

  componentWillReceiveProps(newProps) {
    // if (
    //   newProps.match.params.locale &&
    //   newProps.match.params.locale !== i18n.language
    // ) {
    //   i18n.changeLanguage(newProps.match.params.locale);
    //   // TODO try to close it after clicking. It should not be done here.
    //   this.handleLangRequestClose();
    // }
  }

  // TODO update mui version
  // for list button
  handleListButtonClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      list: {
        open: true,
        anchorEl: event.currentTarget
      }
    });
  };

  handleListRequestClose = () => {
    this.setState({
      list: {
        open: false
      }
    });
  };

  // for language switch button
  handleLangButtonClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      lang: {
        open: true,
        anchorEl: event.currentTarget
      }
    });
  };

  handleLangRequestClose = () => {
    this.setState({
      lang: {
        open: false
      }
    });
  };

  render() {
    const {
      intl: { formatMessage }
    } = this.props;

    const styles = {};

    return (
      <div className={styles.indexPage}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={`${formatMessage({ id: "intro.desc" })} ${formatMessage({
              id: "desc.3rd"
            }).substring(2)}`}
          />
          <link rel="canonical" href={"123"} />
          <link
            rel="alternate"
            hreflang={
              {
                ja: "ja",
                en: "en",
                cn: "zh"
              }["ja"] || "x-default"
            }
            href={"123"}
          />
          <title>Gitadora Skill Viewer</title>
        </Helmet>
        <div className={styles.header}>
          <span className={styles.title}>
            Gitadora Skill Viewer
            <span className={styles.version}>{VERSION}</span>
          </span>
          <span className={styles.buttons}>
            <FlatButton
              onTouchTap={this.handleListButtonClick}
              label={<FormattedMessage id="list" />}
              labelPosition="before"
              icon={<i className="fa fa-list-ul" />}
            />
            <Popover
              open={this.state.list.open}
              anchorEl={this.state.list.anchorEl}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom"
              }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
              onRequestClose={this.handleListRequestClose}
            >
              <Menu>
                <a href="/exchain/list">
                  <MenuItem primaryText="EXCHAIN" />
                </a>
                <a href="/matixx/list">
                  <MenuItem primaryText="Matixx" />
                </a>
                <a href="/tbre/list">
                  <MenuItem primaryText="Tri-Boost Re" />
                </a>
                <a href="/tb/list">
                  <MenuItem primaryText="Tri-Boost" />
                </a>
              </Menu>
            </Popover>
            <FlatButton
              onTouchTap={this.handleLangButtonClick}
              label={<FormattedMessage id="lang" />}
              labelPosition="before"
              icon={<i className="fa fa-language" />}
            />
            <Popover
              open={this.state.lang.open}
              anchorEl={this.state.lang.anchorEl}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom"
              }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
              onRequestClose={this.handleLangRequestClose}
            >
              <Menu onItemTouchTap={this.handleLangRequestClose}>
                <a href="/ssr/en">
                  <MenuItem primaryText="English" value="en" />
                </a>
                <a href="/ssr/ja">
                  <MenuItem primaryText="日本語" value="ja" />
                </a>
                <a href="/ssr/zh">
                  <MenuItem primaryText="简体中文" value="cn" />
                </a>
              </Menu>
            </Popover>
          </span>
        </div>
        <SlideToggle
          defaultOpen={true}
          title={<FormattedMessage id="intro.title" />}
        >
          <p> {<FormattedMessage id="intro.desc" />} </p>
          <h3>{<FormattedMessage id="intro.info.title" />}</h3>
          <p>
            <FormattedHTMLMessage id="intro.info.content" />
          </p>
        </SlideToggle>
        <SlideToggle
          defaultOpen={true}
          title={<FormattedMessage id="how.title" />}
        >
          <SlideToggle
            defaultOpen={false}
            title={<FormattedMessage id="how.upload.title" />}
            level={2}
          >
            <p> {<FormattedMessage id="how.upload.step1.desc" />}</p>
            <p> For GITADORA EXCHAIN </p>
            <div className={styles.script}>
              {
                "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_exchain.js';d.head.appendChild(s);}(document));"
              }
            </div>
            <p> For GITADORA Matixx </p>
            <div className={styles.script}>
              {
                "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_matixx.js';d.head.appendChild(s);}(document));"
              }
            </div>
            <p> For GITADORA Tri-Boost Re:EVOLVE </p>
            <div className={styles.script}>
              {
                "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_tbre.js';d.head.appendChild(s);}(document));"
              }
            </div>
            <p>
              <img
                src={"image/" + formatMessage({ id: "how.upload.step1.img" })}
              />
            </p>
            <p>
              <FormattedHTMLMessage id="how.upload.step2.desc" />
            </p>
            <img
              src={"image/" + formatMessage({ id: "how.upload.step2.img" })}
              width="80%"
            />
            <p>
              <FormattedHTMLMessage id="how.upload.step3.desc" />
            </p>
            <img
              src={"image/" + formatMessage({ id: "how.upload.step3.img" })}
              width="80%"
            />
          </SlideToggle>
          <SlideToggle
            title={<FormattedMessage id="how.save.title" />}
            level={2}
          >
            <p> {<FormattedMessage id="how.save.step1.desc" />} </p>
            <p>
              <img
                src={"image/" + formatMessage({ id: "how.save.step1.img1" })}
              />
            </p>
            <p>
              <img
                src={"image/" + formatMessage({ id: "how.save.step1.img2" })}
              />
            </p>
            <p>
              <FormattedHTMLMessage id="how.save.step2.desc" />
            </p>
            <p>
              <img
                src={"image/" + formatMessage({ id: "how.save.step2.img" })}
                width="80%"
              />
            </p>
          </SlideToggle>
        </SlideToggle>
        <SlideToggle title={formatMessage({ id: "desc.title" })}>
          <p>
            <FormattedHTMLMessage id="desc.1st" />
          </p>
          <p>
            <FormattedHTMLMessage id="desc.2nd" />
          </p>
          <p>
            <FormattedHTMLMessage id="desc.3rd" />
          </p>
        </SlideToggle>
        <SlideToggle title={<FormattedMessage id="other.title" />}>
          <p>
            {"★" + formatMessage({ id: "other.code.title" }) + "："}
            <a
              href="https://github.com/matsumatsu233/gitadora-skill-viewer"
              target="_blank"
            >
              Github
            </a>
          </p>
          <p>
            {"★"}
            <FormattedMessage id="other.voice.title" />
            {"："}
            <a href="https://matsumatsu233.github.io/gsv/" target="_blank">
              My Blog
            </a>
          </p>
          <p>
            <FormattedMessage id="other.voice.desc1" />
          </p>
          <p>
            {"★"}
            <FormattedMessage id="other.browser.title" />
          </p>
          <p> Chrome, Safari </p>
        </SlideToggle>
      </div>
    );
  }
}

export default injectIntl(Index);
