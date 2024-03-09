import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

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
    const { data, rivalData, caption, type, hasComparedSkill, ...rest } = this.props;

    let combinedData = data.map((item, index) => ({
      index: index + 1,
      ...item
    }));

    if (rivalData) {
      rivalData.forEach(rivalItem => {
        let sameItem = combinedData.find(item => {
          return (
            item.name === rivalItem.name &&
            item.diff === rivalItem.diff &&
            item.diff_value === rivalItem.diff_value &&
            item.part === rivalItem.part
          );
        });

        if (sameItem) {
          sameItem.rivalAchieveValue = rivalItem.achive_value;
          sameItem.rivalSkillValue = rivalItem.skill_value;
        } else {
          combinedData.push({ index: "", ...rivalItem });
        }
      });
    }

    return (
      <SkillTableRoot {...rest}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <SkillTableTh />
            <SkillTableTh>
              <FormattedMessage id="skill.songName" />
            </SkillTableTh>
            <SkillTableTh>
              <FormattedMessage id="skill.level" />
            </SkillTableTh>
            <SkillTableTh>
              <FormattedMessage id="skill.achieve" />
            </SkillTableTh>
            <SkillTableTh>
              <FormattedMessage id="skill.skillPoint" />
            </SkillTableTh>
            {hasComparedSkill && <th />}
          </tr>
        </thead>
        <tbody>
          {combinedData
            .sort((a, b) => b.skill_value - a.skill_value)
            .map(item => (
              <SkillTableTr key={item.name + " " + item.diff} diff={item.diff} isRivalData={!item.index}>
                <SkillTableNoTd>{item.index}</SkillTableNoTd>
                <SkillTableNameTd>{item.name}</SkillTableNameTd>
                <SkillTableTd>{this.getDiff(item, type)}</SkillTableTd>
                <SkillTableTd>
                  {`${item.achive_value} (${this.getRank(item.achive_value)})`}
                  {item.rivalAchieveValue && (
                    <>
                      <br />
                      <RivalData win={item.skill_value >= item.rivalSkillValue}>
                        {`${item.rivalAchieveValue} (${this.getRank(item.rivalAchieveValue)})`}
                      </RivalData>
                    </>
                  )}
                </SkillTableTd>
                <SkillTableTd>
                  {item.skill_value.toFixed(2)}
                  {item.rivalSkillValue && (
                    <>
                      <br />
                      <RivalData win={item.skill_value >= item.rivalSkillValue}>
                        {item.rivalSkillValue.toFixed(2)}
                      </RivalData>
                    </>
                  )}
                </SkillTableTd>
                {hasComparedSkill && <SkillTableCompareTd>{item.compare}</SkillTableCompareTd>}
              </SkillTableTr>
            ))}
        </tbody>
      </SkillTableRoot>
    );
  }
}

const SkillTableRoot = styled.table`
  font-size: 14px;
  margin-top: 10px;
  max-width: 700px;
  opacity: ${({ theme }) => theme.skill.tableOpacity};

  @media (max-width: 742px) {
    max-width: 500px;
    font-size: 10px;
  }

  & > caption {
    font-size: 14px;

    @media (max-width: 742px) {
      font-size: 12px;
    }
  }
`;

const SkillTableTh = styled.th`
  color: ${({ theme }) => theme.skill.table};
  background-color: #5882fa;
  height: 22px;
`;

const SkillTableTr = styled.tr`
  color: ${({ theme }) => theme.skill.table};
  height: 24px;
  background-color: ${({ diff, isRivalData, theme }) => {
    if (isRivalData) return "darkgrey";

    return (
      {
        BAS: "#C7E7FF",
        ADV: "#FFFFC7",
        EXT: "#FFC7C7",
        MAS: "#D8BFF8"
      }[diff] + theme.skill.tableBgHexOpacity
    );
  }};

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

const SkillTableNoTd = styled(SkillTableTd)`
  padding: 0 5px;

  @media (max-width: 742px) {
    padding: 0 3px;
  }
`;

const SkillTableNameTd = styled(SkillTableTd)`
  width: 100%;
  max-width: 400px;
  text-align: left;
  white-space: normal;
  padding: 0 5px;

  @media (max-width: 742px) {
    padding: 0 3px;
  }
`;

const SkillTableCompareTd = styled.td`
  text-align: left;
  color: ${({ theme }) => theme.main};
  background-color: ${({ theme }) => theme.mainBg};
  font-size: 12px;

  @media (max-width: 742px) {
    font-size: 10px;
  }
`;

const RivalData = styled.span`
  color: ${({ win }) => (win ? "green" : "red")};
`;

export default SkillTable;
