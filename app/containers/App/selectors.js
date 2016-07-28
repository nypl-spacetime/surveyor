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

const selectUuid = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('uuid')
);

const selectItem = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('item')
);

const selectCollectionForItem = () => createSelector(
  selectGlobal(),
  (globalState) => {
    var item = globalState.get('item')
    if (item) {
      const collections = globalState.get('collections')
      return collections.find((collection) => collection.uuid === item.collection)
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
    return oauth && oauth.oauth;
  }
);

const selectSubmissions = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('submissions').toJS()
);

const selectMods = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('mods')
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

const selectModsLocation = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const mods = globalState.get('mods')

    if (!mods) {
      return null
    }

    var subject = mods.subject
    if (!Array.isArray(subject)) {
      subject = [subject]
    }

    var location = subject.filter((s) => s && s.geographic && s.geographic['$'])
      .map((s) => s.geographic['$'])
      .sort((a, b) => {
        return b.length - a.length
      })

    return location
  }
);

const selectModsDate = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const mods = globalState.get('mods')

    if (!mods) {
      return null
    }

    var originInfo = mods.originInfo
    if (!Array.isArray(originInfo)) {
      originInfo = [originInfo]
    }

    var date = originInfo.filter((o) => o.dateCreated || o.dateIssued || o.dateOther)
      .map((o) => o.dateCreated || o.dateIssued || o.dateOther)
      .filter((o) => o.keyDate)
      .map(o => o['$'])
      .sort((a, b) => {
        return b.length - a.length;
      })

    return date
  }
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

  selectUuid,
  selectItem,
  selectOAuth,
  selectLoggedIn,
  selectSubmissions,
  selectMods,
  selectTitle,
  selectModsLocation,
  selectModsDate,

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
