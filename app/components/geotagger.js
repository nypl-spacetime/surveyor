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
              abort: this.abortStep,
              previous: this.previousStep,
              stepData: {}
          }) }
        </div>
      </div>
    );
  },

  reset: function() {
    // TODO: reset state of all steps

    this.setState({
      currentStep: 1
    });

    this.props.loadItem();
  },

  nextStep: function() {
    if (this.state.currentStep === 0) {
      this.props.onStart();
    }

    if (this.state.currentStep < this.state.steps.length - 1) {
      this.setState({
        currentStep: this.state.currentStep + 1
      });
    } else {
      this.reset();
    }
  },

  abortStep: function() {
    var stepIndex = this.state.currentStep;
    var step = this.state.steps[stepIndex];

    this.props.sendData(step.id, stepIndex, false, (err) => {
      if (err) {
        console.error('Error sending data to server', err);
      } else {
        this.reset();
      }
    });
  },

  previousStep: function() {
    console.log('Go to previous step!');
  },

  doneStep: function(data, geometry) {
    if (data) {
      var stepIndex = this.state.currentStep;
      var step = this.state.steps[stepIndex];

      this.props.sendData(step.id, stepIndex, true, data, geometry, (err) => {
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
