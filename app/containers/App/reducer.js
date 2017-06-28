 /* global __CONFIG__ */

import {
  WATCHED_INTRODUCTION,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,
  LOAD_OAUTH_SUCCESS,
  LOAD_OAUTH_ERROR,
  LOAD_SUBMISSIONS_SUCCESS,
  LOAD_SUBMISSIONS_ERROR,
  SUBMIT_STEP_SUCCESS,
  SUBMIT_STEP_ERROR,
  SKIP_STEP_SUCCESS,
  SKIP_STEP_ERROR,
  SAVE_STEP,
  NEXT_STEP,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  SET_PANE_INDEX,
  SET_PANE_MODE,
  TOGGLE_METADATA,
  SET_ERROR
} from './constants'
import { fromJS } from 'immutable'

// Initial state
const initialState = fromJS({
  hasTouch: 'ontouchstart' in window,
  watchedIntroduction: false,
  panes: fromJS({
    index: 0,
    mode: 'split' // 'single' or 'split'
  }),
  showMetadata: true,
  item: initialItem(),
  oauth: initialOAuth(),

  // steps hold step data after user submits (or skips)
  // TODO: rename to stepData?
  steps: initialSteps(),

  // savedSteps hold step data before user submits,
  //   used to return to last map state between switching pages
  savedSteps: initialSteps(),

  submissions: initialSubmissions(),
  config: fromJS(__CONFIG__),
  loaded: fromJS({
    item: false,
    submissions: false,
    oauth: false
  }),
  error: undefined
})

function initialOAuth () {
  return fromJS({})
}

function initialItem () {
  return fromJS({})
}

function initialSteps () {
  return fromJS([])
}

function initialSubmissions () {
  return fromJS({
    completed: 0
  })
}

function newItem (state) {
  return state
    .set('steps', initialSteps())
    .set('savedSteps', initialSteps())
    .set('item', initialItem())
    .set('showMetadata', true)
    .setIn(['panes', 'index'], 0)
}

function loadSuccesful (state, key) {
  return state.setIn(['loaded', key], true)
}

function appReducer (state = initialState, action) {
  let wasLastStep

  switch (action.type) {
    case WATCHED_INTRODUCTION:
      return state
        .set('watchedIntroduction', true)
    case TOGGLE_METADATA:
      return state
        .set('showMetadata', !state.get('showMetadata'))
    case SET_PANE_INDEX:
      return state
        .setIn(['panes', 'index'], action.index)
    case SET_PANE_MODE:
      return state
        .setIn(['panes', 'mode'], action.mode)
    case LOAD_ITEM_SUCCESS:
      state = state
        .set('showMetadata', true)
        .set('item', fromJS(action.item))
      return loadSuccesful(state, 'item')
    case LOAD_OAUTH_SUCCESS:
      state = state
        .set('oauth', fromJS(action.oauth))
      return loadSuccesful(state, 'oauth')
    case LOAD_SUBMISSIONS_SUCCESS:
      state = state
        .set('submissions', fromJS(action.submissions))
      return loadSuccesful(state, 'submissions')
    case SUBMIT_STEP_SUCCESS:
      wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size

      if (!wasLastStep) {
        // TODO: do we really need to store orgId, id, step?
        const stepData = {
          organizationId: action.organizationId,
          id: action.id,
          step: action.step,
          data: action.data
        }

        state = state
          .set('steps', state.get('steps').push(fromJS(stepData)))

        if (state.get('steps').size === 1) {
          state = state
            .updateIn(['submissions', 'completed'], completed => completed + 1)
        }

        return state
      } else {
        return newItem(state)
      }
    case SKIP_STEP_SUCCESS:
      const stepsWithData = state
        .get('steps').toJS()
        .filter((step) => step)

      if (stepsWithData.length) {
        // Go to thanks step (last step)
        const stepsTotalCount = state.getIn(['config', 'steps']).size
        return state.update('steps', (steps) => steps.setSize(stepsTotalCount - 1))
      } else {
        return newItem(state)
      }
    case SAVE_STEP:
      const savedStepsSize = state.get('savedSteps').size
      if (savedStepsSize <= action.stepIndex) {
        state = state.update('savedSteps', (savedSteps) => savedSteps.setSize(action.stepIndex + 1))
      }

      return state.setIn(['savedSteps', action.stepIndex], fromJS(action.data))
    case NEXT_STEP:
      wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size

      if (!wasLastStep) {
        return state
          .set('steps', state.get('steps').push(undefined))
      } else {
        return newItem(state)
      }
    case LOG_OUT_SUCCESS:
      return state
        .set('oauth', initialOAuth())
        .set('submissions', initialSubmissions())
    case LOAD_ITEM_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error loading image',
          error: action.error
        })
    case SET_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: action.error.message,
          error: action.error
        })
    case LOAD_OAUTH_ERROR:
    case LOAD_SUBMISSIONS_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error getting data from server',
          error: action.error
        })
    case SKIP_STEP_ERROR:
    case SUBMIT_STEP_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error submitting data',
          error: action.error
        })
    case LOG_OUT_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error logging out',
          error: action.error
        })
    default:
      return state
  }
}

export default appReducer
