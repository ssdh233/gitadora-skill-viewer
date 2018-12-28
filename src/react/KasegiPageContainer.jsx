import React from "react";
import { connect } from "react-redux";

import fetch from "../modules/fetch";
import { setKasegiData, setKasegiComparedSkill } from "./actions";
import KasegiPage from "./KasegiPage.jsx";

class KasegiPageContainer extends React.Component {
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
    return <KasegiPage {...this.props} />;
  }
}

export const loadData = (dispatch, match, query) => {
  dispatch(setKasegiData(null));
  dispatch(setKasegiComparedSkill(null));

  const { ver, type, scope } = match.params;
  const comparedSkillId = query && query.c;

  const promises = [
    fetchKasegiData({ ver, type, scope }).then(data => {
      dispatch(setKasegiData(data));
    }),
    comparedSkillId &&
      fetchKasegiComparedSkill({ comparedSkillId, ver, type }).then(data => {
        dispatch(setKasegiComparedSkill(data));
      })
  ];

  return Promise.all(promises);
};

const fetchKasegiData = ({ ver, type, scope }) => {
  return fetch(`/api/${ver}/kasegi/${type}/${scope}`).then(res => res.json());
};

const fetchKasegiComparedSkill = ({ comparedSkillId, ver, type }) => {
  return fetch(`/api/${ver}/${comparedSkillId}/${type}`).then(res =>
    res.json()
  );
};

function mapStateToProps(state) {
  return {
    isSSR: state.isSSR,
    kasegiData: getKasegiData(state.kasegiData, state.kasegiComparedSkill),
    comparedSkillData: state.kasegiComparedSkill
  };
}

function getKasegiData(kasegiData, kasegiComparedSkill) {
  const sortByCountAndSkill = (a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count;
    } else if (b.averageSkill - a.averageSkill) {
      return b.averageSkill - a.averageSkill;
    }
  };

  const processData = skillData => (data, index) => {
    const { name, diff, part, diffValue, averageSkill } = data;

    let displayedDiff = `${diffValue} ${diff}`;
    if (part !== "D") {
      displayedDiff = `${displayedDiff}-${part}`;
    }

    const averageAchieve =
      ((averageSkill / (diffValue * 20)) * 100).toFixed(2) + "%";
    const displayedAverageSkill = `${averageSkill} (${averageAchieve})`;

    let compare = null;
    if (skillData) {
      let comparedData = skillData.find(
        skillDataItem =>
          skillDataItem.name === name &&
          skillDataItem.diff === diff &&
          skillDataItem.part === part
      );
      if (comparedData) {
        compare = comparedData.skill_value - averageSkill;
        if (compare > 0) {
          compare = `${compare.toFixed(2)}↑`;
        } else if (compare < 0) {
          compare = `${compare.toFixed(2).substring(1)}↓`;
        } else {
          compare = `0.00`;
        }
      }
    }

    return {
      index: index + 1,
      diff,
      displayedDiff,
      displayedAverageSkill,
      compare,
      ...data
    };
  };

  const { hot: kasegiHot, other: kasegiOther, ...rest } = kasegiData;
  const { hot: skillHot, other: skillOther } =
    (kasegiComparedSkill && kasegiComparedSkill.skillData) || {};
  return {
    ...rest,
    hot:
      kasegiHot &&
      kasegiHot
        .sort(sortByCountAndSkill)
        .map(processData(skillHot && skillHot.data)),
    other:
      kasegiOther &&
      kasegiOther
        .sort(sortByCountAndSkill)
        .map(processData(skillOther && skillOther.data))
  };
}

export default connect(mapStateToProps)(KasegiPageContainer);
