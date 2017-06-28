import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  setIntroductionWatched
} from '../App/actions'

import Page from 'components/Page'
import Flex from 'components/Flex'
import Button from 'components/Button'
import GetStarted from 'containers/GetStarted'

const Padded = styled.div`
  padding: 2em;
`

export class IntroModal extends React.Component {
  toSurveyor () {
    this.props.setIntroductionWatched()
  }

  render () {
    return (
      <Page>
        <h2>Welcome to Surveyor!</h2>
        <p>
          Help <a href='https://nypl.org/'>The New York Public Library</a> put New York City’s history on the map!
        </p>
        <p>
          Surveyor is a geotagging tool designed to enhance the metadata of items within <a href='https://digitalcollections.nypl.org/'>NYPL
          Digital Collections</a>. It allows you to view and place images on a map of New York City.
          With each contribution through Surveyor, users add new knowledge to the Library's collections!
        </p>
        <h3>Get Started</h3>
        <GetStarted />
        <Flex justifyContent='center'>
          <Padded>
            <Button type='surveyor' onClick={this.toSurveyor.bind(this)}>Start Surveying!</Button>
          </Padded>
        </Flex>
      </Page>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setIntroductionWatched: () => dispatch(setIntroductionWatched())
  }
}

export default connect(null, mapDispatchToProps)(IntroModal)
