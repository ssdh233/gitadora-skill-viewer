import React from "react";
import Radium from "radium";
import { Helmet } from "react-helmet";
import { injectIntl, FormattedMessage } from "react-intl";
import LinearProgress from "@material-ui/core/LinearProgress";

import KasegiTable from "./KasegiTable.jsx";

class KasegiPage extends React.Component {
  render() {
    const {
      kasegiData,
      comparedSkillData,
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
        {!kasegiData && <LinearProgress />}
        <div style={styles.kasegiPage}>
          <h1 style={styles.title}>{title}</h1>
          {comparedSkillData && (
            <h2 style={styles.subtitle}>
              {/* TODO add link after find a way to inject query to prop */}
              <FormattedMessage
                id="kasegi.compareTitle"
                values={{ name: comparedSkillData.skillName }}
              />
            </h2>
          )}
          {kasegiData && kasegiData.hot && (
            <div>
              <div style={styles.caption}>{`${typeTitleShort} HOT`}</div>
              <KasegiTable
                data={kasegiData.hot}
                hasComparedSkill={Boolean(comparedSkillData)}
              />
            </div>
          )}
          {kasegiData && kasegiData.other && (
            <div style={styles.notLastDiv}>
              <div style={styles.caption}>{`${typeTitleShort} OTHER`}</div>
              <KasegiTable
                data={kasegiData.other}
                hasComparedSkill={Boolean(comparedSkillData)}
              />
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
  subtitle: {
    fontSize: 16
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
