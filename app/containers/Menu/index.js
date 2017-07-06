import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectLoading,
  selectOAuth,
  selectSubmissions,
  selectLoggedIn,
  selectWatchedIntroduction
} from 'containers/App/selectors'

import {
  logOut,
  setIntroductionWatched
} from 'containers/App/actions'

import Dropdown from 'containers/Dropdown'
import AuthMenuButton from 'components/AuthMenuButton'

import { Container, Hamburger, Nav, StyledButton, StyledLink, StyledA, DropDownItem } from './styles'

import iconSinglePane from 'images/icon-single-pane.svg'
import iconTwoPanes from 'images/icon-split-panes.svg'
import iconHamburger from 'images/icon-hamburger.svg'

export class Menu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showDropdown: false,
      shiftKey: false
    }
  }

  makeProviderList () {
    if (!(this.props.oauth && this.props.oauth.providers)) {
      return []
    } else {
      return this.props.oauth.providers
        .map((provider) => (
          <StyledA href={provider.url}>
            Log in with {provider.title}
          </StyledA>
        ))
    }
  }

  render () {
    if (this.props.loading) {
      return null
    }

    if (!this.props.watchedIntroduction && !this.props.loggedIn && !(this.props.submissions.completed > 0)) {
      return (
        <Container>
          <StyledButton onClick={this.toSurveyor.bind(this)}>Start Surveying!</StyledButton>
        </Container>
      )
    }

    const helpSelected = this.props.path === 'help'
    const aboutSelected = this.props.path === 'about'
    const surveying = !helpSelected && !aboutSelected

    const isAuthenicated = this.props.oauth && this.props.oauth.oauth && this.props.oauth.oauth.provider

    let menuItems

    if (isAuthenicated) {
      const title = this.props.oauth.oauth.data && this.props.oauth.oauth.data.name
      const logOutText = `Log out` + (title ? ` ${title}` : '')

      menuItems = [
        <StyledButton onClick={this.props.logOut}>{logOutText}</StyledButton>
      ]

      if (this.state.shiftKey) {
        menuItems = [
          ...menuItems,
          ...this.makeProviderList()
        ]
      }
    } else {
      menuItems = this.makeProviderList()
    }

    const hideFirst = 2
    menuItems = [
      <StyledLink to={this.props.homepageLink}>Start Surveying!</StyledLink>,
      <StyledLink to='/help'>Help</StyledLink>,
      <StyledLink to='/about'>About</StyledLink>,
      ...menuItems
    ]

    return (
      <Container>
        <AuthMenuButton className='toggle-dropdown' onClick={this.toggleDropdown.bind(this)}
          oauth={this.props.oauth} submissions={this.props.submissions} />
        <Hamburger className='toggle-dropdown' onClick={this.toggleDropdown.bind(this)}>
          <img aria-label='Menu' src={iconHamburger} alt='Menu' />
        </Hamburger>
        <Dropdown show={this.state.showDropdown} onHide={this.hideDropdown.bind(this)}>
          {menuItems.map((item, index) => (
            <DropDownItem key={index} className={index < hideFirst ? 'show-on-mobile' : undefined}>
              {item}
            </DropDownItem>
          ))}
        </Dropdown>
        <Nav>
          <StyledButton selected={surveying && this.props.paneMode === 'split'} title='Split panes'
            onClick={this.props.splitPaneClick}><img alt='Switch to split pane mode' src={iconTwoPanes} /></StyledButton>
          <StyledButton selected={surveying && this.props.paneMode === 'single'} title='Single pane'
            onClick={this.props.singlePaneClick}><img alt='Switch to single pane mode' src={iconSinglePane} /></StyledButton>
          <StyledLink selected={helpSelected} to='/help'>Help</StyledLink>
          <StyledLink selected={aboutSelected} to='/about'>About</StyledLink>
        </Nav>
      </Container>
    )
  }

  toSurveyor () {
    this.props.setIntroductionWatched()
  }

  hideDropdown () {
    this.setState({
      showDropdown: false
    })
  }

  toggleDropdown (event) {
    const shiftKey = event.nativeEvent && event.nativeEvent.shiftKey
    this.setState({
      showDropdown: !this.state.showDropdown,
      shiftKey
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logOut: () => dispatch(logOut()),
    setIntroductionWatched: () => dispatch(setIntroductionWatched())
  }
}

export default connect(createSelector(
  selectLoading(),
  selectOAuth(),
  selectSubmissions(),
  selectLoggedIn(),
  selectWatchedIntroduction(),
  (loading, oauth, submissions, loggedIn, watchedIntroduction) => ({
    loading, oauth, submissions, loggedIn, watchedIntroduction
  })
), mapDispatchToProps)(Menu)
