import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FormattedMessage } from "react-intl";

import { CURRENT_VERSION } from "../../constants";
import { ListSubheader } from "@material-ui/core";
import styled from "styled-components";

function KasegiIndexPage(props) {
  const {
    match: {
      params: { locale }
    }
  } = props;

  return (
    <>
      <h1 style={{ fontSize: 19 }}>
        <FormattedMessage id="kasegi.old" />
      </h1>
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
                <Link
                  key={key}
                  to={`/${locale}/${CURRENT_VERSION}/kasegi_old/d/${skill}`}
                >
                  <ListItem button>
                    <ListItemText primary={`${skill} ~`} />
                  </ListItem>
                </Link>
                <Link
                  key={key}
                  to={`/${locale}/${CURRENT_VERSION}/kasegi_old/g/${skill}`}
                >
                  <ListItem button>
                    <ListItemText primary={`${skill} ~`} />
                  </ListItem>
                </Link>
              </>
            );
          })}
        </div>
      </List>
    </>
  );
}

export const MuiListSubHeader = styled(ListSubheader)`
  &&& {
    color: ${({ theme }) => theme.header.popoverHeader};
  }
`;

export default KasegiIndexPage;
