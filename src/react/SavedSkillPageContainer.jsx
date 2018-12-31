import React from "react";
import { connect } from "react-redux";

import fetch from "../modules/fetch";
import { setSavedSkillData } from "./actions";
import SkillPage from "./SkillPage.jsx";

class SavedSkillPageContainer extends React.Component {
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
    return (
      <SkillPage saved {...this.props} skillData={this.props.savedSkillData} />
    );
  }
}

export const loadData = (dispatch, match) => {
  dispatch(setSavedSkillData(null));

  const { ver, id } = match.params;

  const promises = [
    fetch(`/api/${ver}/${id}/p`)
      .then(res => res.json())
      .then(data => {
        dispatch(setSavedSkillData(data));
      })
  ];

  return Promise.all(promises);
};

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    savedSkillData: state.savedSkillData
  };
}

export default connect(mapStateToProps)(SavedSkillPageContainer);
