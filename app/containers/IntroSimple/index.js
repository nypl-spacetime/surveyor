import React from 'react';
import { connect } from 'react-redux';

import {
  setIntroductionWatched
} from '../App/actions';

import Page from 'components/Page';
import IntroVideo from 'components/IntroVideo';

import styles from './styles.css';

export class IntroSimple extends React.Component {

  toSurveyor() {
    this.props.setIntroductionWatched();
  }

  render() {
    return (
      <Page buttonAction={this.toSurveyor.bind(this)}>
        <IntroVideo />
      </Page>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setIntroductionWatched: () => dispatch(setIntroductionWatched())
  };
}

export default connect(null, mapDispatchToProps)(IntroSimple);
