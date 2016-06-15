/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const selectConfig = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('config')
);

const selectMapDefaults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'defaults', 'map']).toJS()
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

const selectSubmissions = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('submissions').toJS()
);

const selectMods = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('mods')
);

const selectModsTitle = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const mods = globalState.get('mods')

    if (!mods) {
      return null
    }

    var titleInfo = mods.titleInfo.length ?
      mods.titleInfo[0] : mods.titleInfo

    return titleInfo.title['$'];
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

const selectShowMenu = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['menu', 'shown'])
);

const selectShowAllMenuItems = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['menu', 'allItems'])
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

  selectCurrentStep,

  selectUuid,
  selectItem,
  selectOAuth,
  selectSubmissions,
  selectMods,
  selectModsTitle,
  selectModsLocation,
  selectModsDate,

  selectCurrentStepIndex,
  selectCollectionForItem,

  selectShowMenu,
  selectShowAllMenuItems,

  selectConfig,
  selectSteps,
  selectMapDefaults,

  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState
};
