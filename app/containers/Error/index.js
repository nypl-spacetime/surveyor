import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import CenteredItemPage from 'components/CenteredItemPage'
import Button from 'components/Button'
import Buttons from 'components/Buttons'

import { createSelector } from 'reselect'

import {
  selectError
} from 'containers/App/selectors'

import { Container, Lion, Eye, ErrorMessage, Centered } from './styles'

const nypl = require('images/nypl.svg')
const eye = require('images/error.svg')

export class Error extends React.Component {

  openRoute = (route) => {
    this.props.changeRoute(route)
  }

  openAbout = () => {
    this.openRoute('/')
  }

  render () {
    const error = this.props.error
    const status = error.error.status

    if (status === 401) {
      // Unauthorized! User should log in
      return (
        <CenteredItemPage>
          <Container>
            <ErrorMessage>
              Unauthorized — please log in by clicking Save score in the menu
            </ErrorMessage>
          </Container>
        </CenteredItemPage>
      )
    } else {
      const wasRandomItem = error && error.error &&
        error.error.status === 404 && error.error.url &&
        error.error.url.endsWith('random')

      const message = error ? error.message : ''

      if (!wasRandomItem) {
        return (
          <CenteredItemPage>
            <Container>
              <Lion>
                <img src={nypl} />
                <Eye src={eye} />
              </Lion>
              <ErrorMessage>{message}</ErrorMessage>
              <Buttons>
                <Button type='primary' onClick={this.reload.bind(this)}>Try again</Button>
              </Buttons>
            </Container>
          </CenteredItemPage>
        )
      } else {
        // TODO: if /items/random returns 404,
        // user has geotagged ALL availeble items!
        // this should be celebrated!

        return (
          <CenteredItemPage>
            <Container>
              <Lion>
                <img src={nypl} />
              </Lion>
              <ErrorMessage>
                Wow! You've geotagged <b>all</b> available images...
              </ErrorMessage>
              <Centered>
                Find other projects to contribute to on the <a href='http://spacetime.nypl.org/'>website of the NYC Space/Time Directory</a>.
              </Centered>
            </Container>
          </CenteredItemPage>
        )
      }
    }
  }

  reload () {
    this.openAbout()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(createSelector(
  selectError(),
  (error) => ({
    error
  })
), mapDispatchToProps)(Error)
