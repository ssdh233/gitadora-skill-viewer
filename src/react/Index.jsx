import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import Radium from "radium";

import SlideToggle from "./SlideToggle.jsx";
import AppHeader from "./AppHeader.jsx";

class Index extends React.Component {
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
      intl: { formatMessage },
      match: {
        params: { locale }
      }
    } = this.props;

    return (
      <div style={styles.indexPage}>
        <Helmet>
          <link rel="canonical" href={`http://gsv.fun/${locale}`} />
          <title>{formatMessage({ id: "title" })}</title>
        </Helmet>
        <AppHeader match={this.props.match} />
        <SlideToggle
          defaultOpen={true}
          title={<FormattedMessage id="intro.title" />}
        >
          <p> {<FormattedMessage id="intro.desc" />} </p>
          <h3>{<FormattedMessage id="intro.info.title" />}</h3>
          <p>
            <FormattedHTMLMessage id="intro.info.content" />
          </p>
          <div>
            <h4>
              <FormattedHTMLMessage id="kasegi.title" />
              {" Drummania"}
            </h4>
            <div style={styles.kasegiLinkDiv}>
              <a
                style={styles.kasegiLink}
                href={`/${locale}/exchain/kasegi/d/9000`}
              >
                9000 ~
              </a>
              {[...Array(12).keys()].reverse().map(key => {
                const scope = `${3000 + key * 500} ~ ${3500 + key * 500}`;
                return (
                  <a
                    style={styles.kasegiLink}
                    key={key}
                    href={`/${locale}/exchain/kasegi/d/${3000 + key * 500}`}
                  >
                    {scope}
                  </a>
                );
              })}
            </div>
            <h4>
              <FormattedHTMLMessage id="kasegi.title" />
              {" Guitarfreaks"}
            </h4>
            <div style={styles.kasegiLinkDiv}>
              <a
                style={styles.kasegiLink}
                href={`/${locale}/exchain/kasegi/g/9000`}
              >
                9000 ~
              </a>
              {[...Array(12).keys()].reverse().map(key => {
                const scope = `${3000 + key * 500} ~ ${3500 + key * 500}`;
                return (
                  <a
                    style={styles.kasegiLink}
                    key={key}
                    href={`/${locale}/exchain/kasegi/g/${3000 + key * 500}`}
                  >
                    {scope}
                  </a>
                );
              })}
            </div>
          </div>
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
            <div style={styles.script}>
              {
                "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_exchain.js';d.head.appendChild(s);}(document));"
              }
            </div>
            <p> For GITADORA Matixx </p>
            <div style={styles.script}>
              {
                "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_matixx.js';d.head.appendChild(s);}(document));"
              }
            </div>
            <p> For GITADORA Tri-Boost Re:EVOLVE </p>
            <div style={styles.script}>
              {
                "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_tbre.js';d.head.appendChild(s);}(document));"
              }
            </div>
            <div
              style={{
                marginTop: 20,
                ...styles.imageContainer
              }}
            >
              <img src="/image/1-1.jpg" />
              <b style={{ position: "absolute", left: 118, top: 61 }}>
                <FormattedHTMLMessage id="how.upload.step1.imgDesc1" />
              </b>
              <b
                style={{
                  position: "absolute",
                  left: 65,
                  top: 131,
                  backgroundColor: "#FFFFFF"
                }}
              >
                <FormattedHTMLMessage id="how.upload.step1.imgDesc2" />
              </b>
            </div>
            <p>
              <FormattedHTMLMessage id="how.upload.step2.desc" />
            </p>
            <div style={styles.imageContainer}>
              <img src="/image/1-2.jpg" />
              <b
                style={{
                  position: "absolute",
                  left: 298,
                  top: 66
                }}
              >
                <FormattedHTMLMessage id="how.upload.step2.imgDesc1" />
              </b>
              <b style={{ position: "absolute", left: 116, top: 106 }}>
                <FormattedHTMLMessage id="how.upload.step2.imgDesc2" />
              </b>
            </div>
            <p>
              <FormattedHTMLMessage id="how.upload.step3.desc" />
            </p>
            <div style={styles.imageContainer}>
              <img src="/image/1-3.jpg" />
              <b style={{ position: "absolute", left: 284, top: 70 }}>
                <FormattedHTMLMessage id="how.upload.step3.imgDesc1" />
              </b>
            </div>
          </SlideToggle>
          <SlideToggle
            title={<FormattedMessage id="how.save.title" />}
            level={2}
          >
            <p>{<FormattedMessage id="how.save.step1.desc" />}</p>
            <img src="/image/2-1.jpeg" />
            <img src="/image/2-2.jpeg" />
            <p>
              <FormattedHTMLMessage id="how.save.step2.desc" />
            </p>
            <div style={styles.imageContainer}>
              <img src="/image/2-3.jpg" />
              <b style={{ position: "absolute", left: 256, top: 73 }}>
                <FormattedHTMLMessage id="how.save.step2.imgDesc1" />
              </b>
            </div>
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
              rel="noreferrer noopener"
            >
              Github
            </a>
          </p>
          <p>
            {"★"}
            <FormattedMessage id="other.voice.title" />
            {"："}
            <a
              href="https://matsumatsu233.github.io/gsv/"
              target="_blank"
              rel="noreferrer noopener"
            >
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

const styles = {
  indexPage: {
    fontFamily: "verdana",
    width: "100%"
  },
  script: {
    background: "#f6f6f6",
    padding: 20,
    borderRadius: 6,
    fontSize: "80%",
    wordBreak: "break-all"
  },
  imageContainer: {
    position: "relative",
    color: "red",
    whiteSpace: "nowrap"
  },
  kasegiLinkDiv: {
    display: "flex",
    whiteSpace: "nowrap",
    flexWrap: "wrap"
  },
  kasegiLink: {
    marginRight: 10
  }
};

export default injectIntl(Radium(Index));
