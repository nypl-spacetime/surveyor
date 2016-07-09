// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getHooks } from './utils/hooks';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getHooks factory
  const { injectReducer, injectSagas } = getHooks(store);

  return [
    {
      path: '/about',
      name: 'about',
      getComponent(nextState, cb) {
        System.import('containers/AboutPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }, {
      path: '/(:uuid)',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }
  ];
}
