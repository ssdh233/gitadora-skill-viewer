import React from "react";
import styled from "styled-components";

class SkillTable extends React.Component {
  getRank = value => {
    if (value.substr(0, 3) == "100") {
      return "SS";
    } else {
      var value_int = parseInt(value.substr(0, 2));
      if (value_int > 94) {
        return "SS";
      } else if (value_int > 79) {
        return "S";
      } else if (value_int > 72) {
        return "A";
      } else if (value_int > 62) {
        return "B";
      } else {
        return "C";
      }
    }
  };

  getDiff = (item, type) => {
    return type === "g"
      ? `${item.diff_value.toFixed(2)} ${item.diff}-${item.part}`
      : `${item.diff_value.toFixed(2)} ${item.diff}`;
  };

  render() {
    const { data, caption, type, hasComparedSkill, ...rest } = this.props;

    return (
      <SkillTableRoot {...rest}>
        <caption>{this.props.caption}</caption>
        <thead>
          <tr>
            <SkillTableTh>曲名</SkillTableTh>
            <SkillTableTh>レベル</SkillTableTh>
            <SkillTableTh>達成率</SkillTableTh>
            <SkillTableTh>スキル</SkillTableTh>
            {hasComparedSkill && <SkillTableTh />}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <SkillTableTr key={item.name} diff={item.diff}>
              <SkillTableNameTd>{item.name}</SkillTableNameTd>
              <SkillTableTd>{this.getDiff(item, type)}</SkillTableTd>
              <SkillTableTd>{`${item.achive_value} (${this.getRank(
                item.achive_value
              )})`}</SkillTableTd>
              <SkillTableTd>{item.skill_value.toFixed(2)}</SkillTableTd>
              {hasComparedSkill && (
                <SkillTableCompareTd>{item.compare}</SkillTableCompareTd>
              )}
            </SkillTableTr>
          ))}
        </tbody>
      </SkillTableRoot>
    );
  }
}

const SkillTableRoot = styled.table`
  background-color: #ffffff;
  font-size: 14px;
  margin-top: 10px;
  max-width: 700px;

  @media (max-width: 742px) {
    max-width: 500px;
    font-size: 10px;
  }
`;

const SkillTableTh = styled.th`
  background-color: #5882fa;
`;

const SkillTableTr = styled.tr`
  height: 24px;
  background-color: ${({ diff }) =>
    ({
      BAS: "#C7E7FF",
      ADV: "#FFFFC7",
      EXT: "#FFC7C7",
      MAS: "#D8BFF8"
    }[diff])};

  @media (max-width: 742px) {
    height: 18px;
  }
`;

const SkillTableTd = styled.td`
  text-align: center;
  padding: 0 10px;
  white-space: nowrap;

  @media (max-width: 742px) {
    padding: 0 5px;
  }
`;

const SkillTableNameTd = styled(SkillTableTd)`
  width: 100%;
  max-width: 400px;
  text-align: left;
  white-space: normal;
  padding: 0 2px;

  @media (max-width: 742px) {
    max-width: 300px;
  }
`;

const SkillTableCompareTd = styled(SkillTableTd)`
  background-color: white;
  font-size: 12px;

  @media (max-width: 742px) {
    font-size: 10px;
  }
`;

export default SkillTable;
