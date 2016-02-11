import React from 'react';

import './loading.scss';

var nypl = require('../images/nypl-white.svg')

const Loading = React.createClass({
  render: function() {
    var message = 'Loading…';
    var className='loading-message';

    if (this.props.error) {
      message = `Error: ${this.props.error}`;
      className += ' loading-error'
    }

    return (
      <div className='loading'>
        <img src={nypl} />
        <div className={className}>{message}</div>
      </div>
    );

  }

});

export default Loading;
