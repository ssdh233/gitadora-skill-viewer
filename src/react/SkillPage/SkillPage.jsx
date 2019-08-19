import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import CompareArrows from "@material-ui/icons/CompareArrows";

import { VERSION_NAME } from "../../constants.js";
import skillColorStyles from "../styles/skillColor.js";
import SkillTable from "./SkillTable.jsx";

class SkillPage extends React.Component {
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

  render() {
    if (!this.props.skillData) {
      return null;
    }

    const { locale, version, id } = this.props.match.params;
    const {
      skillData,
      playerName,
      updateDate,
      playerId,
      skillPointDiff
    } = this.props.skillData;

    const type = this.props.saved
      ? this.props.skillData.type
      : this.props.match.params.type;

    if (!skillData) return null;

    const skillPoint = (
      Number(skillData.hot.point) + Number(skillData.other.point)
    ).toFixed(2);
    const level = parseInt(skillPoint / 500);

    const fullVersionName = VERSION_NAME[version];

    const {
      intl: { formatMessage }
    } = this.props;

    const title = formatMessage(
      {
        id: "skill.title"
      },
      {
        name: playerName,
        type: type === "g" ? "Guitarfreaks" : "Drummania"
      }
    );

    return (
      <SkillPageDiv>
        <Helmet>
          <title>{`${title} | ${fullVersionName}`}</title>
          <meta name="twitter:card" content="summary" />
          <meta property="og:url" content="gsv.fun" />
          <meta
            property="og:title"
            content={`${title} ${skillPoint} ${
              skillPointDiff ? `(${skillPointDiff}↑)` : ""
            }`}
          />
          <style>{stringStyles}</style>
        </Helmet>
        <VersionDiv>{fullVersionName}</VersionDiv>
        {!this.props.saved && (
          <div style={{ margin: "3px 0" }}>
            {type === "g" && (
              <>
                <span>GuitarFreaks/</span>
                <Link to={`/${locale}/${version}/${id}/d`}>Drummania</Link>
              </>
            )}
            {type === "d" && (
              <>
                <Link to={`/${locale}/${version}/${id}/g`}>GuitarFreaks</Link>
                <span>/Drummania</span>
              </>
            )}
          </div>
        )}
        <ProfileTable>
          <thead>
            <tr>
              <ProfileTableTh>NAME</ProfileTableTh>
              <ProfileTableTh>SKILL</ProfileTableTh>
              <ProfileTableTh>HOT</ProfileTableTh>
              <ProfileTableTh>OTHER</ProfileTableTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <ProfileTableTd className={`lv${level}`}>
                {playerName}
              </ProfileTableTd>
              <ProfileTableTd className={`lv${level}`}>
                {skillPoint}
              </ProfileTableTd>
              <ProfileTableTd className={`lv${level}`}>
                {skillData.hot.point}
              </ProfileTableTd>
              <ProfileTableTd className={`lv${level}`}>
                {skillData.other.point}
              </ProfileTableTd>
            </tr>
          </tbody>
        </ProfileTable>
        {skillData.hot.data && (
          <SkillTable
            id="skill-table-hot"
            data={skillData.hot.data}
            type={type}
            caption={type === "g" ? "GUITAR HOT" : "DRUM HOT"}
            hasComparedSkill={this.props.hasComparedSkill}
          />
        )}
        {skillData.other.data && (
          <SkillTable
            id="skill-table-other"
            data={skillData.other.data}
            type={type}
            caption={type === "g" ? "GUITAR OTHER" : "DRUM OTHER"}
            hasComparedSkill={this.props.hasComparedSkill}
          />
        )}
        <BottomDiv>
          <span>Updated at {updateDate}</span>
          <Link to={`/${locale}`}>
            <FormattedMessage id="skill.aboutGsv" />
          </Link>
        </BottomDiv>
        {this.props.saved ? (
          <div>
            <Link to={`/${locale}/${version}/${playerId}/${type}`}>
              <FormattedMessage
                id="skill.latestSkill"
                values={{ name: playerName }}
              />
            </Link>
          </div>
        ) : (
          <>
            <div>
              {[level * 500 - 500, level * 500, level * 500 + 500]
                .filter(scope => scope >= 3000)
                .map(scope => (
                  <div key={scope}>
                    <Link
                      to={`/${locale}/${version}/kasegi/${type}/${scope}?c=${id}`}
                    >
                      <FormattedMessage
                        id="skill.compareWithKasegi"
                        values={{ scope: `${scope}~${scope + 500}` }}
                      />
                    </Link>
                  </div>
                ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                style={{ marginBottom: 10 }}
                variant="outlined"
                size="small"
                onClick={() => this.props.onSaveSkill({ id, type, skillPoint })}
              >
                <FormattedMessage id="skill.saveSkill" />
              </Button>
              {this.props.skillSavedList && (
                <SavedListTable>
                  <caption style={{ color: "black" }}>
                    <FormattedMessage id="skill.savedList" />
                  </caption>
                  <thead>
                    <tr>
                      <SavedListTableTh>No.</SavedListTableTh>
                      <SavedListTableTh>SKILL</SavedListTableTh>
                      <SavedListTableTh>DATE</SavedListTableTh>
                      <SavedListTableTh />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.skillSavedList.map((savedItem, index) => (
                      <tr key={savedItem.updateDate}>
                        <SavedListTableTd
                          className={`lv${parseInt(
                            savedItem.skillPoint / 500
                          )}`}
                        >
                          <Link
                            to={`/${locale}/${version}/${savedItem.skillId}/p`}
                          >
                            {index + 1}
                          </Link>
                        </SavedListTableTd>
                        <SavedListTableTd
                          className={`lv${parseInt(
                            savedItem.skillPoint / 500
                          )}`}
                        >
                          <Link
                            to={`/${locale}/${version}/${savedItem.skillId}/p`}
                          >
                            {savedItem.skillPoint}
                          </Link>
                        </SavedListTableTd>
                        <SavedListTableTd
                          className={`lv${parseInt(
                            savedItem.skillPoint / 500
                          )}`}
                        >
                          <Link
                            to={`/${locale}/${version}/${savedItem.skillId}/p`}
                          >
                            {savedItem.updateDate}
                          </Link>
                        </SavedListTableTd>
                        <SavedListTableTd>
                          <Link to={`?c=${savedItem.skillId}`}>
                            <CompareArrows
                              style={{ fontSize: 16, color: "white" }}
                            />
                          </Link>
                        </SavedListTableTd>
                      </tr>
                    ))}
                  </tbody>
                </SavedListTable>
              )}
            </div>
          </>
        )}
      </SkillPageDiv>
    );
  }
}

const SkillPageDiv = styled.div`
  font-size: 14px;

  @media (max-width: 742px) {
    font-size: 12px;
  }
`;

const VersionDiv = styled.div`
  font-family: Andada;
  font-weight: bold;
  font-size: 17px;

  @media (max-width: 742px) {
    font-size: 15px;
  }
`;

const ProfileTable = styled.table`
  background-color: #000000;
  color: white;
  margin: 10px 0;
`;

const ProfileTableTh = styled.th`
  background-color: #333333;
  padding: 2px 10px 2px 10px;
  font-weight: normal;
  text-align: left;
`;

const ProfileTableTd = styled.td`
  padding: 2px 10px 2px 10px;
`;

const SavedListTable = styled.table`
  background-color: #000000;
  color: white;
  margin-bottom: 10px;
  font-size: 12px;
`;

const SavedListTableTh = styled.th`
  background-color: #333333;
  text-align: left;
  font-weight: normal;
  line-height: 20px;
  padding: 2px;
`;

const SavedListTableTd = styled.th`
  line-height: 20px;
  padding: 2px;
`;

const BottomDiv = styled.div`
  max-width: 700px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 742px) {
    max-width: 500px;
  }
`;

const stringStyles = skillColorStyles;

export default injectIntl(SkillPage);
