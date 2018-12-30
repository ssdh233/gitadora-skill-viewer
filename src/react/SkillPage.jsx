import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    if (!this.props.data) {
      return <LinearProgress />;
    }

    const { locale, ver, id, type } = this.props.match.params;
    const { skillData, skillName, updateDate } = this.props.data;
    const skillPoint = (
      Number(skillData.hot.point) + Number(skillData.other.point)
    ).toFixed(2);
    const level = parseInt(skillPoint / 500);

    return (
      <div style={styles.skillPage}>
        <div style={{ fontFamily: "Andada", fontWeight: "bold", fontSize: 17 }}>
          GITADORA{" "}
          {
            {
              exchain: "EXCHAIN",
              matixx: "Matixx",
              tbre: "Tri-Boost Re:EVOLVE",
              tb: "Tri-Boost"
            }[ver]
          }
        </div>
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
        <SkillTable
          data={skillData.hot.data}
          type={type}
          caption={type === "g" ? "GUITAR HOT" : "DRUM HOT"}
        />
        <SkillTable
          data={skillData.other.data}
          type={type}
          caption={type === "g" ? "GUITAR OTHER" : "DRUM OTHER"}
        />
        <div
          style={{
            maxWidth: 700,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <span>Updated at {updateDate}</span>
          <Link to={`/${locale}`}>
            <FormattedMessage id="skill.aboutGsv" />
          </Link>
        </div>
        <div>
          {[level * 500 - 500, level * 500, level * 500 + 500]
            .filter(scope => scope >= 3000)
            .map(scope => (
              <div key={scope}>
                <Link to={`/${locale}/${ver}/kasegi/${type}/${scope}?c=${id}`}>
                  <FormattedMessage
                    id="skill.compareWithKasegi"
                    values={{ scope: `${scope}~${scope + 500}` }}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const styles = {
  skillPage: {
    fontSize: 14
  },
  profileTable: {
    table: {
      backgroundColor: "#000000",
      color: "white",
      marginBottom: 10
    },
    th: {
      backgroundColor: "#333333",
      padding: "2px 10px 2px 10px",
      fontWeight: "normal"
    },
    td: {
      padding: "2px 10px 2px 10px"
    }
  }
};

export default SkillPage;
