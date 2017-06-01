import React from 'react'
import { connect } from 'react-redux'

import {
  setIntroductionWatched
} from '../App/actions'

import Page from 'components/Page'
import Flex from 'components/Flex'
import Button from 'components/Button'

export class IntroModal extends React.Component {
  toSurveyor () {
    this.props.setIntroductionWatched()
  }

  render () {
    return (
      <Page>
        <p>
          <strong>Here comes introduction text (same as introduction paragraph on About page).</strong>
        </p>
        <Flex>
          <Button type='surveyor' onClick={this.toSurveyor.bind(this)}>Start Surveying!</Button>
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
