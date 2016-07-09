/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory } from 'history';
import useScroll from 'react-router-scroll';
import configureStore from './store';
import FontFaceObserver from 'fontfaceobserver';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
import styles from 'containers/App/styles.css';
const openSansObserver = new FontFaceObserver('Kievit', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.check().then(() => {
  document.body.classList.add(styles.fontLoaded);
}, () => {
  document.body.classList.remove(styles.fontLoaded);
});

// Create redux store with history
// this uses the singleton hashHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const hashHistory = useRouterHistory(createhashHistory)();`
const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const initialState = {};
const store = configureStore(initialState, hashHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'containers/App/selectors';
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: selectLocationState(),
});

import sagas from 'containers/App/sagas';
import { getHooks } from './utils/hooks';

const { injectReducer, injectSagas } = getHooks(store);

injectSagas(sagas);

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App';
import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={rootRoute}
      render={
        // Scroll to top when going to a new page, imitating default browser
        // behaviour
        applyRouterMiddleware(
          useScroll(
            (prevProps, props) => {
              if (!prevProps || !props) {
                return true;
              }

              if (prevProps.location.pathname !== props.location.pathname) {
                return [0, 0];
              }

              return true;
            }
          )
        )
      }
    />
  </Provider>,
  document.getElementById('app')
);
