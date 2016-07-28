/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';

import { createSelector } from 'reselect';

import {
  selectOAuth,
  selectSubmissions,
  selectMenu
} from 'containers/App/selectors';

import {
  toggleMenu
} from '../App/actions';

import HeaderComponent from 'components/Header';

import Menu from 'containers/Menu';

import styles from './styles.css';

import nypl from 'images/nypl.svg';

export class Header extends React.Component {

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  openAbout = () => {
    this.openRoute('/about');
  };

  render() {
    var submissions = 0;
    if (this.props.submissions) {
      submissions = this.props.submissions.completed;
    }

    var authentication = 'Save score'
    if (this.props.oauth && this.props.oauth.oauth) {
      authentication = this.props.oauth.oauth.data.name || 'Logged in';
    }

    var menu = null;

    if (this.props.menu.show) {
      // TODO: compute y from height of header element
      let y = 68;
      menu = (
        <Menu oauth={this.props.oauth} submissions={this.props.submissions}
          x={this.props.menu.clientX} y={y}
          shiftKey={this.props.menu.shiftKey} />
      );
    }

    return (
      <HeaderComponent title='Surveyor' className={styles.header}>
        <nav className={`${styles.nav} ${styles['align-center']}`}>
          <a href='javascript:void(0)' onClick={this.toggleMenu} className={`${styles['align-center']}`} ref='menu-link'>
            <span className={`${styles.submissions}`}>
              {submissions}
            </span>
            <span className={`${styles.authentication}`}>
             {authentication}
            </span>
          </a>
          <Link to='/intro'>
            <span className='orientation-horizontal'>Intro</span>
            <span className='orientation-vertical'>?</span>
          </Link>
          <Link to='/about'>
            <span className='orientation-horizontal'>About</span>
            <span className='orientation-vertical'>ⓘ</span>
          </Link>
        </nav>
        {menu}
      </HeaderComponent>
    );
  }

  toggleMenu = (e) => {
    let x = 0;
    if (e.clientX) {
      x = e.clientX;
    } else {
      var node = findDOMNode(this.refs['menu-link']);
      x = node.getBoundingClientRect().right - node.offsetWidth / 2;
    }

    this.props.toggleMenu(true, x, e.nativeEvent.shiftKey);
    e.preventDefault();
  }

}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    toggleMenu: (show, clientX, shiftKey) => {
      dispatch(toggleMenu(show, clientX, shiftKey));
    },
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectOAuth(),
  selectSubmissions(),
  selectMenu(),
  (oauth, submissions, menu) => ({
    oauth, submissions, menu
  })
), mapDispatchToProps)(Header);
