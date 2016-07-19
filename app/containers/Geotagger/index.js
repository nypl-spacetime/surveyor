/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';

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

    return React.createElement(step.component, {
      next: this.nextStep.bind(this),
      submit: this.submitStep.bind(this),
      skip: this.skipStep.bind(this)
    })
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
