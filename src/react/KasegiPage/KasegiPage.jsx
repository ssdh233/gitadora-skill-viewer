import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { injectIntl, FormattedMessage } from "react-intl";

import KasegiTable from "./KasegiTable.jsx";

class KasegiPage extends React.Component {
  render() {
    const {
      kasegiData,
      comparedSkillData,
      intl: { formatMessage },
      match: {
        params: { locale, version, type, scope },
        query: { c: comparedSkillId }
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
        <div style={styles.kasegiPage}>
          <h1 style={styles.title}>{title}</h1>
          {comparedSkillData && (
            <h2 style={styles.subtitle}>
              {/* TODO add link after find a way to inject query to prop */}
              <FormattedMessage
                id="kasegi.compareTitle"
                values={{
                  compareSkill: (
                    <Link
                      to={`/${locale}/${version}/${comparedSkillId}/${type}`}
                    >
                      <FormattedMessage
                        id="kasegi.compareSkill"
                        values={{ name: comparedSkillData.playerName }}
                      />
                    </Link>
                  )
                }}
              />
            </h2>
          )}
          {kasegiData && kasegiData.hot && (
            <div id="kasegi-hot-table" style={{ marginBottom: 20 }}>
              <div style={styles.caption}>{`${typeTitleShort} HOT`}</div>
              <KasegiTable
                data={kasegiData.hot}
                hasComparedSkill={Boolean(comparedSkillData)}
              />
            </div>
          )}
          {kasegiData && kasegiData.other && (
            <div style={styles.notLastDiv} id="kasegi-other-table">
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

export default injectIntl(KasegiPage);
