import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  loadOAuth
} from '../App/actions'

import {
  selectLoading
} from 'containers/App/selectors'

import Header from 'components/Header'

import Loading from 'containers/Loading'
import AuthMenu from 'containers/AuthMenu'

import { Container, Contents } from './styles'

import favIcon from 'images/favicon.png' // eslint-disable-line

export class App extends React.Component {

  componentWillMount = () => {
    this.props.loadOAuth()
  }

  render () {
    let contents

    if (this.props.loading) {
      contents = (
        <Loading />
      )
    } else {
      contents = this.props.children
    }

    contents = this.props.children

    const defaultTitle = 'Surveyor - NYC Space/Time Directory'

    return (
      <Container>
        <Helmet titleTemplate={`%s - ${defaultTitle}`}
          defaultTitle={defaultTitle} />
        <Header path={this.props.location.pathname.slice(1)}>
          <AuthMenu />
        </Header>
        <Contents>
          {contents}
        </Contents>
      </Container>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadOAuth: () => {
      dispatch(loadOAuth())
    },
    dispatch
  }
}

export default connect(createSelector(
  selectLoading(),
  (loading) => ({
    loading
  })
), mapDispatchToProps)(App)
