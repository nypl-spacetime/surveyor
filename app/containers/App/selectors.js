import { createSelector } from 'reselect'

const selectGlobal = () => (state) => state.get('global')

const selectWatchedIntroduction = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('watchedIntroduction')
)

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
)

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
)

const selectConfig = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('config')
)

const selectMapDefaults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'defaults', 'map']).toJS()
)

const selectCSSVariables = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'cssVariables']).toJS()
)

const selectCollections = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'collections']).toJS()
    .filter((collection) => collection.include)
)

const selectStepData = (step) => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('steps')
      .toJS()
      .filter((s) => s && s.step === step)[0]
)

const selectSteps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'steps']).toJS()
)

const selectItem = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('item').toJS()
)

const selectOAuth = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('oauth').toJS()
)

const selectLoggedIn = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const oauth = globalState.get('oauth').toJS()
    return oauth && oauth.oauth
  }
)

const selectSubmissions = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('submissions').toJS()
)

const getCurrentStepIndex = (state) => {
  // return index of current step:
  //   state.steps holds all submitted steps,
  //   current step is not yet submitted,
  //   so return state.steps.length - 1 + 1
  return state.get('steps').size
}

const selectCurrentStep = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // get name of current step
    const currentStepIndex = getCurrentStepIndex(globalState)
    return globalState
      .getIn(['config', 'steps'])
      .get(currentStepIndex)
  }
)

const selectCurrentStepIndex = (step) => createSelector(
  selectGlobal(),
  (globalState) => getCurrentStepIndex(globalState)
)

const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

export {
  selectGlobal,
  selectWatchedIntroduction,
  selectCurrentStep,
  selectItem,
  selectOAuth,
  selectLoggedIn,
  selectSubmissions,
  selectCurrentStepIndex,
  selectConfig,
  selectCollections,
  selectCSSVariables,
  selectStepData,
  selectSteps,
  selectMapDefaults,
  selectLoading,
  selectError,
  selectLocationState
}
