import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import fetch from "../modules/fetch";
import { setSkillData, setSkillSavedList } from "./actions";
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

  handleSaveSkill = ({ id, type, skillPoint }) => {
    const { locale, ver } = this.props.match.params;
    fetch(`/${ver}/save`, {
      method: "POST",
      body: JSON.stringify({ skill_id: id, type, skill: skillPoint }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.err) {
          console.error(res.err);
        } else {
          const savedSkillId = res.savedSkillId;
          this.props.history.push(`/${locale}/${ver}/${savedSkillId}/p`);
          // TODO redirection
        }
      });
  };

  render() {
    return <SkillPage {...this.props} onSaveSkill={this.handleSaveSkill} />;
  }
}

export const loadData = (dispatch, match) => {
  dispatch(setSkillData(null));
  dispatch(setSkillSavedList(null));

  const { ver, id, type } = match.params;

  const promises = [
    fetch(`/api/${ver}/${id}/${type}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setSkillData(data));
      }),
    fetch(`/api/savedList/${ver}/${id}/${type}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setSkillSavedList(data));
      })
  ];

  return Promise.all(promises);
};

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    skillData: state.skillData,
    skillSavedList: state.skillSavedList
  };
}

export default connect(mapStateToProps)(withRouter(SkillPageContainer));
