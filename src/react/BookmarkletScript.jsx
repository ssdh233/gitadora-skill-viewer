import React, { useState } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormattedMessage } from "react-intl";

function BookmarkletScript() {
  const [select, setSelect] = useState("highvoltage");
  return (
    <>
      <ScriptDiv>
        {
          "javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_latest.js';d.head.appendChild(s);}(document));"
        }
      </ScriptDiv>

      <div>
        <FormattedMessage id="how.upload.step1.oldVersion" />
        <Select
          inputProps={{ name: "version" }}
          style={{ marginLeft: 10 }}
          value={select}
          onChange={event => {
            setSelect(event.target.value);
          }}
        >
          <MenuItem value="highvoltage">HIGH-VOLTAGE</MenuItem>
          <MenuItem value="nextage">NEX+AGE</MenuItem>
          <MenuItem value="exchain">EXCHAIN</MenuItem>
          <MenuItem value="matixx">Matixx</MenuItem>
          <MenuItem value="tbre">Tri-Boost Re:EVOLVE</MenuItem>
        </Select>
      </div>

      <ScriptDiv>
        {`javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='//gitadora-skill-viewer.herokuapp.com/js/uploaddata_${select}.js';d.head.appendChild(s);}(document));`}
      </ScriptDiv>
    </>
  );
}

const ScriptDiv = styled.div`
  background: #f6f6f6;
  padding: 20px;
  border-radius: 6px;
  font-size: 80%;
  word-break: break-all;
  margin-bottom: 20px;
`;

export default BookmarkletScript;
