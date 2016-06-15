/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_COLLECTIONS = 'where/App/LOAD_COLLECTIONS';
export const LOAD_COLLECTIONS_SUCCESS = 'where/App/LOAD_COLLECTIONS_SUCCESS';
export const LOAD_COLLECTIONS_ERROR = 'where/App/LOAD_COLLECTIONS_ERROR';

export const LOAD_SUBMISSIONS = 'where/App/LOAD_SUBMISSIONS';
export const LOAD_SUBMISSIONS_SUCCESS = 'where/App/LOAD_SUBMISSIONS_SUCCESS';
export const LOAD_SUBMISSIONS_ERROR = 'where/App/LOAD_SUBMISSIONS_ERROR';

export const LOAD_OAUTH = 'where/App/LOAD_OAUTH';
export const LOAD_OAUTH_SUCCESS = 'where/App/LOAD_OAUTH_SUCCESS';
export const LOAD_OAUTH_ERROR = 'where/App/LOAD_OAUTH_ERROR';

// data = uuid (null = random)
export const LOAD_ITEM = 'where/App/LOAD_ITEM';
export const LOAD_ITEM_SUCCESS = 'where/App/LOAD_ITEM_SUCCESS';
export const LOAD_ITEM_ERROR = 'where/App/LOAD_ITEM_ERROR';

// data = {step, data, geometry}
export const SUBMIT_STEP = 'where/App/SUBMIT_STEP';
export const SUBMIT_STEP_SUCCESS = 'where/App/SUBMIT_STEP_SUCCESS';
export const SUBMIT_STEP_ERROR = 'where/App/SUBMIT_STEP_ERROR';

// data = {step,}
export const SKIP_STEP = 'where/App/SKIP_STEP';
export const SKIP_STEP_SUCCESS = 'where/App/SKIP_STEP_SUCCESS';
export const SKIP_STEP_ERROR = 'where/App/SKIP_STEP_ERROR';

export const NEXT_STEP = 'where/App/NEXT_STEP';


// TODO: action to go to next step!

// data = uuid
export const LOAD_MODS = 'where/App/LOAD_MODS';
export const LOAD_MODS_SUCCESS = 'where/App/LOAD_MODS_SUCCESS';
export const LOAD_MODS_ERROR = 'where/App/LOAD_MODS_ERROR';

// data = provider
// TODO: log in wth ouah
// TODO: log out with oauth

export const LOAD_REPOS = 'where/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'where/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'where/App/LOAD_REPOS_ERROR';

export const TOGGLE_MENU = 'where/App/TOGGLE_MENU';

export const LOG_OUT = 'where/App/LOG_OUT';
export const LOG_OUT_SUCCESS = 'where/App/LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'where/App/LOG_OUT_ERROR';
