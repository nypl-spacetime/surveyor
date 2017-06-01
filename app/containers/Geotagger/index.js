import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem,
  selectSteps,
  selectCurrentStep,
  selectCurrentStepIndex
} from 'containers/App/selectors'

import {
  nextStep,
  submitStep,
  skipStep
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
      new: this.newItem.bind(this),
      next: this.nextStep.bind(this),
      submit: this.submitStep.bind(this),
      skip: this.skipStep.bind(this)
    })
  }

  newItem () {
    console.log('NIEUWE!')
  }

  nextStep () {
    this.props.nextStep()
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
    submitStep: (organizationId, id, step, stepIndex, data, geometry) => {
      dispatch(submitStep(organizationId, id, step, stepIndex, data, geometry))
    },
    skipStep: (organizationId, id, step, stepIndex) => {
      dispatch(skipStep(organizationId, id, step, stepIndex))
    },
    dispatch
  }
}

export default connect(createSelector(
  selectItem(),
  selectSteps(),
  selectCurrentStep(),
  selectCurrentStepIndex(),
  (item, steps, currentStep, currentStepIndex) => ({
    item, steps, currentStep, currentStepIndex
  })
), mapDispatchToProps)(Geotagger)
