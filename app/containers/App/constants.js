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

export const LOAD_COLLECTIONS = 'surveyor/App/LOAD_COLLECTIONS';
export const LOAD_COLLECTIONS_SUCCESS = 'surveyor/App/LOAD_COLLECTIONS_SUCCESS';
export const LOAD_COLLECTIONS_ERROR = 'surveyor/App/LOAD_COLLECTIONS_ERROR';

export const LOAD_SUBMISSIONS = 'surveyor/App/LOAD_SUBMISSIONS';
export const LOAD_SUBMISSIONS_SUCCESS = 'surveyor/App/LOAD_SUBMISSIONS_SUCCESS';
export const LOAD_SUBMISSIONS_ERROR = 'surveyor/App/LOAD_SUBMISSIONS_ERROR';

export const LOAD_OAUTH = 'surveyor/App/LOAD_OAUTH';
export const LOAD_OAUTH_SUCCESS = 'surveyor/App/LOAD_OAUTH_SUCCESS';
export const LOAD_OAUTH_ERROR = 'surveyor/App/LOAD_OAUTH_ERROR';

// data = uuid (null = random)
export const LOAD_ITEM = 'surveyor/App/LOAD_ITEM';
export const LOAD_ITEM_SUCCESS = 'surveyor/App/LOAD_ITEM_SUCCESS';
export const LOAD_ITEM_ERROR = 'surveyor/App/LOAD_ITEM_ERROR';

export const SUBMIT_STEP = 'surveyor/App/SUBMIT_STEP';
export const SUBMIT_STEP_SUCCESS = 'surveyor/App/SUBMIT_STEP_SUCCESS';
export const SUBMIT_STEP_ERROR = 'surveyor/App/SUBMIT_STEP_ERROR';

export const SKIP_STEP = 'surveyor/App/SKIP_STEP';
export const SKIP_STEP_SUCCESS = 'surveyor/App/SKIP_STEP_SUCCESS';
export const SKIP_STEP_ERROR = 'surveyor/App/SKIP_STEP_ERROR';

export const NEXT_STEP = 'surveyor/App/NEXT_STEP';

export const LOAD_MODS = 'surveyor/App/LOAD_MODS';
export const LOAD_MODS_SUCCESS = 'surveyor/App/LOAD_MODS_SUCCESS';
export const LOAD_MODS_ERROR = 'surveyor/App/LOAD_MODS_ERROR';

export const LOAD_REPOS = 'surveyor/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'surveyor/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'surveyor/App/LOAD_REPOS_ERROR';

export const TOGGLE_MENU = 'surveyor/App/TOGGLE_MENU';

export const LOG_OUT = 'surveyor/App/LOG_OUT';
export const LOG_OUT_SUCCESS = 'surveyor/App/LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'surveyor/App/LOG_OUT_ERROR';
