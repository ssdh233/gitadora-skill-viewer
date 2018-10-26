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
        {this.props.level === 2 && (
          <h4 {...commonTitleProps}>{this.props.title}</h4>
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
      fontSize: "120%",
      height: 35,
      ...titleCommonStyle
    }
  },
  level2: {
    div: {
      margin: "5px 0px 5px 20px"
    },
    title: {
      fontSize: "100%",
      height: 30,
      ...titleCommonStyle
    }
  }
};

export default SlideToggle;
