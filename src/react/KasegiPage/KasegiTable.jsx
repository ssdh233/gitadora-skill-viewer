import React from "react";
import ReactTable from "react-table";
import { FormattedMessage } from "react-intl";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import useMediaQuery from "@material-ui/core/useMediaQuery";

function KasegiTable(props) {
  const isSP = useMediaQuery("(max-width:742px)");
  const getTrProps = (state, rowInfo) => {
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

  const getTdProps = (state, rowInfo, column) => {
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

  const getTheadProps = () => ({ style: { height: 30 } });

  let columns = [
    { Header: "No.", accessor: "index", maxWidth: 40 },
    {
      Header: () => <FormattedMessage id="kasegi.songname" />,
      accessor: "name",
      minWidth: isSP ? 150 : 180,
      style: {
        whiteSpace: "unset"
      }
    },
    {
      Header: () => <FormattedMessage id="kasegi.level" />,
      accessor: "displayedDiff",
      maxWidth: isSP ? 53 : 100,
      style: {
        whiteSpace: "unset",
        textAlign: "center"
      }
    },
    {
      Header: () => <FormattedMessage id="kasegi.averageskill" />,
      accessor: "displayedAverageSkill",
      maxWidth: isSP ? 70 : 140,
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

  if (props.hasComparedSkill) {
    columns = [
      ...columns,
      props.mediaQuery === "pc" && {
        Header: () => <FormattedMessage id="kasegi.count" />,
        accessor: "count",
        maxWidth: isSP ? 34 : 40
      },
      {
        Header: () => <FormattedMessage id="kasegi.compare" />,
        accessor: "compare",
        maxWidth: isSP ? 50 : 60,
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
        maxWidth: isSP ? 34 : 40
      }
    ].filter(x => x);
  }

  return (
    <>
      <Helmet>
        <style>{stringStyles}</style>
      </Helmet>
      <KasegiTableRoot>
        <ReactTable
          {...props}
          columns={columns}
          defaultPageSize={25}
          getTheadProps={getTheadProps}
          getTrProps={getTrProps}
          getTdProps={getTdProps}
        />
      </KasegiTableRoot>
    </>
  );
}

const KasegiTableRoot = styled.div`
  font-size: 14px;
  @media (max-width: 742px) {
    font-size: 12px;
  }
`;

const stringStyles = `
.higherThanAverage {
  color: red
}

.lowerThanAverage {
  color: green
}
`;

export default KasegiTable;
