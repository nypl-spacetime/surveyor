import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectPaneMode
} from '../App/selectors'

import {
  setPaneIndex
} from '../App/actions'

import Button from 'components/Button'
import { Container } from './styles'

export class PaneButton extends React.Component {
  render () {
    const text = this.props.index === 1 ? 'Map ⟶' : '⟵ Photo'
    return (
      <Container paneMode={this.props.paneMode}>
        <Button onClick={this.onClick.bind(this)} type='primary'>
          {text}
        </Button>
      </Container>
    )
  }

  onClick () {
    this.props.setPaneIndex(this.props.index)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPaneIndex: (index) => {
      dispatch(setPaneIndex(index))
    },
    dispatch
  }
}

export default connect(createSelector(
  selectPaneMode(),
  (paneMode) => ({
    paneMode
  })
), mapDispatchToProps)(PaneButton)
