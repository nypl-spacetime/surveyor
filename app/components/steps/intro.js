import React from 'react';

const earth = require('../../images/earth.svg');

const Step = React.createClass({
  render: function() {
    return (
      <div className='geotagger-intro-earth'>
        <a href='javascript:;' onClick={this.done}>
          <img src={earth} />
        </a>
      </div>
    );
  },

  done: function() {
    this.props.done();
  }
});

export default Step;
