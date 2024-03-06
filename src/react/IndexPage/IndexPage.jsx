import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import styled, { withTheme } from "styled-components";

import SlideToggle from "../SlideToggle.jsx";
import { CURRENT_VERSION } from "../../constants";
import HowToUseSection from "./HowToUseSection.jsx";
import OtherSection from "./OtherSection.jsx";

function IndexPage(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [gsvId, setGsvId] = useState("");
  const [gsvName, setGsvName] = useState("");
  const [highlightOldLinks, setHighlightOldLinks] = useState(false);

  useEffect(() => {
    const gsvId = localStorage.getItem("gsvId");
    const gsvName = localStorage.getItem("gsvName");
    if (gsvId) {
      setSnackbarOpen(true);
      setGsvId(gsvId);
      setGsvName(gsvName);
    }
  }, []);

  const {
    intl: { formatMessage },
    match: {
      params: { locale }
    }
  } = props;

  return (
    <IndexPageContainer>
      <Helmet>
        <link rel="canonical" href={`http://gsv.fun/${locale}`} />
        <title>{formatMessage({ id: "title" })}</title>
        <meta
          name="description"
          content={`${formatMessage({
            id: "intro.desc"
          })} ${formatMessage({
            id: "desc.3rd"
          }).substring(2)}`}
        />
      </Helmet>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        action={
          <div>
            <Link to={`/${locale}/${CURRENT_VERSION}/${gsvId}/g`}>
              <Button color="secondary" size="small">
                <FormattedMessage id="snackbar.yes" />
              </Button>
            </Link>
            <Button color="secondary" size="small" onClick={() => setSnackbarOpen(false)}>
              <FormattedMessage id="snackbar.no" />
            </Button>
          </div>
        }
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            <FormattedMessage id="snackbar.message" values={{ name: gsvName }} />
          </span>
        }
      />
      <SlideToggle defaultOpen={true} title={<FormattedMessage id="intro.title" defaultMessage="なにこれ?" />}>
        <p>
          {
            <FormattedMessage
              id="intro.desc"
              defaultMessage="コナミ様の公式サイトからギタドラのスキルデータを取得し、スキルの進捗を記録したり、スキル表を他のプレイヤーをシェアしたりするためのウェブサイトです。"
            />
          }
        </p>
        <h3>{<FormattedMessage id="intro.info.title" defaultMessage="お知らせ" />}</h3>
        <ul>
          <li>
            <FormattedMessage
              id="intro.info.content1"
              values={{
                a: str => (
                  <Link
                    onClick={() => {
                      let highlightDelay = 200;
                      if (document.getElementById("old-links-p").parentNode.style.display === "none") {
                        document.getElementById("otherSlideToggle").click();
                        highlightDelay = 400;
                      }
                      setTimeout(() => {
                        document.getElementById("old-links-p").scrollIntoView();
                        setHighlightOldLinks(true);
                      }, highlightDelay);
                    }}
                  >
                    {str}
                  </Link>
                )
              }}
              defaultMessage="稼ぎ曲リストを250単位区切りにしました。昔の500単位バージョンは<a>こちら</a>でアクセスできます。"
            />
          </li>
          <li>
            <FormattedHTMLMessage
              id="intro.info.content2"
              defaultMessage="gsv.funの<a href='https://twitter.com/gsvfunsite'>ツイッターアカウント</a>を作りました。フォローしていただけると嬉しいです"
            />
          </li>
        </ul>
      </SlideToggle>
      <SlideToggle title={<FormattedMessage id="how.title" defaultMessage="使い方" />}>
        <HowToUseSection />
      </SlideToggle>
      <SlideToggle
        title={formatMessage({
          id: "desc.title"
        })}
      >
        <p>
          <FormattedHTMLMessage id="desc.1st" />
        </p>
        <p>
          <FormattedHTMLMessage id="desc.2nd" />
        </p>
      </SlideToggle>
      <SlideToggle title={<FormattedMessage id="other.title" />} titleId="otherSlideToggle">
        <OtherSection highlightOldLinks={highlightOldLinks} />
      </SlideToggle>
    </IndexPageContainer>
  );
}

const IndexPageContainer = styled.div`
  width: 100%;
`;

export default withTheme(injectIntl(IndexPage));
