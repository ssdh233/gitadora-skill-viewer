import React from "react";
import Radium from "radium";

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
    const commonTitleProps = {
      style: styles[`level${this.props.level}`].title,
      onClick: this._toggleDiv
    };

    return (
      <div style={styles[`level${this.props.level}`].div}>
        {this.props.level === 1 && (
          <h3 {...commonTitleProps}>{this.props.title}</h3>
        )}
        <div
          ref="toggle-div"
          style={{ display: this.props.defaultOpen ? "normal" : "none" }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

const titleCommonStyle = {
  fontWeight: "normal",
  margin: 0,
  color: "#ffffff",
  backgroundColor: "#333333"
};

const styles = {
  level1: {
    div: {
      marginBottom: "5px"
    },
    title: {
      fontSize: 19,
      height: 35,
      lineHeight: "35px",
      ...titleCommonStyle,

      "@media (max-width: 742px)": {
        height: 30,
        lineHeight: "30px",
        fontSize: 16
      }
    }
  }
};

export default Radium(SlideToggle);
