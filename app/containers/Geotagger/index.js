import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem,
  selectSteps,
  selectCurrentStep,
  selectSavedStepData,
  selectCurrentStepIndex
} from 'containers/App/selectors'

import {
  nextStep,
  submitStep,
  skipStep,
  saveStep
} from '../App/actions'

let StepContainers = {}
function requireAll (r) {
  r.keys().forEach((filename) => {
    const step = filename.match(/\/(.*)\/index\.js$/)[1].toLowerCase()
    StepContainers[step] = r(filename).default
  })
}
requireAll(require.context('containers/Steps/', true, /index\.js$/))

export class Geotagger extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      steps: this.props.steps.map(step => ({
        step: step,
        component: StepContainers[step]
      }))
    }
  }

  render () {
    const step = this.state.steps[this.props.currentStepIndex]
    return React.createElement(step.component, {
      next: this.nextStep.bind(this),
      submit: this.submitStep.bind(this),
      skip: this.skipStep.bind(this),
      save: this.saveStep.bind(this),
      savedStepData: this.props.savedStepData
    })
  }

  nextStep () {
    this.props.nextStep()
  }

  saveStep (data) {
    this.props.saveStep(
      this.props.currentStepIndex,
      data
    )
  }

  skipStep () {
    if (!this.props.item.id) {
      return
    }

    this.props.skipStep(
      this.props.item.organization.id,
      this.props.item.id,
      this.props.currentStep,
      this.props.currentStepIndex
    )
  }

  submitStep (data) {
    if (!this.props.item.id) {
      return
    }

    this.props.submitStep(
      this.props.item.organization.id,
      this.props.item.id,
      this.props.currentStep,
      this.props.currentStepIndex,
      data
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    nextStep: () => {
      dispatch(nextStep())
    },
    submitStep: (organizationId, id, step, stepIndex, data) => {
      dispatch(submitStep(organizationId, id, step, stepIndex, data))
    },
    skipStep: (organizationId, id, step, stepIndex) => {
      dispatch(skipStep(organizationId, id, step, stepIndex))
    },
    saveStep: (stepIndex, data) => {
      dispatch(saveStep(stepIndex, data))
    },
    dispatch
  }
}

export default connect(createSelector(
  selectItem(),
  selectSteps(),
  selectCurrentStep(),
  selectCurrentStepIndex(),
  selectSavedStepData(),
  (item, steps, currentStep, currentStepIndex, savedStepData) => ({
    item, steps, currentStep, currentStepIndex, savedStepData
  })
), mapDispatchToProps)(Geotagger)
