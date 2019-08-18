import React from "react";
import styled from "styled-components";

class SlideToggle extends React.Component {
  static defaultProps = {
    defaultOpen: false,
    level: 1
  };

  // TODO stop using $
  _toggleDiv = () => {
    $(this.refs["toggle-div"]).slideToggle();
  };

  render() {
    const SlideToggleDiv = styled.div`
      margin-bottom: 5px;
    `;

    return (
      <SlideToggleDiv>
        {this.props.level === 1 && (
          <Title onClick={this._toggleDiv}>{this.props.title}</Title>
        )}
        <div
          ref="toggle-div"
          style={{ display: this.props.defaultOpen ? "normal" : "none" }}
        >
          {this.props.children}
        </div>
      </SlideToggleDiv>
    );
  }
}

const Title = styled.h3`
font-size: 19px;
height: 35px;
line-height: 35px,
font-weight: normal;
margin: 0;
color: #ffffff;
background-color: #333333;

@media (max-width: 742px): {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
`;

export default SlideToggle;
