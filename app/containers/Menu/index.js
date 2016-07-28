import React from 'react'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import {
  toggleMenu,
  logOut
} from '../App/actions'

import styles from './styles.css'

export class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
  }

  render () {
    var hasSubmissions = this.props.submissions && this.props.submissions.completed > 0;
    var isAuthenicated = this.props.oauth && this.props.oauth.oauth && this.props.oauth.oauth.provider;

    var userSubmissionsLink
    if (hasSubmissions) {
      userSubmissionsLink = (
        <a className={`${styles.link}`} href='http://spacetime.nypl.org/here'>See your submissions on a map</a>
      )
    }

    const makeProviderList = (omitProvider) => {
      if (!(this.props.oauth && this.props.oauth.providers)) {
        return []
      } else {
        return this.props.oauth.providers
          .filter((provider) => provider.name !== omitProvider)
          .map((provider) => (
            <a className={`${styles.link}`} href={provider.connect}>
              Log in with {provider.title}
            </a>
          ))
      }
    }

    var menuItems = [
      // userSubmissionsLink,
      // <a className={`${styles.link}`} href='http://spacetime.nypl.org/here#all'>See <b>all</b> submissions on a map</a>,
      // <hr className={`${styles.hr}`} />
    ]

    if (isAuthenicated) {
      menuItems = [
        ...menuItems,
        <a className={`${styles.link}`} href='javascript:void(0);' onClick={this.props.logOut}>
          Log out
        </a>
      ];

      if (this.props.shiftKey) {
        menuItems = [
          ...menuItems,
          ...makeProviderList(this.props.oauth.oauth.provider)
        ]
      }
    } else {
      menuItems = [
        ...menuItems,
        ...makeProviderList()
      ]
    }

    if (menuItems.length === 0) {
      return null;
    }

    let style = {
      top: this.props.y,
      left: this.props.x - this.state.width / 2
    };

    return (
      <div className={`${styles.menu} ${styles['arrow-box']}`} style={style} ref='menu'>
        <ul>
          {menuItems.map((menuItem, i) => (
            <li key={i}>
              {menuItem}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  componentDidMount() {
    this.boundOutsideClick = this.outsideClick.bind(this);
    window.addEventListener('click', this.boundOutsideClick);

    var node = findDOMNode(this.refs.menu);
    this.setState({
      width: node.clientWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.boundOutsideClick);
  }

  firstOutsideClick = true;

  outsideClick(e) {
    // I don't know why, but a click event is fired even before the menu is
    // shown for the first time (when user clicks on link in header)
    // Menu should not hide when is event is fired, so first event should
    // be ignored.
    if (this.firstOutsideClick) {
      this.firstOutsideClick = false;
      return;
    }
    this.props.toggleMenu();
  }

}

function mapDispatchToProps (dispatch) {
  return {
    toggleMenu: () => dispatch(toggleMenu(false)),
    logOut: () => dispatch(logOut())
  }
}

export default connect(null, mapDispatchToProps)(Menu)
