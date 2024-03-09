import React, { useState } from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import LazyLoad from "react-lazyload";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import BookmarkletScript from "./BookmarkletScript.jsx";
import styled, { withTheme } from "styled-components";
import { Alert } from "@material-ui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

function HowToUse(props) {
  const { theme } = props;

  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <p>{<FormattedMessage id="how.upload.step1.desc" defaultMessage="1.ブックマークに下記のスクリプトを登録" />}</p>
      <MuiAlert severity="warning">
        <FormattedHTMLMessage
          id="how.upload.step1.remark"
          defaultMessage="一部のブラウザ（safari、スマホのchromeとか）ではブックマークの新規作成ができませんが、とりあえず何かのウェブサイトをブックマークに登録して、登録したブックマークを編集して、スクリプトをURLアドレスのところに置き換えてもOKです。"
        />
      </MuiAlert>
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
              left: 108,
              top: 28
            }}
          >
            <FormattedHTMLMessage id="how.upload.step2.imgDesc1" />
          </ImageDesc>
          <ImageDesc style={{ left: 116, top: 106 }}>
            <FormattedHTMLMessage id="how.upload.step2.imgDesc2" />
          </ImageDesc>
        </ImageContainer>
      </LazyLoad>
      <MuiAlert severity="warning">
        <FormattedMessage
          id="how.upload.step2.androidWorkaround"
          defaultMessage="ブックマークをクリックして反応がなかった場合、お持ちのデバイス（特にAndroid機種が多い）はブックマークでのスクリプト実行をサポートしていない可能性があります。その場合は<steps>123</steps>という方法もあります。（<a>画像による説明 thanks@beit_soldier</a>）"
          values={{
            a: content => (
              <a href="https://twitter.com/beit_soldier/status/1384890899033825281" target="_blank" rel="noreferrer">
                {content}
              </a>
            ),
            code: content => <code>{content}</code>,
            steps: () => (
              <ol>
                <li>
                  <FormattedMessage
                    id="how.upload.step2.androidWorkaroundStep1"
                    defaultMessage="ギタドラの公式サイトにアクセスする"
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="how.upload.step2.androidWorkaroundStep2"
                    defaultMessage="上のスクリプトをブラウザのアドレスバーにコピーする"
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="how.upload.step2.androidWorkaroundStep3"
                    defaultMessage="<code>javascript:</code>を先頭に追加する<question>?</question>"
                    values={{
                      question: () => (
                        <HelpOutlineIcon
                          style={{
                            fontSize: 16,
                            cursor: "pointer",
                            color: theme.link
                          }}
                          onClick={() => setShowDialog(true)}
                        />
                      ),
                      code: content => <code>{content}</code>
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="how.upload.step2.androidWorkaroundStep4"
                    defaultMessage="エンターキーを押して実行する"
                  />
                </li>
              </ol>
            )
          }}
        />
      </MuiAlert>
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
      <MuiDialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogContent>
          <DialogContentText>
            <FormattedHTMLMessage id="how.upload.step2.androidWorkaroundDesc" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary" autoFocus>
            <FormattedMessage id="skill.skillIdOk" />
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
}

const MuiAlert = styled(Alert)`
  &&& {
    font-size: 14px;
    opacity: ${({ theme }) => theme.index.alertOpacity};
    margin: 16px;

    @media (max-width: 742px) {
      font-size: 12px;
      margin: 12px;
    }
  }
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

const MuiDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: ${({ theme }) => theme.mainBg};
  }

  & .MuiTypography-root {
    color: ${({ theme }) => theme.main};
  }

  & .MuiButtonBase-root {
    color: ${({ theme }) => theme.link};
  }
`;

export default withTheme(HowToUse);
