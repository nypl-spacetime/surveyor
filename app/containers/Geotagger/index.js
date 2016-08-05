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
  selectItem,
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
    if (!this.props.item.id) {
      return;
    }

    this.props.skipStep(
      this.props.item.provider,
      this.props.item.id,
      this.props.currentStep,
      this.props.currentStepIndex
    )
  }

  submitStep(data, geometry) {
    if (!this.props.item.id) {
      return;
    }

    this.props.submitStep(
      this.props.item.provider,
      this.props.item.id,
      this.props.currentStep,
      this.props.currentStepIndex,
      data,
      geometry
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    nextStep: () => {
      dispatch(nextStep());
    },
    submitStep: (provider, id, step, stepIndex, data, geometry) => {
      dispatch(submitStep(provider, id, step, stepIndex, data, geometry));
    },
    skipStep: (provider, id, step, stepIndex) => {
      dispatch(skipStep(provider, id, step, stepIndex));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectItem(),
  selectSteps(),
  selectCurrentStep(),
  selectCurrentStepIndex(),
  (item, steps, currentStep, currentStepIndex) => ({
    item, steps, currentStep, currentStepIndex
  })
), mapDispatchToProps)(Geotagger);
