/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  LOAD_REPOS,
  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_SUBMISSIONS,

  LOG_OUT,
  LOG_OUT_SUCCESS,

  NEXT_STEP,

  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SKIP_STEP,
  SKIP_STEP_SUCCESS
} from 'containers/App/constants';

import {
  loadItem,
  itemLoaded, itemLoadingError,
  stepSubmitted, stepSubmitError,
  stepSkipped, stepSkipError,
  loadOAuth, oauthLoaded, oauthLoadingError,
  submissionsLoaded, submissionsLoadingError,
  reposLoaded, repoLoadingError,
  logOutSuccess, logOutError
} from 'containers/App/actions';

import request from 'utils/request';

import {
  selectItem,
  selectCurrentStep,
  selectCurrentStepIndex,
} from 'containers/App/selectors';

// Bootstrap sagas
export default [
  resetItem,
  setRoute,
  getSubmissions,
  getItem,
  getOAuth,
  submitStep,
  skipStep,
  getLogOut,
  getLogOutSuccess // TODO: this is not the right way!?
];

const API_URL = __CONFIG__.api.url
const ORGANIZATION_ID = __CONFIG__.tasks.organizationId
const TASK_ID = __CONFIG__.tasks.taskId
const COLLECTIONS = __CONFIG__.tasks.collections

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function* requestData(constant, getUrl, options) {
  while (true) {
    const action = yield take(constant);

    var url
    if (isFunction(getUrl)) {
      url = getUrl(action);
    } else {
      url = getUrl
    }

    if (url) {
      const defaultFetchOptions = {
        credentials: 'include'
      }

      var fetchOptions = options.fetchOptions

      // If options.fetchOptions is a function, call this function
      if (fetchOptions && isFunction(fetchOptions)) {
        fetchOptions = fetchOptions(action);
      } else if (!fetchOptions) {
        fetchOptions = {}
      }

      // Merge default fetchOptions
      fetchOptions = Object.assign(
        {},
        defaultFetchOptions,
        fetchOptions
      )

      // Use call from redux-saga for easier testing
      const result = yield call(request, url, fetchOptions);

      // We return an object in a specific format, see utils/request.js for more information
      if (result.err === undefined || result.err === null) {

        // If actionSuccess is present in options, call this function when
        //   request call is successful
        if (options.actionSuccess) {
          var actionSuccessParams = (action, resultData) => [resultData];

          if (options.actionSuccessParams) {
            actionSuccessParams = options.actionSuccessParams
          }

          yield put(options.actionSuccess.apply(null, actionSuccessParams(action, result.data)));
        }
      } else {
        // TODO: add actionErrorParams?
        if (options.actionError) {
          yield put(options.actionError({
            message: result.err.message,
            status: result.err.response ? result.err.response.status : -1,
            url: url
          }));
        }
      }
    }
  }
}

export function* setRoute() {
  while (true) {
    // yield take([SUBMIT_STEP_SUCCESS, SKIP_STEP_SUCCESS, NEXT_STEP, LOAD_ITEM_SUCCESS]);
    yield take(LOAD_ITEM_SUCCESS);

    // const stepIndex = yield select(selectCurrentStepIndex());
    const item = yield select(selectItem());

    if (item) {
      var path = `/${item.id}`

      // if (stepIndex > 0) {
      //   const step = yield select(selectCurrentStep());
      //   path += `/${step}`
      // }

      yield(put(replace(path)))
    }
  }
}

export function* resetItem() {
  while (true) {
    yield take([SUBMIT_STEP_SUCCESS, SKIP_STEP_SUCCESS, NEXT_STEP]);

    const stepIndex = yield select(selectCurrentStepIndex());

    if (stepIndex === 0) {
      // last step is reached after this event, state.steps.length === 0
      yield(put(loadItem()))
    }
  }
}

export function* getItem() {
  const getUrl = (action) => {
    var id = action.id;

    if (!id) {
      return `${API_URL}tasks/${TASK_ID}/items/random?collection=${COLLECTIONS.join(',')}`;
    }

    return `${API_URL}organizations/${action.organizationId}/items/${id}`;
  }

  yield* requestData(LOAD_ITEM, getUrl, {
    actionSuccess: itemLoaded,
    actionError: itemLoadingError
  })
}

export function* submitStep() {
  const getUrl = (action) => `${API_URL}submissions`

  const fetchOptions = (action) => ({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      step: action.step,
      stepIndex: action.stepIndex,
      data: action.data,
      item: {
        id: action.id
      },
      organization: {
        id: action.organizationId
      },
      task: {
        id: TASK_ID
      }
    })
  })

  yield* requestData(SUBMIT_STEP, getUrl, {
    fetchOptions,
    actionSuccess: stepSubmitted,
    actionSuccessParams: (action, resultData) => [
      action.organizationId,
      action.id,
      action.step,
      action.stepIndex,
      action.data,
      action.geometry
    ],
    actionError: stepSubmitError
  });
}

export function* skipStep() {
  const getUrl = (action) => `${API_URL}submissions`

  const fetchOptions = (action) => ({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      step: action.step,
      stepIndex: action.stepIndex,
      skipped: true,
      item: {
        id: action.id
      },
      organization: {
        id: action.organizationId
      },
      task: {
        id: TASK_ID
      }
    })
  });

  yield* requestData(SKIP_STEP, getUrl, {
    fetchOptions,
    actionSuccess: stepSkipped,
    actionSuccessParams: (action, resultData) => [
      action.organizationId,
      action.id,
      action.step,
      action.stepIndex
    ],
    actionError: stepSkipError
  });
}

export function* getLogOut() {
  yield* requestData(LOG_OUT, `${API_URL}oauth/disconnect`, {
    actionSuccess: logOutSuccess,
    actionError: logOutError
  });
}

export function* getSubmissions() {
  yield* requestData(LOAD_OAUTH_SUCCESS, `${API_URL}tasks/${TASK_ID}/submissions/count`, {
    actionSuccess: submissionsLoaded,
    actionError: submissionsLoadingError
  });
}

export function* getLogOutSuccess() {
  while (true) {
    yield take(LOG_OUT_SUCCESS);
    yield put(loadOAuth());
  }
}

export function* getOAuth() {
  yield* requestData(LOAD_OAUTH, `${API_URL}oauth`, {
    actionSuccess: oauthLoaded,
    actionError: oauthLoadingError
  })
}
