/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { getAsyncInjectors } from 'utils/asyncInjectors'
import configureStore from './store'

import '../node_modules/leaflet/dist/leaflet.css'
import '../node_modules/leaflet-geotag-photo/dist/Leaflet.GeotagPhoto.css'

import 'sanitize.css/sanitize.css'
import './global-styles'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}
const store = configureStore(initialState, hashHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'containers/App/selectors'
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: selectLocationState()
})

// Load Sagas
import { default as sagas } from 'containers/App/sagas'
const { injectSagas } = getAsyncInjectors(store)
injectSagas(sagas)

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App'
import createRoutes from './routes'
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store)
}

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={rootRoute}
      render={
        applyRouterMiddleware()
      }
    />
  </Provider>,
  document.getElementById('app')
)
