import React from "react";
import Radium from "radium";

import KasegiTable from "./KasegiTable.jsx";

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

    return (
      <div style={styles.kasegiPage}>
        {data && data.other && (
          <div style={styles.notLastDiv}>
            <div style={styles.caption}>DRUM OTHER</div>
            <KasegiTable data={data.other} />
          </div>
        )}
        {data && data.hot && (
          <div>
            <div style={styles.caption}>DRUM HOT</div>
            <KasegiTable data={data.hot} />
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  kasegiPage: {
    maxWidth: 800,
    fontFamily: "verdana" // TODO move this to global css? or app component
  },
  notLastDiv: {
    marginBottom: 20
  },
  caption: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5
  }
};

export default Radium(KasegiPage);
