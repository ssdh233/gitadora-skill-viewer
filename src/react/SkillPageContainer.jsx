import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import fetch from "../modules/fetch";
import queryParser from "../modules/query";
import {
  setSkillData,
  setSkillSavedList,
  setSkillComparedSkill
} from "./actions";
import SkillPage from "./SkillPage.jsx";
import { OLD_NAME_MAP } from "../constants";

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
        const query = queryParser(nextProps.location.search);
        loadData(nextProps.dispatch, nextProps.match, query);
      }
    }
  }

  componentDidMount() {
    if (!this.props.isSSR) {
      const query = queryParser(this.props.location.search);
      loadData(this.props.dispatch, this.props.match, query);
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

export const loadData = (dispatch, match, query) => {
  dispatch(setSkillData(null));
  dispatch(setSkillSavedList(null));
  dispatch(setSkillComparedSkill(null));

  const { ver, id, type } = match.params;
  const comparedSkillId = query && query.c;

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
      }),
    comparedSkillId &&
      fetch(`/api/${ver}/${comparedSkillId}/p`)
        .then(res => res.json())
        .then(data => {
          dispatch(setSkillComparedSkill(data));
        })
  ];

  return Promise.all(promises);
};

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    skillData: getSkillData(state),
    hasComparedSkill: Boolean(state.skillComparedSkill),
    skillSavedList: state.skillSavedList
  };
}

function getSkillData(state) {
  const { skillData, skillComparedSkill } = state;
  if (!skillComparedSkill || !skillData) {
    return skillData;
  } else {
    const result = { ...skillData.skillData };
    const old = skillComparedSkill.skillData;

    result.hot = compareSkillHalf(result.hot, old.hot);
    result.other = compareSkillHalf(result.other, old.other);

    return {
      ...skillData,
      skillData: result
    };
  }
}

function compareSkillHalf(current, old) {
  let result = Object.assign({}, current);

  if (!current.data || !old.data) {
    return result;
  }

  if (result) {
    result.data.forEach(item => {
      let newSkillFlag = true;
      for (let i = 0; i < old.data.length; i++) {
        if (
          old.data[i].name === item.name ||
          OLD_NAME_MAP[old.data[i].name] === item.name
        ) {
          newSkillFlag = false;
          const newSkill = Number(item.skill_value);
          const oldSkill = Number(old.data[i].skill_value);
          if (newSkill > oldSkill) {
            const sub = (newSkill - oldSkill).toFixed(2);
            item.compare = `${sub}↑`;
          }
          break;
        }
      }
      if (newSkillFlag) {
        item.compare = "New!";
      }
    });
  }

  return result;
}

export default connect(mapStateToProps)(withRouter(SkillPageContainer));
