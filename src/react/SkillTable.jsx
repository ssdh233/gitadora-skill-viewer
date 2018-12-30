import React from "react";
import Radium from "radium";
import { Helmet } from "react-helmet";

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

  getDiff = item => {
    return this.props.type === "g"
      ? `${item.diff_value} ${item.diff}-${item.part}`
      : `${item.diff_value} ${item.diff}`;
  };

  render() {
    return (
      <>
        <Helmet>
          <style>{stringStyles}</style>
        </Helmet>
        <table style={styles.skillTable.table}>
          <caption>{this.props.caption}</caption>
          <thead>
            <tr>
              <th style={styles.skillTable.th}>曲名</th>
              <th style={styles.skillTable.th}>レベル</th>
              <th style={styles.skillTable.th}>達成率</th>
              <th style={styles.skillTable.th}>スキル</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(item => (
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
                    width: 400,
                    maxWidth: 400,
                    textAlign: "left",
                    padding: "0 2px",

                    "@media (max-width: 742px)": {
                      width: 300,
                      maxWidth: 300
                    }
                  }}
                >
                  {item.name}
                </td>
                <td style={{ ...styles.skillTable.td }}>
                  {this.getDiff(item)}
                </td>
                <td style={{ ...styles.skillTable.td }}>{`${
                  item.achive_value
                } (${this.getRank(item.achive_value)})`}</td>
                <td style={{ ...styles.skillTable.td }}>{item.skill_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const styles = {
  skillTable: {
    table: {
      backgroundColor: "#FFFFFF",
      fontSize: 14,
      marginTop: 10,

      "@media (max-width: 742px)": {
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
    }
  }
};

const stringStyles = `.lv0, .lv1 {
  background: -webkit-linear-gradient(#FFFFFF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv2 {
  background: -webkit-linear-gradient(#FF6600, #FF6600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv3 {
  background: -webkit-linear-gradient(#FF6600, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv4 {
  background: -webkit-linear-gradient(#FFFF00, #FFFF00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv5 {
  background: -webkit-linear-gradient(#FFFF00, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv6 {
  background: -webkit-linear-gradient(#33FF00, #33FF00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv7 {
  background: -webkit-linear-gradient(#33FF00, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv8 {
  background: -webkit-linear-gradient(#3366FF, #3366FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv9 {
  background: -webkit-linear-gradient(#3366FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv10 {
  background: -webkit-linear-gradient(#FF00FF, #FF00FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv11 {
  background: -webkit-linear-gradient(#FF00FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv12 {
  background: -webkit-linear-gradient(#FF0000, #FF0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv13 {
  background: -webkit-linear-gradient(#FF0000, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv14 {
  background: -webkit-linear-gradient(#DD8844, #DD8844);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv15 {
  background: -webkit-linear-gradient(#C0C0C0, #C0C0C0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv16 {
  background: -webkit-linear-gradient(#FFD700, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lv17 a, .lv18 a  {
  background-image: -webkit-gradient( linear, left top, right bottom, color-stop(0.1, #f22), color-stop(0.2, #f2f), color-stop(0.35, #22f), color-stop(0.5, #2ff), color-stop(0.65, #2f2), color-stop(0.8, #ff2) );
  color:transparent;
  -webkit-background-clip: text;
  background-clip: text;
}`;

export default Radium(SkillTable);
