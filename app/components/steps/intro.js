import React from 'react';

const StepIntro = React.createClass({
  render: function() {
    return (
      <div className='geotagger-intro-earth'>
        <a href='#' onClick={this.done}>
          <img src='./images/earth.svg' />
        </a>
      </div>
    );
  },

  done: function() {
    this.props.done();
  }
});

export default StepIntro;
