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
        }[diff],
        height: 24
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
      { Header: "No.", accessor: "index", width: 40 },
      {
        Header: () => <FormattedMessage id="kasegi.songname" />,
        accessor: "name"
      },
      {
        Header: () => <FormattedMessage id="kasegi.level" />,
        accessor: "diff",
        width: 100
      },
      {
        Header: () => <FormattedMessage id="kasegi.count" />,
        accessor: "count",
        width: 54
      },
      {
        Header: () => <FormattedMessage id="kasegi.averageskill" />,
        accessor: "averageSkill",
        width: 70
      },
      {
        Header: () => <FormattedMessage id="kasegi.averageplayerskill" />,
        accessor: "averagePlayerSKill",
        width: 80
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
