/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectWatchedIntroduction = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('watchedIntroduction')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectConfig = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('config')
);

const selectMapDefaults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'defaults', 'map']).toJS()
);

const selectCSSVariables = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'css_variables']).toJS()
);

const selectStepData = (step) => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('steps')
      .toJS()
      .filter((s) => s && s.step === step)[0]
);

const selectSteps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'steps']).toJS()
);

const selectItem = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('item')
);

const selectTitle = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const item = globalState.get('item');

    if (!item) {
      return null
    }

    return item.title;
  }
);

const selectItemMetadataLocation = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const item = globalState.get('item');

    if (!item || !item.meta) {
      return null
    }

    return item.meta.location;
  }
);

const selectItemMetadataDate = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const item = globalState.get('item');

    if (!item || !item.meta) {
      return null
    }

    return item.meta.date;
  }
);

const selectCollectionForItem = () => createSelector(
  selectGlobal(),
  (globalState) => {
    var item = globalState.get('item')
    if (item) {
      const collections = globalState.get('collections')
      return collections.find((collection) => collection.id === item.collection_id)
    } else {
      return null
    }
  }
);

const selectOAuth = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('oauth')
);

const selectLoggedIn = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const oauth = globalState.get('oauth');
    return oauth && oauth.oauth ? true : false;
  }
);

const selectSubmissions = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('submissions').toJS()
);

const selectMenu = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('menu').toJS()
);

const getCurrentStepIndex = (state) => {
  // return index of current step:
  //   state.steps holds all submitted steps,
  //   current step is not yet submitted,
  //   so return state.steps.length - 1 + 1
  return state.get('steps').size;
};

const selectCurrentStep = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // get name of current step
    const currentStepIndex = getCurrentStepIndex(globalState);
    return globalState
      .getIn(['config', 'steps'])
      .get(currentStepIndex);
  }
);

const selectCurrentStepIndex = (step) => createSelector(
  selectGlobal(),
  (globalState) => getCurrentStepIndex(globalState)
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,

  selectWatchedIntroduction,
  selectCurrentStep,

  selectItem,
  selectItemMetadataLocation,
  selectItemMetadataDate,
  selectOAuth,
  selectLoggedIn,
  selectSubmissions,

  selectTitle,

  selectCurrentStepIndex,
  selectCollectionForItem,

  selectMenu,

  selectConfig,
  selectCSSVariables,
  selectStepData,
  selectSteps,
  selectMapDefaults,

  selectLoading,
  selectError,
  selectLocationState
};
