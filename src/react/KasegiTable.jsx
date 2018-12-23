import React from "react";
import Radium from "radium";
import ReactTable from "react-table";
import { FormattedMessage } from "react-intl";

import withMediaQuery from "./withMediaQuery";

class KasegiTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getTrProps = (state, rowInfo) => {
    const diff = (rowInfo && rowInfo.original && rowInfo.original.diff) || "";
    return {
      style: {
        backgroundColor: {
          BAS: "#C7E7FF",
          ADV: "#FFFFC7",
          EXT: "#FFC7C7",
          MAS: "#D8BFF8"
        }[diff]
      }
    };
  };

  getTdProps = () => {
    return {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    };
  };

  getTheadProps = () => ({ style: { height: 30 } });

  render() {
    const columns = [
      { Header: "No.", accessor: "index", maxWidth: 40 },
      {
        Header: () => <FormattedMessage id="kasegi.songname" />,
        accessor: "name",
        minWidth: this.props.mediaQuery === "sp" ? 150 : 180,
        style: {
          whiteSpace: "unset"
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.level" />,
        accessor: "displayedDiff",
        maxWidth: this.props.mediaQuery === "sp" ? 53 : 100,
        style: {
          whiteSpace: "unset"
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.averageskill" />,
        accessor: "displayedAverageSkill",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 140,
        style: {
          whiteSpace: "unset"
        },
        sortMethod: (a, b) => {
          let skillA = Number(a.split("(")[0]);
          let skillB = Number(b.split("(")[0]);
          return skillA - skillB;
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.count" />,
        accessor: "count",
        maxWidth: this.props.mediaQuery === "sp" ? 34 : 40
      }
    ];

    return (
      <ReactTable
        {...this.props}
        style={{
          fontSize: this.props.mediaQuery === "sp" ? 12 : 14
        }}
        columns={columns}
        defaultPageSize={25}
        getTheadProps={this.getTheadProps}
        getTrProps={this.getTrProps}
        getTdProps={this.getTdProps}
      />
    );
  }
}

export default withMediaQuery(Radium(KasegiTable));
