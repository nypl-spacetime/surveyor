import React from 'react';

import OAuthMenu from './menus/oauth'
import SubmissionsMenu from './menus/submissions'

import './header.scss';

const Header = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var submissions = 0
    if (this.state.submissions) {
      submissions = this.state.submissions
    }

    var authenticate = ''
    if (this.state.oauth) {
      authenticate = this.state.oauth.oauth.data.name
    } else {
      authenticate = 'Log in'
    }

    var menu
    if (this.state.oauth) {
      menu = (
        <OAuthMenu oauth={this.state.oauth} />
      )
    }

    return (
      <header>
        <h1>
          NYPL Labs - Where?
        </h1>
        <div id='user'>
          <span id='user-submission-count'>
            {submissions}
          </span>
          <span id='user-authenticate'>
            {authenticate}
          </span>
        </div>
        <div id='menu'>
          {menu}
        </div>
      </header>
    )
  },

  componentDidMount: function() {
    this.fetchOAuth()
    this.fetchSubmissions()
  },

  fetchOAuth: function () {


    // TODO: move ALL fetch logic to lib module
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }

    fetch(`${this.props.api.url}oauth`, {
      credentials: 'include'
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          oauth: json
        })
      }).catch((err) => {
        console.error(`Error fetching OAuth details`, err)
      })
  },

  fetchSubmissions: function () {

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }

    fetch(`${this.props.api.url}submissions/count`, {
      credentials: 'include'
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          submissions: json.submissions
        })
      }).catch((err) => {
        console.error(`Error fetching submissions count`, err)
      })
  }


})

export default Header
