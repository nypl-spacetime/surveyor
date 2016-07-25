import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  setIntroductionWatched
} from '../App/actions';

import Page from 'components/Page';
import IntroVideo from 'components/IntroVideo';

import styles from './styles.css';

var markdown = require('html!./intro.md');

export class IntroPage extends React.Component {

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  toSurveyor = () => {
    this.props.setIntroductionWatched();
    this.openRoute('/');
  };

  render() {
    return (
      <Page buttonAction={this.toSurveyor}>
        <IntroVideo />
        <div className={styles.padding} dangerouslySetInnerHTML={{__html: markdown}} />
      </Page>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    setIntroductionWatched: () => dispatch(setIntroductionWatched())
  };
}

export default connect(null, mapDispatchToProps)(IntroPage);
