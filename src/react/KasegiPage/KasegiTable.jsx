import React from "react";
import ReactTable from "react-table";
import { FormattedMessage } from "react-intl";
import { Helmet } from "react-helmet";

import withMediaQuery from "../withMediaQuery";

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

  getTdProps = (state, rowInfo, column) => {
    let style = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    };
    let className;
    if (rowInfo && rowInfo.row.compare && column.id === "compare") {
      if (rowInfo.row.compare.includes("↑")) {
        className = "higherThanAverage";
      }
      if (rowInfo.row.compare.includes("↓")) {
        className = "lowerThanAverage";
      }
    }

    return { className, style };
  };

  getTheadProps = () => ({ style: { height: 30 } });

  render() {
    let columns = [
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
          whiteSpace: "unset",
          textAlign: "center"
        }
      },
      {
        Header: () => <FormattedMessage id="kasegi.averageskill" />,
        accessor: "displayedAverageSkill",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 140,
        style: {
          whiteSpace: "unset",
          textAlign: "center"
        },
        sortMethod: (a, b) => {
          let skillA = Number(a.split("(")[0]);
          let skillB = Number(b.split("(")[0]);
          return skillA - skillB;
        }
      }
    ];

    if (this.props.hasComparedSkill) {
      columns = [
        ...columns,
        this.props.mediaQuery === "pc" && {
          Header: () => <FormattedMessage id="kasegi.count" />,
          accessor: "count",
          maxWidth: this.props.mediaQuery === "sp" ? 34 : 40
        },
        {
          Header: () => <FormattedMessage id="kasegi.compare" />,
          accessor: "compare",
          maxWidth: this.props.mediaQuery === "sp" ? 50 : 60,
          textAlign: "center",
          sortMethod: (a, b, desc) => {
            if (!b) return !desc ? -1 : 1;
            if (!a) return !desc ? 1 : -1;
            let aNum = Number(a.slice(0, a.length - 1));
            if (a[a.length - 1] === "↓") aNum = -aNum;
            let bNum = Number(b.slice(0, b.length - 1));
            if (b[b.length - 1] === "↓") bNum = -bNum;
            return aNum - bNum;
          }
        }
      ].filter(x => x);
    } else {
      columns = [
        ...columns,
        {
          Header: () => <FormattedMessage id="kasegi.count" />,
          accessor: "count",
          maxWidth: this.props.mediaQuery === "sp" ? 34 : 40
        }
      ].filter(x => x);
    }

    return (
      <>
        <Helmet>
          <style>{stringStyles}</style>
        </Helmet>
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
      </>
    );
  }
}

const stringStyles = `
.higherThanAverage {
  color: red
}

.lowerThanAverage {
  color: green
}
`;

export default withMediaQuery(KasegiTable);
