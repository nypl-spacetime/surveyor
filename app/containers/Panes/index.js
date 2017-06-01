import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectPaneIndex,
  selectPaneMode
} from 'containers/App/selectors'

import { Container, Pane } from './styles'

export class Panes extends React.Component {

  render () {
    const panes = this.props.children.length

    return (
      <Container>
        {this.props.children.map((child, index) => (
          <Pane index={index} panes={this.props.children.length}
            paneWidth={100 / panes} key={index}
            currentPaneIndex={this.props.paneIndex} paneMode={this.props.paneMode}>{child}</Pane>
        ))}
      </Container>
    )
  }

}

export default connect(createSelector(
  selectPaneIndex(),
  selectPaneMode(),
  (paneIndex, paneMode) => ({
    paneIndex, paneMode
  })
))(Panes)
