import React from "react";
import ReactTable from "react-table";
import Radium from "radium";

class KasegiPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const { ver, type, scope } = this.props.match.params;
    fetch(`/api/${ver}/kasegi/${type}/${scope}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;
    const columns = [
      { Header: "Name", accessor: "name" },
      { Header: "Diff", accessor: "diff" },
      { Header: "part", accessor: "part" },
      { Header: "averageSkill", accessor: "averageSkill" },
      { Header: "count", accessor: "count" },
      { Header: "averagePlayerSKill", accessor: "averagePlayerSKill" }
    ];

    console.log("rendering kasegipage", { styles });
    console.log("rendering kasegipage", styles.kasegiPage);
    return (
      <div
        style={{
          maxWidth: 1200,
          margin: "auto"
        }}
      >
        {data && data.other && (
          <ReactTable
            data={data.other}
            columns={columns}
            className="-striped -highlight"
          />
        )}
        {data && data.hot && (
          <ReactTable
            data={data.hot}
            columns={columns}
            className="-striped -highlight"
          />
        )}
      </div>
    );
  }
}

const styles = {
  kasegiPage: {
    maxWidth: 1200,
    margin: "auto"
  }
};

export default Radium(KasegiPage);
