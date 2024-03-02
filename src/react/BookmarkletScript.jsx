import React, { useState } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormattedMessage } from "react-intl";
import { ON_SERVICE_VERSIONS, VERSION_NAME } from "../constants";

function BookmarkletScript() {
  const [select, setSelect] = useState(ON_SERVICE_VERSIONS[1]);
  return (
    <>
      <ScriptDiv>
        {
          "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_latest.js';d.head.appendChild(s);}(document));"
        }
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
        {`javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_${select}.js';d.head.appendChild(s);}(document));`}
      </ScriptDiv>
    </>
  );
}

const ScriptDiv = styled.div`
  background: ${({ theme }) => theme.index.scriptBg};
  padding: 16px;
  border-radius: 6px;
  font-size: 80%;
  word-break: break-all;
  margin: 16px;
`;

const MuiSelect = styled(Select)`
  &&& {
    color: ${({ theme }) => theme.main};

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

export default BookmarkletScript;
