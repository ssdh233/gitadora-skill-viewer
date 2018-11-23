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
              <Link
                style={styles.kasegiLink}
                to={`/${locale}/exchain/kasegi/d/9000`}
              >
                9000 ~
              </Link>
              {[...Array(12).keys()].reverse().map(key => {
                const scope = `${3000 + key * 500} ~ ${3500 + key * 500}`;
                return (
                  <Link
                    style={styles.kasegiLink}
                    key={key}
                    to={`/${locale}/exchain/kasegi/d/${3000 + key * 500}`}
                  >
                    {scope}
                  </Link>
                );
              })}
            </div>
            <h4>
              <FormattedHTMLMessage id="kasegi.title" />
              {" Guitarfreaks"}
            </h4>
            <div style={styles.kasegiLinkDiv}>
              <Link
                style={styles.kasegiLink}
                to={`/${locale}/exchain/kasegi/g/9000`}
              >
                9000 ~
              </Link>
              {[...Array(12).keys()].reverse().map(key => {
                const scope = `${3000 + key * 500} ~ ${3500 + key * 500}`;
                return (
                  <Link
                    style={styles.kasegiLink}
                    key={key}
                    to={`/${locale}/exchain/kasegi/g/${3000 + key * 500}`}
                  >
                    {scope}
                  </Link>
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
            <p>
              <img
                src={"/image/" + formatMessage({ id: "how.upload.step1.img" })}
              />
            </p>
            <p>
              <FormattedHTMLMessage id="how.upload.step2.desc" />
            </p>
            <img
              src={"/image/" + formatMessage({ id: "how.upload.step2.img" })}
              width="80%"
            />
            <p>
              <FormattedHTMLMessage id="how.upload.step3.desc" />
            </p>
            <img
              src={"/image/" + formatMessage({ id: "how.upload.step3.img" })}
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
                src={"/image/" + formatMessage({ id: "how.save.step1.img1" })}
              />
            </p>
            <p>
              <img
                src={"/image/" + formatMessage({ id: "how.save.step1.img2" })}
              />
            </p>
            <p>
              <FormattedHTMLMessage id="how.save.step2.desc" />
            </p>
            <p>
              <img
                src={"/image/" + formatMessage({ id: "how.save.step2.img" })}
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
