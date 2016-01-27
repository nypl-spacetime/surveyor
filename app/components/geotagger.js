import React from 'react';

import StepIntro from './steps/intro';
import StepMap from './steps/map';
import StepDirection from './steps/direction';
import StepThanks from './steps/thanks';

import './geotagger.scss';
import './buttons.scss';

const GeoTagger = React.createClass({

  getInitialState: function() {
    return {
      currentStep: 0,
      steps: [
        { id: 'intro', component: StepIntro, props: { } },
        { id: 'map', component: StepMap, props: { } },
        { id: 'thanks', component: StepThanks, props: { } }
        // { id: 'direction', component: StepDirection, props: { } }
      ]
    };
  },

  render: function() {
    var step = this.state.steps[this.state.currentStep];
    return (
      <div className='geotagger'>
        <div className='geotagger-help' />
        <div className='geotagger-step-container'>
          { React.createElement(step.component, {
              done: this.doneStep,
              reset: this.reset
          }) }
        </div>
      </div>
    );
  },

  reset: function() {
    this.setState({
      currentStep: 1
    });

    this.props.loadItem();
  },

  nextStep: function() {
    if (this.state.currentStep < this.state.steps.length - 1) {
      this.setState({
        currentStep: this.state.currentStep + 1
      });
    }
  },

  doneStep: function(feature) {
    if (feature) {
      var step = this.state.steps[this.state.currentStep];
      this.props.sendFeature(step.id, feature, (err) => {
        if (err) {
          console.error('Error sending data to server', err);
        } else {
          this.nextStep();
        }
      });
    } else {
      this.nextStep();
    }
  }

});

export default GeoTagger;
