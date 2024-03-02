import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import LazyLoad from "react-lazyload";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import BookmarkletScript from "./BookmarkletScript.jsx";
import SlideToggle from "./SlideToggle.jsx";
import { CURRENT_VERSION } from "../constants";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listAnchorEl: null,
      langAnchorEl: null,
      snackbarOpen: false,
      gsvId: null,
      gsvName: ""
    };
  }

  componentDidMount() {
    const gsvId = localStorage.getItem("gsvId");
    const gsvName = localStorage.getItem("gsvName");
    if (gsvId) {
      this.setState({
        snackbarOpen: true,
        gsvId,
        gsvName
      });
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
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
      <IndexPageContainer>
        <Helmet>
          <link rel="canonical" href={`http://gsv.fun/${locale}`} />
          <title>{formatMessage({ id: "title" })}</title>
          <meta
            name="description"
            content={`${formatMessage({ id: "intro.desc" })} ${formatMessage({
              id: "desc.3rd"
            }).substring(2)}`}
          />
        </Helmet>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbarOpen}
          action={
            <div>
              <Link to={`/${locale}/${CURRENT_VERSION}/${this.state.gsvId}/g`}>
                <Button color="secondary" size="small">
                  <FormattedMessage id="snackbar.yes" />
                </Button>
              </Link>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackbarClose}
              >
                <FormattedMessage id="snackbar.no" />
              </Button>
            </div>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              <FormattedMessage
                id="snackbar.message"
                values={{ name: this.state.gsvName }}
              />
            </span>
          }
        />
        <SlideToggle
          defaultOpen={true}
          title={<FormattedMessage id="intro.title" />}
        >
          <p>{<FormattedMessage id="intro.desc" />}</p>
          <h3>{<FormattedMessage id="intro.info.title" />}</h3>
          <ul>
            <li>
              <FormattedMessage
                id="intro.info.content1"
                values={{
                  a: str => (
                    <Link to={`/${locale}/${CURRENT_VERSION}/kasegi_old`}>
                      {str}
                    </Link>
                  )
                }}
              />
            </li>
            <li>
              <FormattedHTMLMessage id="intro.info.content2" />
            </li>
          </ul>
        </SlideToggle>
        <SlideToggle title={<FormattedMessage id="how.title" />}>
          <p>{<FormattedMessage id="how.upload.step1.desc" />}</p>
          <p style={{ fontSize: 14 }}>
            {<FormattedMessage id="how.upload.step1.remark" />}
          </p>
          <div>
            <FormattedMessage id="how.upload.step1.currentVersion" />
            <span style={{ fontSize: 14, marginLeft: 20 }}>
              <FormattedMessage id="how.upload.step1.currentVersionDesc" />
            </span>
          </div>
          <BookmarkletScript />
          <LazyLoad height={532}>
            <ImageContainer style={{ marginTop: 20 }}>
              <Image src="/image/1-1.jpg" />
              <ImageDesc
                style={{
                  left: 118,
                  top: 61
                }}
              >
                <FormattedHTMLMessage id="how.upload.step1.imgDesc1" />
              </ImageDesc>
              <ImageDesc
                style={{
                  left: 65,
                  top: 131
                }}
              >
                <FormattedHTMLMessage id="how.upload.step1.imgDesc2" />
              </ImageDesc>
            </ImageContainer>
          </LazyLoad>
          <p>
            <FormattedHTMLMessage id="how.upload.step2.desc" />
          </p>
          <LazyLoad height={451}>
            <ImageContainer>
              <Image src="/image/1-2.jpg" />
              <ImageDesc
                style={{
                  left: 298,
                  top: 66
                }}
              >
                <FormattedHTMLMessage id="how.upload.step2.imgDesc1" />
              </ImageDesc>
              <ImageDesc style={{ left: 116, top: 106 }}>
                <FormattedHTMLMessage id="how.upload.step2.imgDesc2" />
              </ImageDesc>
            </ImageContainer>
          </LazyLoad>
          <p>
            <FormattedHTMLMessage id="how.upload.step3.desc" />
          </p>
          <LazyLoad height={479}>
            <ImageContainer>
              <Image src="/image/1-3.jpg" />
              <ImageDesc style={{ left: 284, top: 70 }}>
                <FormattedHTMLMessage id="how.upload.step3.imgDesc1" />
              </ImageDesc>
            </ImageContainer>
          </LazyLoad>
        </SlideToggle>
        <SlideToggle title={formatMessage({ id: "desc.title" })}>
          <p>
            <FormattedHTMLMessage id="desc.1st" />
          </p>
          <p>
            <FormattedHTMLMessage id="desc.2nd" />
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
            <Link to={`${locale}/uservoice`}>User Voice</Link>
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
      </IndexPageContainer>
    );
  }
}

const IndexPageContainer = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  color: ${({ theme }) => theme.index.imageDesc};
  whitespace: nowrap;
`;

const Image = styled.img`
  opacity: ${({ theme }) => theme.index.imageOpacity};
`;

const ImageDesc = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.index.imageDesc};
  background: ${({ theme }) => theme.index.imageDescBg};
`;

export default injectIntl(Index);
