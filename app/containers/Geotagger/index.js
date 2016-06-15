/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  selectUuid,
  selectSteps,
  selectCurrentStep,
  selectCurrentStepIndex
} from 'containers/App/selectors';

import {
  nextStep,
  submitStep,
  skipStep
} from '../App/actions';

var StepContainers = {};

function requireAll(r) {
  r.keys().forEach((filename, i) => {
    const step = filename.match(/\.\/(.*)\.js/)[1];
    StepContainers[step] = r(filename).default;
  });
}
requireAll(require.context('containers/Steps/', false, /\.js$/));

import styles from './styles.css';

export class Geotagger extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      steps: this.props.steps.map(step => ({
        step: step,
        component: StepContainers[step]
      }))
    };
  }

  render() {
    var step = this.state.steps[this.props.currentStepIndex];

    return (
      <div className={`${styles.container}`}>
        { React.createElement(step.component, {
          next: this.nextStep.bind(this),
          submit: this.submitStep.bind(this),
          skip: this.skipStep.bind(this)
        }) }
      </div>
    );
  }

  nextStep() {
    this.props.nextStep()
  }

  skipStep() {
    this.props.skipStep(
      this.props.uuid,
      this.props.currentStep,
      this.props.currentStepIndex
    )
  }

  submitStep(data, geometry) {
    this.props.submitStep(
      this.props.uuid,
      this.props.currentStep,
      this.props.currentStepIndex,
      data,
      geometry
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    nextStep: (uuid, step, stepIndex) => {
      dispatch(nextStep(uuid, step, stepIndex));
    },
    submitStep: (uuid, step, stepIndex, data, geometry) => {
      dispatch(submitStep(uuid, step, stepIndex, data, geometry));
    },
    skipStep: (uuid, step, stepIndex) => {
      dispatch(skipStep(uuid, step, stepIndex));
    },
    dispatch
  };
}


export default connect(null, mapDispatchToProps)(Geotagger);





// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectUuid(),
  selectSteps(),
  selectCurrentStep(),
  selectCurrentStepIndex(),
  (uuid, steps, currentStep, currentStepIndex) => ({
    uuid, steps, currentStep, currentStepIndex
  })
), mapDispatchToProps)(Geotagger);





// function mapDispatchToProps(dispatch) {
//   return {
//     submitStep: (step, data, geometry) => {
//       dispatch(submitStep(submitStep));
//     },
//     skipStep: (step) => {
//       dispatch(skipStep());
//     },
//     dispatch
//   };
// }
//
// // Wrap the component to inject dispatch and state into it
// export default connect(createSelector(
//   selectCurrentStep()
//   (currentStep) => ({
//     currentStep
//   })
// ), mapDispatchToProps)(Geotagger);
//










// import React from 'react';
//
// var Steps = {};
// function requireAll(r) {
//   r.keys().forEach((filename, i) => {
//     var step = filename.match(/\.\/(.*)\.js/)[1];
//     Steps[step] = r(filename).default;
//   });
// }
// requireAll(require.context('./steps/', false, /\.js$/));
//
// const steps = [
//   'intro',
//   'location',
//   'bearing-introduction',
//   'bearing',
//   'thanks',
// ];
//
// import './geotagger.scss';
// import './buttons.scss';
//
// const GeoTagger = React.createClass({
//
//   getInitialState: function() {
//     return {
//       currentStep: 0,
//       stepData: {},
//       steps: steps.map(step => ({
//         step: step,
//         component: Steps[step]
//       }))
//     };
//   },
//
//   render: function() {
//     var step = this.state.steps[this.state.currentStep];
//     return (
//       <div className='geotagger'>
//         <div className='geotagger-step-container'>
//           { React.createElement(step.component, {
//               defaults: this.props.defaults,
//               done: this.doneStep,
//               skip: this.skipStep,
//               reset: this.reset,
//               thanks: this.thanks,
//               help: this.help,
//               stepData: this.state.stepData
//           }) }
//         </div>
//       </div>
//     );
//   },
//
//   reset: function() {
//     this.setState({
//       currentStep: 1
//     });
//
//     this.props.loadItem();
//   },
//
//   thanks: function() {
//     this.setState({
//       currentStep: this.state.steps.length - 1
//     });
//   },
//
//   help: function() {
//     var stepIndex = this.state.currentStep
//     var step = this.state.steps[stepIndex]
//     this.props.showHelp(step)
//   },
//
//   nextStep: function(data, geometry) {
//     if (this.state.currentStep === 0) {
//       this.props.onStart();
//     }
//
//     if (this.state.currentStep < this.state.steps.length - 1) {
//       var stepIndex = this.state.currentStep;
//       var step = this.state.steps[stepIndex];
//       var stepData = this.state.stepData;
//       stepData[step.step] = {
//         data: data,
//         geometry: geometry
//       };
//
//       this.setState({
//         currentStep: this.state.currentStep + 1,
//         stepData: stepData
//       });
//     } else {
//       this.reset();
//     }
//   },
//
//   skipStep: function() {
//     var stepIndex = this.state.currentStep;
//     var step = this.state.steps[stepIndex];
//
//     this.props.sendData(step.step, stepIndex, true, (err) => {
//       if (err) {
//         console.error('Error sending data to server', err);
//       } else {
//         this.thanks();
//       }
//     });
//   },
//
//   previousStep: function() {
//     console.log('Go to previous step!');
//   },
//
//   doneStep: function(data, geometry) {
//     if (data) {
//       var stepIndex = this.state.currentStep;
//       var step = this.state.steps[stepIndex];
//
//       this.props.sendData(step.step, stepIndex, false, data, geometry, (err) => {
//         if (err) {
//           console.error('Error sending data to server', err);
//         } else {
//           this.nextStep(data, geometry);
//         }
//       });
//     } else {
//       this.nextStep();
//     }
//   }
//
// });
//
// export default GeoTagger;
