/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  selectItem,
  selectLoading,
  selectError,
  selectSubmissions,
  selectLoggedIn,
  selectWatchedIntroduction
} from 'containers/App/selectors';

import {
  loadItem
} from '../App/actions';

import Sidebar from 'components/Sidebar';
import IntroSimple from 'containers/IntroSimple';

import Error from 'containers/Error';
import Loading from 'containers/Loading';

import Image from 'containers/Image';
import SlidyPane from 'containers/SlidyPane';
import Metadata from 'containers/Metadata';
import Geotagger from 'containers/Geotagger';

import styles from './styles.css';

export class HomePage extends React.Component {

  componentWillMount () {
    if (!this.props.item.id) {
      this.props.loadItem('nypl', this.props.params.id);
    }
  }

  componentWillReceiveProps(props) {
    // For now, only provider=nypl routes are supported!

    // user types in new route
    var newRouteId = this.props.item.id === this.props.params.id &&
      props.item.id === this.props.item.id && props.item.id &&
      props.params.id !== this.props.params.id;

    // path is /:incorrect-id, user/app wants to go to /
    var fromIncorrectIdToRandomId = this.props.error && !props.params.id && this.props.params.id;

    // path is /:incorrect-id, user types in new id
    var fromIncorrectIdToNewId = this.props.error && props.params.id && props.params.id !== this.props.params.id;

    if (newRouteId || fromIncorrectIdToRandomId || fromIncorrectIdToNewId) {
      // Call loadItem with id from route (or undefined)
      this.props.loadItem('nypl', props.params.id);
    }
  }

  render() {
    let mainContent = null;

    if (this.props.error) {
      mainContent = (
        <Error />
      );
    } else if (this.props.loading) {
      mainContent = (
        <Loading />
      );
    } else if (!this.props.watchedIntroduction && !this.props.loggedIn && !(this.props.submissions.completed > 0)) {
      mainContent = (
        <IntroSimple />
      );
    } else {
      mainContent = (
        <SlidyPane key={this.props.params.id}>
          <Image />
          <Sidebar>
            <Metadata />
            <Geotagger />
          </Sidebar>
        </SlidyPane>
      );
    }

    return mainContent;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadItem: (provider, id) => {
      dispatch(loadItem(provider, id));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectItem(),
  selectLoading(),
  selectError(),
  selectSubmissions(),
  selectLoggedIn(),
  selectWatchedIntroduction(),
  (item, loading, error, submissions, loggedIn, watchedIntroduction) => ({
    item, loading, error, submissions, loggedIn, watchedIntroduction
  })
), mapDispatchToProps)(HomePage);
