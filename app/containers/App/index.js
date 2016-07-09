/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';

import {
  loadOAuth,
  loadItem,
  loadCollections
} from '../App/actions';

import Header from 'containers/Header';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import styles from './styles.css';

export class App extends React.Component {

  componentWillMount = () => {
    this.props.loadOAuth();
    this.props.loadCollections();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    loadOAuth: () => {
      dispatch(loadOAuth());
    },
    loadCollections: () => {
      dispatch(loadCollections());
    },
    loadItem: (uuid) => {
      dispatch(loadItem(uuid));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(App);
