import React from "react";

class SlideToggle extends React.Component {
  constructor(props) {
    super(props);
    this._toggleDiv = this._toggleDiv.bind(this);
  }

  _toggleDiv() {
    $(this.refs["toggle-div"]).slideToggle();
  }

  render() {
    const { t } = this.props;
    let titleStyle = {};
    let blockStyle = {};
    switch (this.props.level) {
      case 0:
        titleStyle = {
          fontSize: "120%",
          height: "35px",
          color: "#FFFFFF",
          backgroundColor: "#333333"
        };
        break;
      case 1:
        titleStyle = {
          fontSize: "100%",
          height: "30px",
          margin: "5px 0px 5px 20px",
          color: "#FFFFFF",
          backgroundColor: "#333333"
        };
        blockStyle = {
          margin: "5px 0px 5px 20px"
        };
        break;
      default:
    }
    blockStyle = Object.assign(
      blockStyle,
      this.props.defaultOpen ? { display: "normal" } : { display: "none" }
    );
    return (
      <div>
        <div style={titleStyle} onClick={this._toggleDiv}>
          {this.props.title}
        </div>
        <div ref="toggle-div" style={blockStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SlideToggle;
