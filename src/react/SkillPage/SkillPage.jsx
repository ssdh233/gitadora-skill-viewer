import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import CompareArrows from "@material-ui/icons/CompareArrows";
import TextField from "@material-ui/core/TextField";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useLocalStorage from "../useLocalStorage";
import { VERSION_NAME, CURRENT_VERSION } from "../../constants.js";
import skillColorStyles from "../styles/skillColor.js";
import SkillTable from "./SkillTable.jsx";
import theme from "../styles/theme.js";

function getSkillPoint(skillData) {
  if (!skillData) return 0;
  return (Number(skillData.hot.point) + Number(skillData.other.point)).toFixed(
    2
  );
}

function SkillPage(props) {
  const history = useHistory();
  const [rivalInput, setRivalInput] = useState("");
  const [skillIdDescDialogOpen, setSkillIdDescDialogOpen] = useState(false);
  const [saveSkillDisabled, setSaveSkillDisabled] = useState(false);
  const gsvId = useLocalStorage("gsvId", null);
  const gsvName = useLocalStorage("gsvName", "");

  if (!props.skillData) {
    return null;
  }

  const { locale, version } = props.match.params;
  const {
    skill,
    playerId,
    playerName,
    updateDate,
    skillPointDiff
  } = props.skillData;

  const {
    playerId: rivalPlayId,
    playerName: rivalPlayerName,
    skill: rivalSkill
  } = props.rivalSkillData || {};

  const type = props.saved ? props.skillData.type : props.match.params.type;

  if (!skill) return null;

  const skillPoint = getSkillPoint(skill);
  const rivalSkillPoint = getSkillPoint(rivalSkill);

  const level = parseInt(skillPoint / 250);

  const fullVersionName = "GITADORA " + VERSION_NAME[version];

  const {
    intl: { formatMessage }
  } = props;

  const title = formatMessage(
    {
      id: "skill.title"
    },
    {
      name: playerName,
      type: type === "g" ? "Guitarfreaks" : "Drummania"
    }
  );

  const handleSaveSkill = async () => {
    setSaveSkillDisabled(true);
    if (props.onSaveSkill) {
      await props.onSaveSkill();
    }
    setSaveSkillDisabled(false);
  };

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
      {!props.saved && (
        <div style={{ margin: "3px 0" }}>
          {type === "g" && (
            <>
              <span>GuitarFreaks/</span>
              <Link to={`/${locale}/${version}/${playerId}/d`}>Drummania</Link>
            </>
          )}
          {type === "d" && (
            <>
              <Link to={`/${locale}/${version}/${playerId}/g`}>
                GuitarFreaks
              </Link>
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
            <ProfileTableTd className={`lv${Math.floor(level / 2)}`}>
              {playerName}
            </ProfileTableTd>
            <ProfileTableTd className={`lv${Math.floor(level / 2)}`}>
              {skillPoint}
            </ProfileTableTd>
            <ProfileTableTd className={`lv${Math.floor(level / 2)}`}>
              {skill.hot.point.toFixed(2)}
            </ProfileTableTd>
            <ProfileTableTd className={`lv${Math.floor(level / 2)}`}>
              {skill.other.point.toFixed(2)}
            </ProfileTableTd>
          </tr>
        </tbody>
      </ProfileTable>
      {props.rivalSkillData && (
        <p>
          <FormattedMessage
            id="skill.comparingWith"
            values={{
              something: (
                <Link
                  to={`/${locale}/${version}/${rivalPlayId}/${type}?r=${playerId}`}
                >
                  <FormattedMessage
                    id="skill.rivalSkill"
                    values={{
                      name: rivalPlayerName,
                      point: rivalSkillPoint
                    }}
                  ></FormattedMessage>
                </Link>
              )
            }}
          ></FormattedMessage>
          <Link to={`/${locale}/${version}/${playerId}/${type}`}>
            <FormattedMessage id="skill.cancel" />
          </Link>
        </p>
      )}
      {skill.hot.data && (
        <SkillTable
          id="skill-table-hot"
          data={skill.hot.data}
          rivalData={rivalSkill && rivalSkill.hot.data}
          type={type}
          caption={type === "g" ? "GUITAR HOT" : "DRUM HOT"}
          hasComparedSkill={props.hasComparedSkill}
        />
      )}
      {skill.other.data && (
        <SkillTable
          id="skill-table-other"
          data={skill.other.data}
          rivalData={rivalSkill && rivalSkill.other.data}
          type={type}
          caption={type === "g" ? "GUITAR OTHER" : "DRUM OTHER"}
          hasComparedSkill={props.hasComparedSkill}
        />
      )}
      <BottomDiv>
        <span>Updated at {updateDate}</span>
        <Link to={`/${locale}`}>
          <FormattedMessage id="skill.aboutGsv" />
        </Link>
      </BottomDiv>
      {props.saved ? (
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
            {[level * 250 - 250, level * 250, level * 250 + 250]
              .filter(scope => scope >= 3000)
              .map(scope => (
                <div key={scope}>
                  <Link
                    to={`/${locale}/${version}/kasegi/${type}/${scope}?c=${playerId}`}
                  >
                    <FormattedMessage
                      id="skill.compareWithKasegi"
                      values={{ scope: `${scope}~${scope + 250}` }}
                    />
                  </Link>
                </div>
              ))}
            {gsvId !== null &&
              gsvId !== String(playerId) &&
              version === CURRENT_VERSION && (
                <>
                  <Link
                    to={`/${locale}/${version}/${gsvId}/${type}?r=${playerId}`}
                  >
                    <FormattedMessage
                      id="skill.compareWithPlayer"
                      values={{ name: gsvName }}
                    />
                  </Link>
                </>
              )}
            <CompareForm
              onSubmit={event => {
                event.preventDefault();

                history.push(
                  `/${locale}/${version}/${playerId}/${type}?r=${rivalInput}`
                );
              }}
            >
              {formatMessage({ id: "skill.compareWith1" }) !== " " && (
                <LinkLikeButton
                  type="submit"
                  disabled={!rivalInput}
                  style={{ paddingLeft: 0 }}
                >
                  <FormattedMessage id="skill.compareWith1" />
                </LinkLikeButton>
              )}
              <TextField
                name="rivalId"
                style={{ width: 50 }}
                inputProps={{
                  style: { fontSize: 12 }
                }}
                value={rivalInput}
                onChange={event => setRivalInput(event.target.value)}
                placeholder={formatMessage({ id: "skill.skillId" })}
              />
              <HelpOutlineIcon
                style={{ fontSize: 16, cursor: "pointer" }}
                onClick={() => setSkillIdDescDialogOpen(true)}
              />
              {formatMessage({ id: "skill.compareWith2" }) !== " " && (
                <LinkLikeButton
                  type="submit"
                  disabled={!rivalInput}
                  style={{ paddingLeft: 0 }}
                >
                  <FormattedMessage id="skill.compareWith2" />
                </LinkLikeButton>
              )}
            </CompareForm>
          </div>
          <div style={{ marginTop: 20 }}>
            {props.skillSavedList && (
              <>
                <SavedListTable>
                  <caption style={{ color: theme.primary }}>
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
                    {props.skillSavedList.map((savedItem, index) => (
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
                            {savedItem.skillPoint.toFixed(2)}
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
                <button onClick={handleSaveSkill} disabled={saveSkillDisabled}>
                  <FormattedMessage id="skill.saveSkill" />
                </button>
              </>
            )}
          </div>
        </>
      )}

      <Dialog
        open={skillIdDescDialogOpen}
        onClose={() => setSkillIdDescDialogOpen(false)}
      >
        <DialogTitle>
          <FormattedMessage id="skill.skillId" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedHTMLMessage id="skill.skillIdDesc" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSkillIdDescDialogOpen(false)}
            color="primary"
            autoFocus
          >
            <FormattedMessage id="skill.skillIdOk" />
          </Button>
        </DialogActions>
      </Dialog>
    </SkillPageDiv>
  );
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

const SavedListTableTd = styled.td`
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

const CompareForm = styled.form`
  display: flex;
  align-items: center;
`;

const LinkLikeButton = styled.button`
  border: 0;
  background-color: white;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 742px) {
    font-size: 12px;
  }
`;

const stringStyles = skillColorStyles;

export default injectIntl(SkillPage);
