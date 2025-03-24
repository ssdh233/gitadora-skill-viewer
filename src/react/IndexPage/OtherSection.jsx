import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";

import { MuiButton, MuiMenuItem, MuiMenuList } from "../AppHeader.jsx";
import styled, { withTheme } from "styled-components";
import { ListSubheader } from "@material-ui/core";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import { ALL_VERSIONS, CURRENT_VERSION, VERSION_NAME } from "../../constants.js";

function OtherSection(props) {
  const {
    theme,
    intl: { formatMessage },
    match: {
      params: { locale }
    }
  } = props;

  const [kasegiAnchorEl, setKasegiAnchorEl] = useState();
  const [listAnchorEl, setListAnchorEl] = useState();

  return (
    <>
      <p id="old-links-p">
        {"★"}
        <FormattedMessage id="other.oldLinks.title" defaultMessage="古いリンク" />
        <br />
        <MuiButton
          id="kasegi-old-button"
          onClick={event => setKasegiAnchorEl(event.currentTarget)}
          aria-haspopup={true}
        >
          <AttachMoney />
          <span style={{ marginLeft: 5 }}>
            <FormattedMessage id="kasegi.old" />
          </span>
        </MuiButton>
        <Popover
          open={Boolean(kasegiAnchorEl)}
          anchorEl={kasegiAnchorEl}
          onClose={() => setKasegiAnchorEl(null)}
          onClick={() => setKasegiAnchorEl(null)}
          PaperProps={{
            style: {
              background: theme.header.popoverBg
            }
          }}
        >
          <List dense style={{ paddingTop: 0, width: 160 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                position: "sticky",
                top: 0,
                zIndex: 1
              }}
            >
              <MuiListSubHeader component="div">Drum</MuiListSubHeader>
              <MuiListSubHeader component="div">Guitar</MuiListSubHeader>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                maxHeight: "50vh",
                paddingBottom: 20
              }}
            >
              {[...Array(13).keys()].reverse().map(key => {
                const skill = 3000 + key * 500;
                return (
                  <>
                    <Link key={key} to={`/${locale}/${CURRENT_VERSION}/kasegi_old/d/${skill}`}>
                      <ListItem button>
                        <ListItemText primary={`${skill} ~`} />
                      </ListItem>
                    </Link>
                    <Link key={key} to={`/${locale}/${CURRENT_VERSION}/kasegi_old/g/${skill}`}>
                      <ListItem button>
                        <ListItemText primary={`${skill} ~`} />
                      </ListItem>
                    </Link>
                  </>
                );
              })}
            </div>
          </List>
        </Popover>
        <MuiButton
          id="old-list-button"
          aria-haspopup={true}
          onClick={event => {
            setListAnchorEl(event.currentTarget);
          }}
        >
          <FormatListBulleted />
          <span style={{ marginLeft: 5 }}>
            <FormattedMessage id="other.oldLinks.oldList" defaultMessage="過去バージョンのユーザ一覧" />
          </span>
        </MuiButton>
        <Popover
          id="list-popover"
          open={Boolean(listAnchorEl)}
          anchorEl={listAnchorEl}
          onClose={() => setListAnchorEl(null)}
          onClick={() => setListAnchorEl(null)}
          PaperProps={{
            style: {
              background: props.theme.header.popoverBg
            }
          }}
        >
          <MuiMenuList>
            {ALL_VERSIONS.slice(1).map(version => (
              <Link to={`/${locale}/${version}/list`} key={version}>
                <MuiMenuItem>{VERSION_NAME[version].replace(":EVOLVE", "")}</MuiMenuItem>
              </Link>
            ))}
          </MuiMenuList>
        </Popover>
      </p>
      <p>
        {"★" +
          formatMessage({
            id: "other.code.title"
          }) +
          "："}
        <a href="https://github.com/matsumatsu233/gitadora-skill-viewer" target="_blank" rel="noreferrer noopener">
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
    </>
  );
}

const MuiListSubHeader = styled(ListSubheader)`
  &&& {
    color: ${({ theme }) => theme.header.popoverHeader};
  }
`;

export default withTheme(withRouter(injectIntl(OtherSection)));
