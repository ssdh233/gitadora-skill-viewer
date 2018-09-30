import React from "react";
import { Link } from "react-router";
import { translate, Interpolate } from "react-i18next";
import i18n from "./i18n";
import { Helmet } from "react-helmet";

import FlatButton from "material-ui/FlatButton";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Popover from "material-ui/Popover";

import SlideToggle from "./SlideToggle.jsx";

import styles from "./Index.modules.scss";

const VERSION = "v1.7.1";

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

  handleLangChange = (event, value) => {
    i18n.changeLanguage(value);
    this.setState({
      lang: {
        open: false
      }
    });
  };

  render() {
    const { t } = this.props;

    return (
      <div className={styles.indexPage}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={`${t("intro.desc")}${t("desc.3rd").substring(2)}`}
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
              label={t("list")}
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
              <Menu onChange={this.handleLangChange}>
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
              label={t("lang")}
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
              <Menu onChange={this.handleLangChange}>
                <MenuItem primaryText="English" value="en" />
                <MenuItem primaryText="日本語" value="ja" />
                <MenuItem primaryText="简体中文" value="cn" />
              </Menu>
            </Popover>
          </span>
        </div>
        <SlideToggle defaultOpen={true} title={t("intro.title")}>
          <p> {t("intro.desc")} </p>
          <h3>{t("intro.info.title")}</h3>
          <p>
            <Interpolate
              i18nKey="intro.info.content"
              useDangerouslySetInnerHTML={true}
            />
          </p>
        </SlideToggle>
        <SlideToggle defaultOpen={true} title={t("how.title")}>
          <SlideToggle
            defaultOpen={false}
            title={t("how.upload.title")}
            level={2}
          >
            <p> {t("how.upload.step1.desc")}</p>
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
              <img src={"image/" + t("how.upload.step1.img")} />
            </p>
            <p>
              <Interpolate
                i18nKey="how.upload.step2.desc"
                useDangerouslySetInnerHTML={true}
              />
            </p>
            <img src={"image/" + t("how.upload.step2.img")} width="80%" />
            <p>
              <Interpolate
                i18nKey="how.upload.step3.desc"
                useDangerouslySetInnerHTML={true}
              />
            </p>
            <img src={"image/" + t("how.upload.step3.img")} width="80%" />
          </SlideToggle>
          <SlideToggle title={t("how.save.title")} level={2}>
            <p> {t("how.save.step1.desc")} </p>
            <p>
              <img src={"image/" + t("how.save.step1.img1")} />
            </p>
            <p>
              <img src={"image/" + t("how.save.step1.img2")} />
            </p>
            <p>
              <Interpolate
                i18nKey="how.save.step2.desc"
                useDangerouslySetInnerHTML={true}
              />
            </p>
            <p>
              <img src={"image/" + t("how.save.step2.img")} width="80%" />
            </p>
          </SlideToggle>
        </SlideToggle>
        <SlideToggle title={t("desc.title")}>
          <p>
            <Interpolate i18nKey="desc.1st" useDangerouslySetInnerHTML={true} />
          </p>
          <p>
            <Interpolate i18nKey="desc.2nd" useDangerouslySetInnerHTML={true} />
          </p>
          <p>
            <Interpolate i18nKey="desc.3rd" useDangerouslySetInnerHTML={true} />
          </p>
        </SlideToggle>
        <SlideToggle title={t("other.title")}>
          <p>
            {"★" + t("other.code.title") + "："}
            <a
              href="https://github.com/matsumatsu233/gitadora-skill-viewer"
              target="_blank"
            >
              Github
            </a>
          </p>
          <p>
            {"★" + t("other.voice.title") + "："}
            <a href="https://matsumatsu233.github.io/gsv/" target="_blank">
              My Blog
            </a>
          </p>
          <p> {t("other.voice.desc1")} </p>
          <p> {"★" + t("other.browser.title")} </p>
          <p> Chrome, Safari </p>
        </SlideToggle>
      </div>
    );
  }
}

export default translate(["common"])(Index);
