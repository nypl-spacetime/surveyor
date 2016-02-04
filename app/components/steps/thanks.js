import React from 'react';

var owl = require('../../images/owl-small.png')

const Step = React.createClass({

  getInitialState: function() {
    return {
      timerStarted: false,
      duration: 4
    };
  },

  render: function() {
    var timerBarStyle = {
      width: this.state.timerStarted ? '100%' : 0,
      transitionDuration: `${this.state.duration}s`
    };

    return (
      <div className='geotagger-step all-margin-top opaque'>
        <h1>Thanks!</h1>
        <div>
          Thanks for geotagging this image. Soon, we will create new tools and
          visualizations to browse through the library's collection in space and time — keep an eye on the website of the <a href='http://spacetime.nypl.org/' target='_blank'>Space/Time Directory</a> project.
        </div>
        <div>
          <img className='centered-block geotagger-thanks-owl' src={owl} />
        </div>
        <div>
          <div className='geotagger-thanks-timer-bar' style={timerBarStyle} />
        </div>
        <div>
          <button className='button-green' onClick={this.done}>Show me another image!</button>
        </div>
      </div>
    );
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        timerStarted: true
      });
      // Initialize timer which proceeds to first step
      setTimeout(this.done, this.state.duration * 1000);
    }, 100);
  },

  done: function() {
    this.props.done();
  }
});

export default Step;
