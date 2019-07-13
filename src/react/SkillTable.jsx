import React from "react";
import Radium from "radium";

class SkillTable extends React.Component {
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

  getDiff = (item, type) => {
    return type === "g"
      ? `${item.diff_value} ${item.diff}-${item.part}`
      : `${item.diff_value} ${item.diff}`;
  };

  render() {
    const { data, caption, type, hasComparedSkill, ...rest } = this.props;
    return (
      <table style={styles.skillTable.table} {...rest}>
        <caption>{this.props.caption}</caption>
        <thead>
          <tr>
            <th style={styles.skillTable.th}>曲名</th>
            <th style={styles.skillTable.th}>レベル</th>
            <th style={styles.skillTable.th}>達成率</th>
            <th style={styles.skillTable.th}>スキル</th>
            {hasComparedSkill && <th />}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr
              key={item.name}
              style={{
                ...styles.skillTable.tr,
                backgroundColor: {
                  BAS: "#C7E7FF",
                  ADV: "#FFFFC7",
                  EXT: "#FFC7C7",
                  MAS: "#D8BFF8"
                }[item.diff]
              }}
            >
              <td
                style={{
                  ...styles.skillTable.td,
                  width: "100%",
                  maxWidth: 400,
                  textAlign: "left",
                  whiteSpace: "normal",
                  padding: "0 2px",

                  "@media (max-width: 742px)": {
                    maxWidth: 300
                  }
                }}
              >
                {item.name}
              </td>
              <td style={{ ...styles.skillTable.td }}>
                {this.getDiff(item, type)}
              </td>
              <td style={{ ...styles.skillTable.td }}>{`${
                item.achive_value
              } (${this.getRank(item.achive_value)})`}</td>
              <td style={{ ...styles.skillTable.td }}>{item.skill_value}</td>
              {hasComparedSkill && (
                <td style={styles.skillTable.compareTd}>{item.compare}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const styles = {
  skillTable: {
    table: {
      backgroundColor: "#FFFFFF",
      fontSize: 14,
      marginTop: 10,
      maxWidth: 700,

      "@media (max-width: 742px)": {
        maxWidth: 500,
        fontSize: 10
      }
    },
    th: {
      backgroundColor: "#5882FA"
    },
    tr: {
      height: 24,

      "@media (max-width: 742px)": {
        height: 18
      }
    },
    td: {
      textAlign: "center",
      padding: "0 10px",
      whiteSpace: "nowrap",

      "@media (max-width: 742px)": {
        padding: "0 5px"
      }
    },
    compareTd: {
      backgroundColor: "white",
      fontSize: 12,

      "@media (max-width: 742px)": {
        fontSize: 10
      }
    }
  }
};

export default Radium(SkillTable);
