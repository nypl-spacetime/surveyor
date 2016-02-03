import React from 'react';

const Step = React.createClass({
  render: function() {
    return (
      <div className='geotagger-step opaque'>
        Thanks for locating this image on the map!
        <div className='margin-top'>
          <button className='button-green' onClick={this.done}>More, more, more!</button>
        </div>
      </div>
    );
  },

  done: function() {
    this.props.done();
  }
});

export default Step;
