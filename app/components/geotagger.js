import React from 'react';

var Steps = {};
function requireAll(r) {
  r.keys().forEach((filename, i) => {
    var step = filename.match(/\.\/(.*)\.js/)[1];
    Steps[step] = r(filename).default;
  });
}
requireAll(require.context('./steps/', false, /\.js$/));

const steps = [
  'intro',
  'location',
  'bearing',
  'thanks',
];

import './geotagger.scss';
import './buttons.scss';

const GeoTagger = React.createClass({

  getInitialState: function() {
    return {
      currentStep: 0,
      stepData: {},
      steps: steps.map(step => ({
        step: step,
        component: Steps[step]
      }))
    };
  },

  render: function() {
    var step = this.state.steps[this.state.currentStep];
    return (
      <div className='geotagger'>
        <div className='geotagger-step-container'>
          { React.createElement(step.component, {
              defaults: this.props.defaults,
              done: this.doneStep,
              abort: this.abortStep,
              reset: this.reset,
              thanks: this.thanks,
              stepData: this.state.stepData
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

  thanks: function() {
    this.setState({
      currentStep: this.state.steps.length - 1
    });
  },

  nextStep: function(data, geometry) {
    if (this.state.currentStep === 0) {
      this.props.onStart();
    }

    if (this.state.currentStep < this.state.steps.length - 1) {
      var stepIndex = this.state.currentStep;
      var step = this.state.steps[stepIndex];
      var stepData = this.state.stepData;
      stepData[step.step] = {
        data: data,
        geometry: geometry
      };

      this.setState({
        currentStep: this.state.currentStep + 1,
        stepData: stepData
      });
    } else {
      this.reset();
    }
  },

  abortStep: function() {
    var stepIndex = this.state.currentStep;
    var step = this.state.steps[stepIndex];

    this.props.sendData(step.step, stepIndex, false, (err) => {
      if (err) {
        console.error('Error sending data to server', err);
      } else {
        this.thanks();
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

      this.props.sendData(step.step, stepIndex, true, data, geometry, (err) => {
        if (err) {
          console.error('Error sending data to server', err);
        } else {
          this.nextStep(data, geometry);
        }
      });
    } else {
      this.nextStep();
    }
  }

});

export default GeoTagger;
