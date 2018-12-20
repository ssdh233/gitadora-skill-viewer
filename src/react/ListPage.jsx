import React from "react";
import Radium from "radium";
import { injectIntl } from "react-intl";
import ReactTable from "react-table";

import withMediaQuery from "./withMediaQuery";

class ListPage extends React.Component {
  getLevel = skill => Math.floor(skill / 500);

  getTdProps = (state, rowInfo, column) => {
    let style = styles.commonTdStyle;
    if (rowInfo) {
      switch (column.id) {
        case "guitar_skill":
          style = {
            ...style,
            ...styles.skill[`lv${this.getLevel(rowInfo.row.guitar_skill)}`],
            textAlign: "center"
          };
          break;
        case "drum_skill":
          style = {
            ...style,
            ...styles.skill[`lv${this.getLevel(rowInfo.row.drum_skill)}`],
            textAlign: "center"
          };
          break;
        default:
      }
    }

    return { style };
  };

  render() {
    let columns = [
      {
        Header: "ID",
        accessor: "id",
        maxWidth: this.props.mediaQuery === "sp" ? 40 : 48
      },
      { Header: "Name", accessor: "player_name", minWidth: 164 },
      {
        Header: "Guitar",
        accessor: "guitar_skill",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b)
      },
      {
        Header: "Drum",
        accessor: "drum_skill",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b)
      }
    ];

    if (this.props.isAdmin) {
      columns = [
        ...columns,
        {
          Header: "Last Update",
          accessor: "update_date",
          maxWidth: this.props.mediaQuery === "sp" ? 124 : 160
        },
        { Header: "Count", accessor: "update_count", maxWidth: 72 }
      ];
    }

    const { data, version_full } = this.props;
    return (
      <div
        style={{
          ...styles.listPage,
          ...(this.props.isAdmin ? styles.userlistPage : {})
        }}
      >
        <h1 style={styles.title}>{version_full}</h1>
        {data && (
          <ReactTable
            data={data}
            columns={columns}
            style={{
              fontSize: this.props.mediaQuery === "sp" ? 12 : 14
            }}
            defaultPageSize={100}
            pageSizeOptions={[100, 200, 500, 1000]}
            getTdProps={this.getTdProps}
          />
        )}
      </div>
    );
  }
}

const styles = {
  listPage: {
    maxWidth: 600
  },
  userlistPage: {
    maxWidth: 800
  },
  title: {
    fontSize: 19,
    textAlign: "center"
  },
  commonTdStyle: {
    backgroundColor: "#000000",
    color: "#FFFFFF"
  },
  skill: {
    lv0: {
      color: "#FFFFFF"
    },
    lv1: {
      color: "#FFFFFF"
    },
    lv2: {
      color: "#FF6600"
    },
    lv3: {
      color: "#FF6600"
    },
    lv4: {
      color: "#FFFF00"
    },
    lv5: {
      color: "#FFFF00"
    },
    lv6: {
      color: "#33FF00"
    },
    lv7: {
      color: "#33FF00"
    },
    lv8: {
      color: "#3366FF"
    },
    lv9: {
      color: "#3366FF"
    },
    lv10: {
      color: "#FF00FF"
    },
    lv11: {
      color: "#FF00FF"
    },
    lv12: {
      color: "#FF0000"
    },
    lv13: {
      color: "#FF0000"
    },
    lv14: {
      color: "#DD8844"
    },
    lv15: {
      color: "#C0C0C0"
    },
    lv16: {
      color: "#FFD700"
    },
    lv17: {
      color: "#FFFFFF"
    },
    lv18: {
      color: "#FFFFFF"
    }
  }
};

export default withMediaQuery(injectIntl(Radium(ListPage)));
