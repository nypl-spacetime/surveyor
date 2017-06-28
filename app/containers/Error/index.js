import React from 'react'
import { connect } from 'react-redux'

import Flex from 'components/Flex'
import Button from 'components/Button'
import CenteredItemPage from 'components/CenteredItemPage'

import { createSelector } from 'reselect'

import {
  selectError
} from 'containers/App/selectors'

import { Container, Lion, Eye, ErrorMessage, Centered } from './styles'

const nypl = require('images/nypl.svg')
const eye = require('images/error.svg')

export class Error extends React.Component {

  render () {
    const error = this.props.error
    const status = error.error.status

    if (status === 401) {
      // Unauthorized! User should log in
      return (
        <CenteredItemPage>
          <Container>
            <ErrorMessage>
              Unauthorized — please log in with Google, Facebook, Twitter or GitHub.
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
              <Flex><Button type='new' onClick={this.reload}>Reload page</Button></Flex>
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
    // try {
    //   window.localStorage.clear()
    // } catch (err) {
    //   console.error(err.message)
    // }

    const parts = window.location.pathname.split('/#/')
    window.location = parts[0]
  }
}

export default connect(createSelector(
  selectError(),
  (error) => ({
    error
  })
))(Error)
