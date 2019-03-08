import React from "react";
import { connect } from "react-redux";

import { setTest } from "./actions";

class TestPage extends React.Component {
  static loadData = dispatch => {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(setTest("haha"));
        resolve();
      }, 1000);
    });
  };

  render() {
    return <div>test page {this.props.data}</div>;
  }
}

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    data: state.test
  };
}

export default connect(mapStateToProps)(TestPage);
