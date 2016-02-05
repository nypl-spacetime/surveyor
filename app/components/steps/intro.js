import React from 'react';

import '../pin.scss';

var svgs = {
  help: require('../../images/help.svg'),
  pin: require('../../images/pin.svg'),
  shadow: require('../../images/shadow.svg'),
  earth: require('../../images/earth.svg')
};

const Step = React.createClass({

  render: function() {
    return (
      <div className='geotagger-step geotagger-intro'>
        <div className='geotagger-intro-pin-container' onClick={this.done}>
          <img src={svgs.help} className='geotagger-intro-help' />
          <img src={svgs.pin} className='geotagger-intro-pin' />
          <img src={svgs.shadow} className='geotagger-intro-shadow' />
          <img src={svgs.earth} className='geotagger-intro-earth' />
        </div>
      </div>
    );
  },

  done: function() {
    this.props.done();
  }
});

export default Step;
