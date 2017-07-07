import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { replace } from 'react-router-redux'

import {
  selectWatchedIntroduction
} from 'containers/App/selectors'

import {
  setIntroductionWatched
} from 'containers/App/actions'

import styled from 'styled-components'

import Flex from 'components/Flex'
import Button from 'components/Button'

const Padded = styled.div`
  padding: 2em;
`

export class SurveyorButton extends React.Component {
  render () {
    const to = '/' + (this.props.id || '')

    let button
    if (!this.props.watchedIntroduction) {
      button = (
        <Button type='surveyor' onClick={this.toSurveyor.bind(this)}>Start Surveying!</Button>
      )
    } else {
      button = (
        <Button to={to} type='surveyor'>Start Surveying!</Button>
      )
    }

    return (
      <Flex justifyContent='center'>
        <Padded>
          {button}
        </Padded>
      </Flex>
    )
  }

  toSurveyor () {
    this.props.setIntroductionWatched()
    this.props.replaceRoute('/')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setIntroductionWatched: () => dispatch(setIntroductionWatched()),
    replaceRoute: (url) => dispatch(replace(url))
  }
}

export default connect(createSelector(
  selectWatchedIntroduction(),
  (watchedIntroduction) => ({
    watchedIntroduction
  })
), mapDispatchToProps)(SurveyorButton)
