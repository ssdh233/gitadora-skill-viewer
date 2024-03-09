import React, { useRef, useState } from "react";
import styled from "styled-components";

function SlideToggle(props) {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  const toggleDivEl = useRef(null);

  // TODO stop using $
  const handleToggleDiv = () => {
    // eslint-disable-next-line no-undef
    $(toggleDivEl.current).slideToggle(400, () => {
      setOpen(!open);
    });
  };

  return (
    <SlideToggleDiv>
      <Title onClick={handleToggleDiv} id={props.titleId}>
        {props.title}
      </Title>
      <div ref={toggleDivEl} style={{ display: open ? "normal" : "none" }}>
        {props.children}
      </div>
    </SlideToggleDiv>
  );
}

const SlideToggleDiv = styled.div`
  margin-bottom: 5px;
`;

const Title = styled.h2`
  height: 35px;
  line-height: 35px;
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.index.subHeader};
  background-color: ${({ theme }) => theme.index.subHeaderBg};
  cursor: pointer;
  padding: 0 4px;

  @media (max-width: 742px) {
    height: 30px;
    line-height: 30px;
  }
`;

export default SlideToggle;
