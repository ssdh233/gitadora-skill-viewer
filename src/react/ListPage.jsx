import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import ReactTable from "react-table";
import LinearProgress from "@material-ui/core/LinearProgress";

import { VERSION_NAME } from "../constants.js";
import skillColorStyles from "./styles/skillColor.js";
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
        case "drum_skill":
          style = { textAlign: "center" };
          break;
        default:
      }
    }

    return { className, style };
  };

  render() {
    const { locale, ver } = this.props.match.params;

    const fullVersionName = VERSION_NAME[ver];

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
          <Link
            to={`/${locale}/${ver}/${row.id}/g`}
            className={`lv${this.getLevel(row.guitar_skill)}`}
          >
            {row.guitar_skill}
          </Link>
        )
      },
      {
        Header: "Drum",
        accessor: "drum_skill",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: ({ row }) => (
          <Link
            to={`/${locale}/${ver}/${row.id}/d`}
            className={`lv${this.getLevel(row.drum_skill)}`}
          >
            {row.drum_skill}
          </Link>
        )
      },
      {
        Header: "Last Update",
        accessor: "update_date",
        minWidth: 130
      }
    ];

    if (this.props.isAdmin) {
      columns = [
        ...columns,
        { Header: "Count", accessor: "update_count", minWidth: 30 }
      ];
    }

    const {
      data,
      intl: { formatMessage }
    } = this.props;

    return (
      <>
        <Helmet>
          <title>{`${formatMessage({
            id: "list"
          })} | ${fullVersionName} | Gitadora Skill Viewer`}</title>
          <style>{stringStyles}</style>
        </Helmet>
        {!data && <LinearProgress />}
        {data && (
          <div
            style={{
              ...styles.listPage,
              ...(this.props.isAdmin ? styles.userlistPage : {})
            }}
          >
            <h1 style={styles.title}>{fullVersionName}</h1>
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
          </div>
        )}
      </>
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

const stringStyles = skillColorStyles;

export default withMediaQuery(injectIntl(Radium(ListPage)));
