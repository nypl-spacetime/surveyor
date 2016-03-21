import React from 'react';

import './loading.scss';

var nypl = require('../images/nypl-white.svg')

const Loading = React.createClass({
  getInitialState: function() {
    return {
      loading: true
    }
  },

  render: function() {
    var message = 'Loading…';
    var className='loading-message';

    if (this.props.error) {
      message = `Error: ${this.props.error}`;
      className += ' loading-error'
    }

    if (!this.state.loading || this.props.error) {
      return (
        <div className='loading'>
          <img src={nypl} />
          <div className={className}>{message}</div>
        </div>
      );
    } else {
      return null
    }
  },

  componentDidMount: function() {
    window.setTimeout(() => this.setState({
      loading: false
    }), 500);
  }

});

export default Loading;
