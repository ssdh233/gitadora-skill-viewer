import React from "react";
import Radium from "radium";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import CompareArrows from "@material-ui/icons/CompareArrows";

import { VERSION_NAME } from "../constants.js";
import skillColorStyles from "./styles/skillColor.js";
import SkillTable from "./SkillTable.jsx";

class SkillPage extends React.Component {
  getRank = value => {
    if (value.substr(0, 3) == "100") {
      return "SS";
    } else {
      var value_int = parseInt(value.substr(0, 2));
      if (value_int > 94) {
        return "SS";
      } else if (value_int > 79) {
        return "S";
      } else if (value_int > 72) {
        return "A";
      } else if (value_int > 62) {
        return "B";
      } else {
        return "C";
      }
    }
  };

  render() {
    if (!this.props.skillData) {
      return <LinearProgress />;
    }

    const { locale, ver, id } = this.props.match.params;
    const {
      skillData,
      skillName,
      updateDate,
      playerId,
      skillPointDiff
    } = this.props.skillData;

    const type = this.props.saved
      ? this.props.skillData.type
      : this.props.match.params.type;

    const skillPoint = (
      Number(skillData.hot.point) + Number(skillData.other.point)
    ).toFixed(2);
    const level = parseInt(skillPoint / 500);

    const fullVersionName = VERSION_NAME[ver];

    const {
      intl: { formatMessage }
    } = this.props;

    const title = formatMessage(
      {
        id: "skill.title"
      },
      {
        name: skillName,
        type: type === "g" ? "Guitarfreaks" : "Drummania"
      }
    );

    return (
      <div style={styles.skillPage}>
        <Helmet>
          <title>{`${title} | ${fullVersionName}`}</title>
          <meta name="twitter:card" content="summary" />
          <meta property="og:url" content="gsv.fun" />
          <meta
            property="og:title"
            content={`${title} ${skillPoint} ${
              skillPointDiff ? `(${skillPointDiff}↑)` : ""
            }`}
          />
          <style>{stringStyles}</style>
        </Helmet>
        <div style={styles.version}>{fullVersionName}</div>
        {!this.props.saved && (
          <div style={{ margin: "3px 0" }}>
            {type === "g" && (
              <>
                <span>GuitarFreaks/</span>
                <Link to={`/${locale}/${ver}/${id}/d`}>Drummania</Link>
              </>
            )}
            {type === "d" && (
              <>
                <Link to={`/${locale}/${ver}/${id}/g`}>GuitarFreaks</Link>
                <span>/Drummania</span>
              </>
            )}
          </div>
        )}
        <table style={styles.profileTable.table}>
          <thead>
            <tr>
              <th style={styles.profileTable.th}>NAME</th>
              <th style={styles.profileTable.th}>SKILL</th>
              <th style={styles.profileTable.th}>HOT</th>
              <th style={styles.profileTable.th}>OTHER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.profileTable.td} className={`lv${level}`}>
                {skillName}
              </td>
              <td style={styles.profileTable.td} className={`lv${level}`}>
                {skillPoint}
              </td>
              <td style={styles.profileTable.td} className={`lv${level}`}>
                {skillData.hot.point}
              </td>
              <td style={styles.profileTable.td} className={`lv${level}`}>
                {skillData.other.point}
              </td>
            </tr>
          </tbody>
        </table>
        {skillData.hot.data && (
          <SkillTable
            data={skillData.hot.data}
            type={type}
            caption={type === "g" ? "GUITAR HOT" : "DRUM HOT"}
            hasComparedSkill={this.props.hasComparedSkill}
          />
        )}
        {skillData.other.data && (
          <SkillTable
            data={skillData.other.data}
            type={type}
            caption={type === "g" ? "GUITAR OTHER" : "DRUM OTHER"}
            hasComparedSkill={this.props.hasComparedSkill}
          />
        )}
        <div
          style={{
            maxWidth: 700,
            display: "flex",
            justifyContent: "space-between",

            "@media (max-width: 742px)": {
              maxWidth: 500
            }
          }}
        >
          <span>Updated at {updateDate}</span>
          <Link to={`/${locale}`}>
            <FormattedMessage id="skill.aboutGsv" />
          </Link>
        </div>
        {this.props.saved ? (
          <div>
            <Link to={`/${locale}/${ver}/${playerId}/${type}`}>
              <FormattedMessage
                id="skill.latestSkill"
                values={{ name: skillName }}
              />
            </Link>
          </div>
        ) : (
          <>
            <div>
              {[level * 500 - 500, level * 500, level * 500 + 500]
                .filter(scope => scope >= 3000)
                .map(scope => (
                  <div key={scope}>
                    <Link
                      to={`/${locale}/${ver}/kasegi/${type}/${scope}?c=${id}`}
                    >
                      <FormattedMessage
                        id="skill.compareWithKasegi"
                        values={{ scope: `${scope}~${scope + 500}` }}
                      />
                    </Link>
                  </div>
                ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                style={{ marginBottom: 10 }}
                variant="outlined"
                size="small"
                onClick={() => this.props.onSaveSkill({ id, type, skillPoint })}
              >
                <FormattedMessage id="skill.saveSkill" />
              </Button>
              {this.props.skillSavedList && (
                <table style={styles.savedListTable.table}>
                  <caption style={{ color: "black" }}>
                    <FormattedMessage id="skill.savedList" />
                  </caption>
                  <thead>
                    <tr>
                      <th style={styles.savedListTable.th}>No.</th>
                      <th style={styles.savedListTable.th}>SKILL</th>
                      <th style={styles.savedListTable.th}>DATE</th>
                      <th style={styles.savedListTable.th} />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.skillSavedList.map((savedItem, index) => (
                      <tr key={savedItem.update_date}>
                        <td
                          style={styles.savedListTable.td}
                          className={`lv${parseInt(savedItem.skill / 500)}`}
                        >
                          <Link to={`/${locale}/${ver}/${savedItem.id}/p`}>
                            {index + 1}
                          </Link>
                        </td>
                        <td
                          style={styles.savedListTable.td}
                          className={`lv${parseInt(savedItem.skill / 500)}`}
                        >
                          <Link to={`/${locale}/${ver}/${savedItem.id}/p`}>
                            {savedItem.skill}
                          </Link>
                        </td>
                        <td
                          style={styles.savedListTable.td}
                          className={`lv${parseInt(savedItem.skill / 500)}`}
                        >
                          <Link to={`/${locale}/${ver}/${savedItem.id}/p`}>
                            {savedItem.update_date}
                          </Link>
                        </td>
                        <td style={styles.savedListTable.td}>
                          <Link to={`?c=${savedItem.id}`}>
                            <CompareArrows
                              style={{ fontSize: 16, color: "white" }}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

const styles = {
  skillPage: {
    fontSize: 14,

    "@media (max-width: 742px)": {
      fontSize: 12
    }
  },
  version: {
    fontFamily: "Andada",
    fontWeight: "bold",
    fontSize: 17,

    "@media (max-width: 742px)": {
      fontSize: 15
    }
  },
  profileTable: {
    table: {
      backgroundColor: "#000000",
      color: "white",
      margin: "10px 0"
    },
    th: {
      backgroundColor: "#333333",
      padding: "2px 10px 2px 10px",
      fontWeight: "normal",
      textAlign: "left"
    },
    td: {
      padding: "2px 10px 2px 10px"
    }
  },
  savedListTable: {
    table: {
      backgroundColor: "#000000",
      color: "white",
      marginBottom: 10,
      fontSize: 12
    },
    th: {
      backgroundColor: "#333333",
      textAlign: "left",
      fontWeight: "normal",
      lineHeight: "20px",
      padding: 2
    },
    td: {
      lineHeight: "20px",
      padding: 2
    }
  }
};

const stringStyles = skillColorStyles;

export default injectIntl(Radium(SkillPage));
