import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { injectIntl, FormattedMessage } from "react-intl";
import ReactTable from "react-table";

import { VERSION_NAME } from "../../constants.js";
import skillColorStyles from "../styles/skillColor.js";
import withMediaQuery from "../withMediaQuery";

class ListPage extends React.Component {
  getLevel = (...skills) => {
    let skill = Math.max(...skills);
    return Math.floor(skill / 500);
  };

  getTrProps = () => ({
    style: {
      backgroundColor: "#000000",
      color: "#FFFFFF"
    }
  });
  getTdProps = (state, rowInfo, column) => {
    let style;
    if (rowInfo) {
      switch (column.id) {
        case "guitarSkillPoint":
        case "drumSkillPoint":
        case "totalSkillPoint":
          style = { textAlign: "center" };
          break;
        default:
      }
    }

    return { style };
  };

  render() {
    const { locale, version } = this.props.match.params;

    const fullVersionName = VERSION_NAME[version];

    let columns = [
      {
        Header: "",
        accessor: "index",
        maxWidth: this.props.mediaQuery === "sp" ? 40 : 48,
        Cell: ({ viewIndex, page, pageSize }) => {
          return page * pageSize + viewIndex + 1;
        }
      },
      { Header: "Name", accessor: "playerName", minWidth: 144 },
      {
        Header: "Guitar",
        accessor: "guitarSkillPoint",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: ({ row }) => (
          <Link
            to={`/${locale}/${version}/${row._original.playerId}/g`}
            className={`lv${this.getLevel(row.guitarSkillPoint)}`}
          >
            {(row.guitarSkillPoint && row.guitarSkillPoint.toFixed(2)) ||
              "0.00"}
          </Link>
        )
      },
      {
        Header: "Drum",
        accessor: "drumSkillPoint",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: ({ row }) => (
          <Link
            to={`/${locale}/${version}/${row._original.playerId}/d`}
            className={`lv${this.getLevel(row.drumSkillPoint)}`}
          >
            {(row.drumSkillPoint && row.drumSkillPoint.toFixed(2)) || "0.00"}
          </Link>
        )
      },
      {
        Header: "Total",
        accessor: "totalSkillPoint",
        maxWidth: this.props.mediaQuery === "sp" ? 70 : 90,
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: ({ row }) => (
          <Link
            to={`/${locale}/${version}/${row._original.playerId}/g`}
            className={`lv${this.getLevel(
              row.drumSkillPoint,
              row.guitarSkillPoint
            )}`}
          >
            {(row.totalSkillPoint && row.totalSkillPoint.toFixed(2)) || "0.00"}
          </Link>
        )
      },
      {
        Header: "Last Update",
        accessor: "updateDate",
        width: 145
      }
    ];

    if (this.props.isAdmin) {
      columns = [
        ...columns,
        { Header: "Count", accessor: "updateCount", minWidth: 30 }
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
        {data && (
          <div
            style={{
              ...styles.listPage,
              ...(this.props.isAdmin ? styles.userlistPage : {})
            }}
            id="list-table"
          >
            <h1 style={styles.title}>{fullVersionName}</h1>
            <p>
              Tips: <FormattedMessage id="listPage.tips" />
            </p>
            <TableDiv>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={100}
                pageSizeOptions={[5, 100, 200, 500, 1000]}
                getTrProps={this.getTrProps}
                getTdProps={this.getTdProps}
              />
            </TableDiv>
          </div>
        )}
      </>
    );
  }
}

const styles = {
  listPage: {
    maxWidth: 700
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

const TableDiv = styled.div`
  font-size: 14px;

  @media (max-width: 742px) {
    font-size: 12px;
  }
`;

const stringStyles = skillColorStyles;

export default withMediaQuery(injectIntl(ListPage));
