import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import styled from 'styled-components'

import Flex from 'components/Flex'
import Button from 'components/Button'

const Padded = styled.div`
  padding: 2em;
`

export class SurveyorButton extends React.Component {
  render () {
    const to = '/' + (this.props.id || '')
    return (
      <Flex justifyContent='center'>
        <Padded>
          <Button to={to} type='surveyor'>Start Surveying!</Button>
        </Padded>
      </Flex>
    )
  }

  toSurveyor () {
    const to = '/' + (this.props.id || '')
    this.props.replaceRoute(to)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    replaceRoute: (url) => dispatch(replace(url))
  }
}

export default connect(null, mapDispatchToProps)(SurveyorButton)
