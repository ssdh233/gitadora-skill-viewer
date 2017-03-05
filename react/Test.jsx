import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

import Expandable from './Expandable.jsx';

class Test extends React.Component {

  render () {
    return (
      <div>
        <p>Test</p>
        <Link to="/">Index</Link>
        <Expandable></Expandable>
      </div>
    );
  }
}

export default Test;