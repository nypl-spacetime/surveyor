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
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,

  LOAD_COLLECTIONS_SUCCESS,
  LOAD_COLLECTIONS_ERROR,

  LOAD_MODS,
  LOAD_MODS_SUCCESS,
  LOAD_MODS_ERROR,

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
  uuid: null,
  item: fromJS({}),
  mods: null,
  oauth: null,
  collections: [],
  steps: fromJS([]),
  submissions: initialSubmissions(),
  config: fromJS(__CONFIG__),
  menu: {
    shown: false,
    allItems: false
  },

  loading: true,
  error: null
});

function initialSubmissions() {
  return fromJS({
    completed: 0
  });
}

function newItem(state) {
  return state
    .set('steps', fromJS([]))
    .set('uuid', null);
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEM:
      return state
        .set('error', null)
        .set('uuid', null)
        .set('mods', null)
        .set('item', fromJS({}))
    case LOAD_ITEM_SUCCESS:
      return state
        .set('loading', false)
        .set('item', action.item)
        .set('uuid', action.item.uuid);
    case LOAD_MODS_SUCCESS:
      return state
        .set('mods', action.mods);
    case LOAD_COLLECTIONS_SUCCESS:
      return state
        .set('collections', action.collections);
    case LOAD_OAUTH_SUCCESS:
      return state
        .set('oauth', action.oauth);
    case LOAD_SUBMISSIONS_SUCCESS:
      return state
        .set('submissions', fromJS(action.submissions));
    case TOGGLE_MENU:
      return state
        .setIn(['menu', 'shown'], !state.getIn(['menu', 'shown']))
        .setIn(['menu', 'allItems'], action.allItems);
    case SUBMIT_STEP_SUCCESS:
      var wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size;

      if (!wasLastStep) {
        const stepData = {
          uuid: action.uuid,
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
    case LOAD_MODS_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error loading metadata',
          error: action.error
        });
    case LOAD_COLLECTIONS_ERROR:
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
