import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { injectIntl, useIntl } from "react-intl";
import ReactTable from "react-table";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

import { VERSION_NAME } from "../../constants.js";
import skillColorStyles from "../styles/skillColor.js";
import withMediaQuery from "../withMediaQuery";
import { InputAdornment } from "@material-ui/core";

const getLevel = (...skills) => {
  let skill = Math.max(...skills);
  return Math.floor(skill / 500);
};

function ListPage(props) {
  const intl = useIntl();
  const { theme } = props;

  const [searchText, setSearchText] = useState("");

  const getTrProps = () => ({
    style: {
      color: theme.list.tableContent,
      backgroundColor: theme.list.tableContentBg
    }
  });

  const getTdProps = (state, rowInfo, column) => {
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

  const { locale, version } = props.match.params;

  const fullVersionName = "GITADORA " + VERSION_NAME[version];

  let columns = [
    {
      Header: "",
      accessor: "index",
      maxWidth: props.mediaQuery === "sp" ? 40 : 48,
      Cell: ({ viewIndex, page, pageSize }) => {
        return page * pageSize + viewIndex + 1;
      }
    },
    {
      Header: "Name",
      accessor: "playerName",
      minWidth: 144
    },
    {
      Header: "Guitar",
      accessor: "guitarSkillPoint",
      maxWidth: props.mediaQuery === "sp" ? 70 : 90,
      sortMethod: (a, b) => Number(a) - Number(b),
      Cell: ({ row }) => (
        <Link
          to={`/${locale}/${version}/${row._original.playerId}/g`}
          className={`lv${getLevel(row.guitarSkillPoint)}`}
        >
          {(row.guitarSkillPoint && row.guitarSkillPoint.toFixed(2)) || "0.00"}
        </Link>
      )
    },
    {
      Header: "Drum",
      accessor: "drumSkillPoint",
      maxWidth: props.mediaQuery === "sp" ? 70 : 90,
      sortMethod: (a, b) => Number(a) - Number(b),
      Cell: ({ row }) => (
        <Link to={`/${locale}/${version}/${row._original.playerId}/d`} className={`lv${getLevel(row.drumSkillPoint)}`}>
          {(row.drumSkillPoint && row.drumSkillPoint.toFixed(2)) || "0.00"}
        </Link>
      )
    },
    {
      Header: "Total",
      accessor: "totalSkillPoint",
      maxWidth: props.mediaQuery === "sp" ? 70 : 90,
      sortMethod: (a, b) => Number(a) - Number(b),
      Cell: ({ row }) => (
        <Link
          to={`/${locale}/${version}/${row._original.playerId}/g`}
          className={`lv${getLevel(row.drumSkillPoint, row.guitarSkillPoint)}`}
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

  if (props.isAdmin) {
    columns = [
      ...columns,
      {
        Header: "Count",
        accessor: "updateCount",
        minWidth: 30
      }
    ];
  }

  const {
    data,
    intl: { formatMessage }
  } = props;

  return (
    <>
      <Helmet>
        <title>{`${formatMessage({
          id: "list"
        })} | ${fullVersionName} | Gitadora Skill Viewer`}</title>
        <style>{stringStyles}</style>
      </Helmet>

      {data && (
        <ListTableContainer isAdmin id="list-table">
          <Title>{fullVersionName}</Title>
          <SearchField
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            fullWidth
            placeholder={intl.formatMessage({ id: "list.searchPlaceholder" })}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <TableDiv>
            <ReactTable
              data={data.filter(x => x.playerName.includes(searchText))}
              columns={columns}
              defaultPageSize={100}
              pageSizeOptions={[5, 100, 200, 500, 1000]}
              getTrProps={getTrProps}
              getTdProps={getTdProps}
              defaultSortDesc
              defaultSorted={[
                {
                  id: "totalSkillPoint",
                  desc: true
                }
              ]}
            />
          </TableDiv>
        </ListTableContainer>
      )}
    </>
  );
}

const TableDiv = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.list.table};
  background-color: ${({ theme }) => theme.list.tableBg};

  @media (max-width: 742px) {
    font-size: 12px;
  }
`;

const ListTableContainer = styled.div`
  max-width: ${({ isAdmin }) => (isAdmin ? 800 : 700)}px;
`;

const Title = styled.h2`
  text-align: center;
`;

const stringStyles = skillColorStyles;

const SearchField = styled(TextField)`
  & > .MuiInputBase-root {
    color: ${({ theme }) => theme.main};
  }
  margin-left: 8px;
  margin-right: 8px;
  width: 100%;
`;

export default withTheme(withMediaQuery(injectIntl(ListPage)));
