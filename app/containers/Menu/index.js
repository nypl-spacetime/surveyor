/*
 * Menu
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'

import {
  logOut
} from '../App/actions'

import styles from './styles.css'

export class Menu extends React.Component {

  render () {
    var hasSubmissions = this.props.submissions && this.props.submissions.completed > 0
    var isAuthenicated = this.props.oauth && this.props.oauth.oauth && this.props.oauth.oauth.provider

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
              Log in with <img src={provider.icon} /> {provider.title}
            </a>
          ))
      }
    }

    var menuItems = [
      userSubmissionsLink,
      <a className={`${styles.link}`} href='http://spacetime.nypl.org/here#all'>See <b>all</b> submissions on a map</a>,
      <hr className={`${styles.hr}`} />
    ]

    if (isAuthenicated) {
      menuItems = [
        ...menuItems,
        <a className={`${styles.link}`} href='javascript:void(0);' onClick={this.props.logOut}>
          Log out
        </a>,
        <hr className={`${styles.hr}`} />
      ]

      if (this.props.allItems) {
        menuItems = [
          ...menuItems,
          <span className={styles.divider}>Log in with a different provider:</span>,
          ...makeProviderList(this.props.oauth.oauth.provider)
        ]
      }
    } else {
      menuItems = [
        ...menuItems,
        ...makeProviderList()
      ]
    }

    return (
      <div className={`${styles.menu} ${styles.arrow_box}`}>
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

}

function mapDispatchToProps (dispatch) {
  return {
    logOut: () => {
      dispatch(logOut())
    }

    // changeRoute: (url) => dispatch(push(url)),
  }
}

export default connect(null, mapDispatchToProps)(Menu)
