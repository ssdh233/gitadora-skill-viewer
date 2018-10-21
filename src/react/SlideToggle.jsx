import React from "react";

//import styles from "./SlideToggle.modules.scss";

class SlideToggle extends React.Component {
  static defaultProps = {
    defaultOpen: false,
    level: 1
  };

  _toggleDiv = () => {
    $(this.refs["toggle-div"]).slideToggle();
  };

  render() {
    const styles = {};

    const commonTitleProps = {
      className: styles.title,
      onClick: this._toggleDiv
    };
    return (
      <div className={styles[`level${this.props.level}`]}>
        {this.props.level === 1 && (
          <h1 {...commonTitleProps}>{this.props.title}</h1>
        )}
        {this.props.level === 2 && (
          <h2 {...commonTitleProps}>{this.props.title}</h2>
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

export default SlideToggle;
