/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import { createSelector } from 'reselect';

import {
  selectOAuth,
  selectSubmissions,
  selectShowMenu,
  selectShowAllMenuItems
} from 'containers/App/selectors';

import {
  toggleMenu
} from '../App/actions';

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
    var submissions = 0
    if (this.props.submissions) {
      submissions = this.props.submissions.completed
    }

    var authentication = 'Save score'
    if (this.props.oauth && this.props.oauth.oauth) {
      authentication = this.props.oauth.oauth.data.name
    }

    var menu = null
    if (this.props.showMenu) {
      menu = (
        <Menu oauth={this.props.oauth} submissions={this.props.submissions}
          allItems={this.props.showAllMenuItems} />
      )
    }

    return (
      <header className={`${styles.header} ${styles['align-center']}`}>
        <div className={`${styles['align-center']}`}>
          <a style={{backgroundImage: `url(${nypl})`}} className={`${styles.nypl}`} href='//nypl.org' target='_blank'>
          </a>
          <h1>
            <Link to='/'>
              <span className={`orientation-horizontal ${styles['subtitle-spacing']}`}>
                <span className={`${styles['header-red']}`}>Space/Time Directory</span>
                <span>:</span>
              </span>
              <span>
                Surveyor
              </span>
            </Link>
          </h1>
        </div>
        <nav className={`${styles.nav} ${styles['align-center']}`}>
          <a href='javascript:void(0)' onClick={this.toggleMenu} className={`${styles['align-center']}`}>
            <span className={`${styles.submissions}`}>
              {submissions}
            </span>
            <span className={`${styles['header-red']} ${styles.authentication}`}>
             {authentication}
            </span>
          </a>
          <Link to='/about'>
            <span className='orientation-horizontal'>About</span>
            <span className='orientation-vertical'>ⓘ</span>
          </Link>
        </nav>
        {menu}
      </header>
    );
  }

  toggleMenu = (e) => {
    this.props.toggleMenu(e.nativeEvent.shiftKey)
    e.preventDefault()
  }

}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    toggleMenu: (allItems) => {
      dispatch(toggleMenu(allItems));
    },
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectOAuth(),
  selectSubmissions(),
  selectShowMenu(),
  selectShowAllMenuItems(),
  (oauth, submissions, showMenu, showAllMenuItems) => ({
    oauth, submissions, showMenu, showAllMenuItems
  })
), mapDispatchToProps)(Header);
