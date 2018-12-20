import React from "react";
import { connect } from "react-redux";

import fetch from "../modules/fetch";
import { setListData } from "./actions";
import ListPage from "./ListPage.jsx";

class ListPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.isSSR) {
      if (nextProps.match !== this.props.match) {
        loadData(this.props.dispatch, this.props.match);
      }
    }
  }

  componentDidMount() {
    if (!this.props.isSSR) {
      loadData(this.props.dispatch, this.props.match);
    }
  }

  render() {
    return (
      <ListPage
        {...this.props.data}
        match={this.props.match}
        isAdmin={this.props.isAdmin}
      />
    );
  }
}

export const loadData = (dispatch, match) => {
  dispatch(setListData(null));

  const { ver } = match.params;

  return fetch(`/api/${ver}/list`)
    .then(res => res.json())
    .then(data => {
      dispatch(setListData(data));
    });
};

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    data: state.listData
  };
}

export default connect(mapStateToProps)(ListPageContainer);
