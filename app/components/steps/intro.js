import React from 'react';

const earth = require('../../images/earth.svg');

const Step = React.createClass({

  getInitialState: function() {
    return {
      animationStarted: false,
      duration: 1
    };
  },

  render: function() {

    var earthStyle = {
      height: this.state.animationStarted ? '100%' : '60%',
      transitionDuration: `${this.state.duration}s`
    };

    return (
      <div className='geotagger-step geotagger-intro'>
        <div className='geotagger-intro-help' />
        <div className='geotagger-intro-earth'>
          <a href='javascript:;' onClick={this.done}>
            <img className='geotagger-intro-earth' src={earth} style={earthStyle} />
          </a>
        </div>
      </div>
    );
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animationStarted: true
      });
    }, 100);
  },

  done: function() {
    this.props.done();
  }
});

export default Step;
