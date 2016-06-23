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

  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,

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
  submissions: fromJS({
    completed: 0
  }),
  config: fromJS(__CONFIG__),
  menu: {
    shown: false,
    allItems: false
  },

  loading: true,
  error: false
});

function appReducer(state = initialState, action) {
  console.log('appReducer', action.type)
  switch (action.type) {
    case LOAD_ITEM:
      // TODO: mods op null, item op null?
      return state
        .set('uuid', action.uuid)
        // .set('mods', null)
        // .set('item', null)
    case LOAD_ITEM_SUCCESS:
      return state
        .set('loading', false)
        .set('item', action.item)
        .set('uuid', action.item.uuid)
    case LOAD_ITEM_ERROR:
      console.error('Error: incorrect UUID!')
      return state
        .set('error', action.error)
    case LOAD_MODS_SUCCESS:
      return state
        .set('mods', action.mods)
    case LOAD_COLLECTIONS_SUCCESS:
      return state
        .set('collections', action.collections)

    case LOAD_OAUTH:
      // return state
      //   .set('loading', true)
      //   .set('error', false)
      //   .setIn(['userData', 'repositories'], false);
      return state
    case LOAD_OAUTH_SUCCESS:
      return state
        .set('oauth', action.oauth)
    case LOAD_SUBMISSIONS_SUCCESS:
      return state
        .set('submissions', fromJS(action.submissions))
    case TOGGLE_MENU:
      return state
        .setIn(['menu', 'shown'], !state.getIn(['menu', 'shown']))
        .setIn(['menu', 'allItems'], action.allItems)
    case SUBMIT_STEP:
      return state
    case SUBMIT_STEP_SUCCESS:
      var wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size

      if (!wasLastStep) {
        const stepData = {
          uuid: action.uuid,
          step: action.step,
          data: action.data,
          geometry: action.geometry
        }

        var newState = state
          .set('steps', state.get('steps').push(fromJS(stepData)))

        if (newState.get('steps').size === 1) {
          newState = newState
            .updateIn(['submissions', 'completed'], completed => completed + 1);
        }

        return newState
      } else {
        // TODO: make function which resets items + steps!
        return state
          .set('steps', fromJS([]))
          // .set('item', null)
          // .set('mods', null)
          // .set('uuid', null)
      }
    case SUBMIT_STEP_ERROR:
      return state

    case SKIP_STEP:
      return state

    case SKIP_STEP_SUCCESS:
      const stepsWithData = state
        .get('steps').toJS()
        .filter((step) => step)

      if (stepsWithData.length) {
        // Go to thanks step (last step)
        const stepsTotalCount = state.getIn(['config', 'steps']).size
        return state.update('steps', (steps) => steps.setSize(stepsTotalCount - 1))
      } else {
        // TODO: make function which resets items + steps!
        return state
          .set('steps', fromJS([]))
          // .set('item', null)
          // .set('mods', null)
          // .set('uuid', null)
      }

    case SKIP_STEP_ERROR:
      return state


    case NEXT_STEP:
      var wasLastStep = state.getIn(['config', 'steps']).size - 1 === state.get('steps').size

      if (!wasLastStep) {
        return state
          .set('steps', state.get('steps').push(undefined))
      } else {
        // TODO: make function which resets items + steps!
        var newState = state
          .set('steps', fromJS([]))
          // .set('item', null)
          // .set('mods', null)
          // .set('uuid', null)

        return newState
      }





    case SKIP_STEP:
      return state
    case LOG_OUT:
      return state
    case LOG_OUT_SUCCESS:
      return state
        .set('oauth', null)
        .set('submissions', 0)
    case LOG_OUT_ERROR:
      return state

    default:
      return state;
  }
}

export default appReducer;
