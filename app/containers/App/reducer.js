/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  WATCHED_INTRODUCTION,

  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,

  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_OAUTH_ERROR,

  LOAD_SUBMISSIONS_SUCCESS,
  LOAD_SUBMISSIONS_ERROR,

  TOGGLE_MENU,

  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SUBMIT_STEP_ERROR,
  SKIP_STEP,
  SKIP_STEP_SUCCESS,
  SKIP_STEP_ERROR,

  NEXT_STEP,

  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  watchedIntroduction: false,
  item: initialItem(),
  oauth: null,
  steps: initialSteps(),
  submissions: initialSubmissions(),
  config: fromJS(__CONFIG__),
  menu: fromJS({
    show: false,
    clientX: -1,
    shiftKey: false
  }),
  loading: true,
  loaded: fromJS({
    item: false,
    submissions: false,
    oauth: false
  }),
  error: null
});

function initialItem() {
  return fromJS({});
}

function initialSteps() {
  return fromJS([]);
}

function initialSubmissions() {
  return fromJS({
    completed: 0
  });
}

function newItem(state) {
  return state
    .set('steps', initialSteps())
    .set('item', initialItem());
}

function loadSuccesful(state, key) {
  var newState = state.setIn(['loaded', key], true);

  var allLoaded = true
  for (var loaded of newState.get('loaded').values()) {
    allLoaded = loaded && allLoaded
  }

  return newState
    .set('loading', !allLoaded);
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case WATCHED_INTRODUCTION:
      return state
        .set('watchedIntroduction', true);
    case LOAD_ITEM:
      var newState = state
        .set('error', null)

      return newItem(newState);
    case LOAD_ITEM_SUCCESS:
      var newState = state
        .set('item', action.item);
      return loadSuccesful(newState, 'item');
    case LOAD_OAUTH_SUCCESS:
      var newState = state
        .set('oauth', action.oauth);
      return loadSuccesful(newState, 'oauth');
    case LOAD_SUBMISSIONS_SUCCESS:
      var newState = state
        .set('submissions', fromJS(action.submissions));
      return loadSuccesful(newState, 'submissions');
    case TOGGLE_MENU:
      let clientX = action.clientX || -1;
      let shiftKey = action.shiftKey || false;
      return state
        .set('menu', fromJS({
          show: action.show,
          clientX,
          shiftKey
        }));
    case SUBMIT_STEP_SUCCESS:
      var wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size;

      if (!wasLastStep) {
        const stepData = {
          provider: action.provider,
          id: action.id,
          step: action.step,
          data: action.data,
          geometry: action.geometry
        };

        var newState = state
          .set('steps', state.get('steps').push(fromJS(stepData)));

        if (newState.get('steps').size === 1) {
          newState = newState
            .updateIn(['submissions', 'completed'], completed => completed + 1);
        }

        return newState;
      } else {
        return newItem(state);
      }
    case SKIP_STEP_SUCCESS:
      const stepsWithData = state
        .get('steps').toJS()
        .filter((step) => step);

      if (stepsWithData.length) {
        // Go to thanks step (last step)
        const stepsTotalCount = state.getIn(['config', 'steps']).size;
        return state.update('steps', (steps) => steps.setSize(stepsTotalCount - 1));
      } else {
        return newItem(state);
      }
    case NEXT_STEP:
      var wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size;

      if (!wasLastStep) {
        return state
          .set('steps', state.get('steps').push(undefined));
      } else {
        return newItem(state);
      }
    case LOG_OUT_SUCCESS:
      return state
        .set('oauth', null)
        .set('submissions', initialSubmissions());
    case LOAD_ITEM_ERROR:
      return state
        .set('loading', false)
        .set('error', {
          type: action.type,
          message: 'Error loading image',
          error: action.error
        });
    case LOAD_OAUTH_ERROR:
    case LOAD_SUBMISSIONS_ERROR:
    return state
      .set('error', {
        type: action.type,
        message: 'Error connecting to API',
        error: action.error
      });
    case SKIP_STEP_ERROR:
    case SUBMIT_STEP_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error submitting data to API',
          error: action.error
        });
    case LOG_OUT_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error logging out',
          error: action.error
        });
    default:
      return state;
  }
}

export default appReducer;
