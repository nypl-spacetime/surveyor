/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,

  LOAD_COLLECTIONS,
  LOAD_COLLECTIONS_SUCCESS,
  LOAD_COLLECTIONS_ERROR,

  LOAD_MODS,
  LOAD_MODS_SUCCESS,
  LOAD_MODS_ERROR,

  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_OAUTH_ERROR,

  LOAD_SUBMISSIONS,
  LOAD_SUBMISSIONS_SUCCESS,
  LOAD_SUBMISSIONS_ERROR,

  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,

  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SUBMIT_STEP_ERROR,
  SKIP_STEP,
  SKIP_STEP_SUCCESS,
  SKIP_STEP_ERROR,

  NEXT_STEP,

  TOGGLE_MENU,

  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR
} from './constants';

export function nextStep(uuid, step, stepIndex) {
  return {
    type: NEXT_STEP,
    uuid,
    step,
    stepIndex
  };
}

export function submitStep(uuid, step, stepIndex, data, geometry) {
  return {
    type: SUBMIT_STEP,
    uuid,
    step,
    stepIndex,
    data,
    geometry
  };
}

export function stepSubmitted(uuid, step, stepIndex, data, geometry) {
  return {
    type: SUBMIT_STEP_SUCCESS,
    uuid,
    step,
    stepIndex,
    data,
    geometry
  };
}

export function stepSubmitError(error) {
  return {
    type: SUBMIT_STEP_ERROR,
    error
  };
}

export function skipStep(uuid, step, stepIndex) {
  return {
    type: SKIP_STEP,
    uuid,
    step,
    stepIndex
  };
}

export function stepSkipped(uuid, step, stepIndex) {
  return {
    type: SKIP_STEP_SUCCESS,
    uuid,
    step,
    stepIndex
  };
}

export function stepSkipError(error) {
  return {
    type: SKIP_STEP_ERROR,
    error
  };
}


/**
 * Load the repositories, this action starts the ...loadItem saga
 *
 * @return {object} An action object with a type of LOAD_OAUTH
 */
export function loadItem(uuid) {
  return {
    type: LOAD_ITEM,
    uuid
  };
}


/**
 * Dispatched when the repositories are loaded by the getGithubData saga
 *
 * @param  {object} oauth The OAuth data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function itemLoaded(item) {
  return {
    type: LOAD_ITEM_SUCCESS,
    item
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function itemLoadingError(error) {
  return {
    type: LOAD_ITEM_ERROR,
    error,
  };
}





export function loadCollections() {
  return {
    type: LOAD_COLLECTIONS
  };
}

export function collectionsLoaded(collections) {
  return {
    type: LOAD_COLLECTIONS_SUCCESS,
    collections
  };
}

export function collectionsLoadingError(error) {
  return {
    type: LOAD_COLLECTIONS_ERROR,
    error
  };
}




/**
 * Load the repositories, this action starts the ...loadItem saga
 *
 * @return {object} An action object with a type of LOAD_OAUTH
 */
export function loadMods(uuid) {
  return {
    type: LOAD_MODS,
    uuid
  };
}


/**
 * Dispatched when the repositories are loaded by the getGithubData saga
 *
 * @param  {object} oauth The OAuth data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function modsLoaded(mods) {
  return {
    type: LOAD_MODS_SUCCESS,
    mods
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function modsLoadingError(error) {
  return {
    type: LOAD_MODS_ERROR,
    error,
  };
}



/**
 * Dispatched when the repositories are loaded by the getGithubData saga
 *
 * @param  {object} oauth The OAuth data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function submissionsLoaded(submissions) {
  return {
    type: LOAD_SUBMISSIONS_SUCCESS,
    submissions
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function submissionsLoadingError(error) {
  return {
    type: LOAD_SUBMISSIONS_ERROR,
    error,
  };
}












/**
 * Load the repositories, this action starts the ... saga
 *
 * @return {object} An action object with a type of LOAD_OAUTH
 */
export function loadOAuth() {
  return {
    type: LOAD_OAUTH,
  };
}


/**
 * Dispatched when the repositories are loaded by the getGithubData saga
 *
 * @param  {object} oauth The OAuth data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function oauthLoaded(oauth) {
  return {
    type: LOAD_OAUTH_SUCCESS,
    oauth
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function oauthLoadingError(error) {
  return {
    type: LOAD_OAUTH_ERROR,
    error
  };
}





/**
 * Dispatched when ...
 *
 * @param  {object} oauth The OAuth data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loadItem(uuid) {
  return {
    type: LOAD_ITEM,
    uuid
  };
}









/**
 * Load the repositories, this action starts the getGithubData saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the getGithubData saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function toggleMenu(allItems) {
  return {
    type: TOGGLE_MENU,
    allItems
  };
}


export function logOut() {
  return {
    type: LOG_OUT
  };
}

export function logOutSuccess() {
  return {
    type: LOG_OUT_SUCCESS
  };
}

export function logOutError() {
  return {
    type: LOG_OUT_ERROR
  };
}
