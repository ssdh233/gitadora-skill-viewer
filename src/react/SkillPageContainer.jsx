import React from "react";
import { connect } from "react-redux";

import fetch from "../modules/fetch";
import { setSkillData } from "./actions";
import SkillPage from "./SkillPage.jsx";

class SkillPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.isSSR) {
      if (nextProps.match !== this.props.match) {
        loadData(nextProps.dispatch, nextProps.match);
      }
    }
  }

  componentDidMount() {
    if (!this.props.isSSR) {
      loadData(this.props.dispatch, this.props.match);
    }
  }

  render() {
    return <SkillPage {...this.props} />;
  }
}

export const loadData = (dispatch, match) => {
  dispatch(setSkillData(null));

  const { ver, id, type } = match.params;

  return fetch(`/api/${ver}/${id}/${type}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setSkillData(data));
    });
};

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    data: state.skillData
  };
}

export default connect(mapStateToProps)(SkillPageContainer);
