import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormattedMessage } from "react-intl";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";

import { CURRENT_VERSION, ON_SERVICE_VERSIONS, VERSION_NAME } from "../../constants";
import { Snackbar } from "@material-ui/core";

function BookmarkletScript() {
  const [select, setSelect] = useState(ON_SERVICE_VERSIONS[1]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const latestScript = `javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_latest.js';d.head.appendChild(s);}(document));`;

  const versionScript = `javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_${select}.js';d.head.appendChild(s);}(document));`;

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
    }
  }, [snackbarOpen]);

  return (
    <>
      <div>
        <FormattedMessage id="how.upload.step1.currentVersion" />
        {" " + VERSION_NAME[CURRENT_VERSION] + " "}
        <Desc>
          <FormattedMessage id="how.upload.step1.currentVersionDesc" />
        </Desc>
      </div>

      <ScriptDiv>
        <span>{latestScript}</span>
        <MuiIconButton
          onClick={() => {
            navigator.clipboard.writeText(latestScript);
            setSnackbarOpen(true);
          }}
        >
          <FileCopyIcon fontSize="small" />
        </MuiIconButton>
      </ScriptDiv>

      <div>
        <FormattedMessage id="how.upload.step1.oldVersion" />
        <MuiSelect
          inputProps={{ name: "version" }}
          style={{ marginLeft: 10 }}
          value={select}
          onChange={event => {
            setSelect(event.target.value);
          }}
        >
          {ON_SERVICE_VERSIONS.slice(1).map(version => (
            <MenuItem key={version} value={version}>
              {VERSION_NAME[version]}
            </MenuItem>
          ))}
        </MuiSelect>
      </div>

      <ScriptDiv>
        <span>{versionScript}</span>
        <MuiIconButton
          onClick={() => {
            navigator.clipboard.writeText(versionScript);
            setSnackbarOpen(true);
          }}
        >
          <FileCopyIcon fontSize="small" />
        </MuiIconButton>
      </ScriptDiv>

      <MuiSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        message={
          <span id="message-id">
            <FormattedMessage id="how.upload.step1.copied" defaultMessage="クリップボードにコピーしました。" />
          </span>
        }
      />
    </>
  );
}

const ScriptDiv = styled.div`
  background: ${({ theme }) => theme.index.scriptBg};
  border-radius: 6px;
  font-size: 80%;
  word-break: break-all;
  margin: 16px;
  display: flex;

  > span {
    padding: 16px 0 16px 16px;
  }
`;

const MuiIconButton = styled(IconButton)`
  &&& {
    align-self: center;
    cursor: pointer;
    color: ${({ theme }) => theme.header.button};
  }
`;

const MuiSelect = styled(Select)`
  &&& {
    color: ${({ theme }) => theme.main};
    font-size: 16px;

    @media (max-width: 742px) {
      font-size: 14px;
    }

    > svg {
      color: ${({ theme }) => theme.main};
    }

    ::before {
      border-bottom: 1px solid ${({ theme }) => theme.main};
    }

    ::after {
      border-bottom: 2px solid ${({ theme }) => theme.main};
    }
  }
`;

const MuiSnackbar = styled(Snackbar)`
  & .MuiPaper-root {
    background: ${({ theme }) => theme.index.snackBarBg};
    min-width: unset;
  }
`;

const Desc = styled.span`
  font-size: 14px;

  @media (max-width: 742px) {
    font-size: 12px;
  }
`;

export default BookmarkletScript;
