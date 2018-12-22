import React from "react";
import Radium from "radium";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import ReactTable from "react-table";

import withMediaQuery from "./withMediaQuery";

class ListPage extends React.Component {
  getLevel = skill => Math.floor(skill / 500);

  getTrProps = () => ({ style: styles.commonTrStyle });
  getTdProps = (state, rowInfo, column) => {
    let className;
    let style;
    if (rowInfo) {
      switch (column.id) {
        case "guitar_skill":
          className = `lv${this.getLevel(rowInfo.row.guitar_skill)}`;
          style = { textAlign: "center" };
          break;
        case "drum_skill":
          className = `lv${this.getLevel(rowInfo.row.drum_skill)}`;
          style = { textAlign: "center" };
          break;
        default:
      }
    }

    return { className, style };
  };

  render() {
    const { ver } = this.props.match.params;

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
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: ({ row }) => (
          <a href={`/${ver}/${row.id}/g`}>{row.guitar_skill}</a>
        )
      },
      {
        Header: "Drum",
        accessor: "drum_skill",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: ({ row }) => <a href={`/${ver}/${row.id}/d`}>{row.drum_skill}</a>
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
        <Helmet>
          <style>{stringStyles}</style>
        </Helmet>
        <h1 style={styles.title}>{version_full}</h1>
        {data && (
          <ReactTable
            data={data}
            columns={columns}
            style={{
              fontSize: this.props.mediaQuery === "sp" ? 12 : 14
            }}
            defaultPageSize={100}
            pageSizeOptions={[5, 100, 200, 500, 1000]}
            getTrProps={this.getTrProps}
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
  commonTrStyle: {
    backgroundColor: "#000000",
    color: "#FFFFFF"
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

export default withMediaQuery(injectIntl(Radium(ListPage)));
