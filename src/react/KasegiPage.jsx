import React from "react";
import Radium from "radium";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LinearProgress from "@material-ui/core/LinearProgress";

import KasegiTable from "./KasegiTable.jsx";

class KasegiPage extends React.Component {
  render() {
    const {
      data,
      intl: { formatMessage },
      match: {
        params: { type, scope }
      }
    } = this.props;

    const typeTitle = type === "d" ? "Drummania" : "Guitarfreaks";
    const typeTitleShort = type === "d" ? "DRUM" : "GUITAR";
    const scopeTitle = `${scope} ~ ${parseInt(scope) + 500}`;
    const scopeNameColor = formatMessage({
      id: `kasegi.scope.${scope}`
    });

    const title = `${typeTitle}${formatMessage({
      id: "kasegi.title"
    })} ${scopeTitle} ${scopeNameColor}`;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={formatMessage(
              {
                id: "kasegi.desc",
                defaultMessage: " "
              },
              {
                type: typeTitle,
                scope: scopeNameColor
              }
            )}
          />
          <title>{`${title} | Gitadora Skill Viewer`}</title>
        </Helmet>
        {!data && <LinearProgress />}
        <div style={styles.kasegiPage}>
          <h1 style={styles.title}>{title}</h1>
          {data && data.other && (
            <div style={styles.notLastDiv}>
              <div style={styles.caption}>{`${typeTitleShort} OTHER`}</div>
              <KasegiTable data={data.other} />
            </div>
          )}
          {data && data.hot && (
            <div>
              <div style={styles.caption}>{`${typeTitleShort} HOT`}</div>
              <KasegiTable data={data.hot} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  kasegiPage: {
    maxWidth: 800
  },
  title: {
    fontSize: 19
  },
  notLastDiv: {
    marginBottom: 20
  },
  caption: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5
  }
};

export default injectIntl(Radium(KasegiPage));
