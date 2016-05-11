import React from 'react';

var owl = require('../../images/owl-small.png')

const Step = React.createClass({

  getInitialState: function() {
    return {
      timerStarted: false,
      duration: 2.5
    };
  },

  intitialTimeout: null,
  timerBarTimeout: null,

  render: function() {
    var timerBarStyle = {
      width: this.state.timerStarted ? '100%' : 0,
      transitionDuration: `${this.state.duration}s`
    };

    return (
      <div className='geotagger-step all-margin-top opaque'>
        <h1>Thank you!</h1>

        <div>
          <img className='centered-block geotagger-thanks-owl' src={owl} />
        </div>
        <div>
          <div className='geotagger-thanks-timer-bar' style={timerBarStyle} />
        </div>
        <div>
          <button className='button-green' onClick={this.done}>Show me another image</button>
        </div>
      </div>
    );
  },

  componentDidMount() {
    this.intitialTimeout = setTimeout(() => {
      this.setState({
        timerStarted: true
      });
      // Initialize timer which proceeds to first step
      this.timerBarTimeout = setTimeout(this.done, this.state.duration * 1000);
    }, 100);
  },

  done: function() {
    if (this.intitialTimeout) {
      clearTimeout(this.intitialTimeout);
    }

    if (this.timerBarTimeout) {
      clearTimeout(this.timerBarTimeout);
    }

    this.props.done();
  }
});

export default Step;
