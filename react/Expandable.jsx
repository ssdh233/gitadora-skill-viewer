import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

import transitions from 'material-ui/styles/transitions';

const styles = {
  root: {
    background: '#f8f8f8',
    borderTop: 'solid 1px #e0e0e0',
  },
  codeBlockTitle: {
    cursor: 'pointer',
  },
}

class Expandable extends React.Component {

  state = {
    expand: false,
  };

  handleTouchTap = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };

  render () {
    let divStyle = {};
    if(!this.state.expand){
      divStyle = {maxHeight: 0};
    }
    return (
      <div style={styles.root}>
        <div onTouchTap={this.handleTouchTap} style={styles.codeBlockTitle}>
          hahaha
        </div>
        <div style={divStyle}>
          hehehe
        </div>
      </div>
    );
  }
}

export default Expandable;