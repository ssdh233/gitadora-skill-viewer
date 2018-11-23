import React from "react";
import Radium from "radium";
import ReactTable from "react-table";
import { FormattedMessage } from "react-intl";

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

  render() {
    const columns = [
      { Header: "No.", accessor: "index", maxWidth: 40 },
      {
        Header: () => <FormattedMessage id="kasegi.songname" />,
        accessor: "name",
        minWidth: 180,
        style: {
          whiteSpace: "unset"
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.level" />,
        accessor: "displayedDiff",
        maxWidth: 100,
        style: {
          whiteSpace: "unset"
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.averageskill" />,
        accessor: "displayedAverageSkill",
        maxWidth: 140,
        style: {
          whiteSpace: "unset"
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.count" />,
        accessor: "count",
        maxWidth: 54
      },
      {
        Header: () => <FormattedMessage id="kasegi.averageplayerskill" />,
        accessor: "averagePlayerSKill",
        maxWidth: 80
      }
    ];

    return (
      <ReactTable
        {...this.props}
        style={{
          fontSize: 14
        }}
        columns={columns}
        defaultPageSize={25}
        getTableProps={this.getTableProps}
        getTheadProps={() => ({ style: { height: 30 } })}
        getTrProps={this.getTrProps}
        getTdProps={this.getTdProps}
      />
    );
  }
}

export default Radium(KasegiTable);
