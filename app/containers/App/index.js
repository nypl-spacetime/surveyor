import React from 'react';
import { connect } from 'react-redux';

import {
  loadOAuth
} from '../App/actions';

import Header from 'containers/Header';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import styles from './styles.css';

export class App extends React.Component {

  componentWillMount = () => {
    this.props.loadOAuth();
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

function mapDispatchToProps(dispatch) {
  return {
    loadOAuth: () => {
      dispatch(loadOAuth());
    },
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(App);
