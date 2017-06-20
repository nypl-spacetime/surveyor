/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
// import { persistStore, autoRehydrate, createTransform } from 'redux-persist-immutable'

import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore (initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
    // autoRehydrate()
  ]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.asyncReducers = {} // Async reducer registry

  // const deleteKeysTransform = createTransform(
  //   (state) => state,
  //   (state) => {
  //     return state
  //       .delete('config')
  //       .delete('error')
  //       .set('showMetadata', true)
  //   },
  //   {
  //     whitelist: 'global'
  //   }
  // )

  // Begin periodically persisting the store
  // persistStore(store, {
  //   blacklist: [
  //     'route'
  //   ],
  //   transforms: [
  //     deleteKeysTransform
  //   ]
  // })

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default
        const nextReducers = createReducers(store.asyncReducers)

        store.replaceReducer(nextReducers)
      })
    })
  }

  return store
}
