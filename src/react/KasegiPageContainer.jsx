import React from "react";
import { connect } from "react-redux";

import fetch from "../modules/fetch";
import { setKasegiData } from "./actions";
import KasegiPage from "./KasegiPage.jsx";

class KasegiPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  render() {
    return <KasegiPage data={this.props.data} match={this.props.match} />;
  }
}

export const loadData = (dispatch, match) => {
  return fetchKasegiData(match).then(data => {
    dispatch(setKasegiData(data));
  });
};

const fetchKasegiData = match => {
  const sortByCount = (a, b) => b.count - a.count;
  const processData = (data, index) => {
    const { diff, part, diffValue, averageSkill } = data;

    let displayedDiff = `${diffValue} ${diff}`;
    if (part !== "D") {
      displayedDiff = `${displayedDiff}-${part}`;
    }

    const averageAchieve =
      ((averageSkill / (diffValue * 20)) * 100).toFixed(2) + "%";

    let displayedAverageSkill = `${averageSkill} (${averageAchieve})`;
    return {
      index: index + 1,
      diff,
      displayedDiff,
      displayedAverageSkill,
      ...data
    };
  };

  const { ver, type, scope } = match.params;
  return fetch(`/api/${ver}/kasegi/${type}/${scope}`)
    .then(res => res.json())
    .then(rawData => {
      const { hot, other, ...rest } = rawData;

      return {
        ...rest,
        hot: hot && hot.sort(sortByCount).map(processData),
        other: other && other.sort(sortByCount).map(processData)
      };
    });
};

function mapStateToProps(state) {
  return {
    data: state.kasegiData
  };
}

export default connect(mapStateToProps)(KasegiPageContainer);
