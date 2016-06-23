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
  selectRepos,
  selectUuid,
  selectItem,
  selectOAuth,
  selectSubmissions,
  selectMods,
  selectLoading,
  selectError
} from 'containers/App/selectors';

import {
  loadRepos,
  loadOAuth,
  loadItem
} from '../App/actions';

import Error from 'containers/Error';
import Loading from 'containers/Loading';

import Image from 'containers/Image';
import Sidebar from 'containers/Sidebar';

import Button from 'components/Button';
import H2 from 'components/H2';

import styles from './styles.css';

export class HomePage extends React.Component {

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  // componentWillMount = () => {
  //   if (!this.props.item) {
  //     var routeUuid = this.props.params.uuid
  //     if (routeUuid) {
  //       // TODO: check if routeUuid is valid form?!
  //       this.props.loadItem(routeUuid);
  //     }
  //   }
  // }

  render() {
    let mainContent = null;

    if (this.props.loading) {
      mainContent = <Loading />
    } else if (this.props.error) {
      mainContent = <Error />
    } else {
      mainContent = (
        <div className={`${styles.container}`}>
          <Image item={this.props.item} />
          <Sidebar mods={this.props.mods} />
        </div>
      );
    }

    return mainContent;
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    getOAuth: () => {
      dispatch(loadOAuth());
    },
    nextItem: () => {
      dispatch(loadItem());
    },
    loadItem: (uuid) => {
      dispatch(loadItem(uuid));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectRepos(),

  selectUuid(),
  selectItem(),
  selectOAuth(),
  selectSubmissions(),
  selectMods(),

  selectLoading(),
  selectError(),
  (repos, uuid, item, oauth, submissions, mods, loading, error) => ({
    repos, uuid, item, oauth, submissions, mods, loading, error
  })
), mapDispatchToProps)(HomePage);
