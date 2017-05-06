import React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

const tutorial = 'https://s3.amazonaws.com/spacetime-nypl-org/assets/surveyor+tutorial.mp4'

import poster from 'images/tutorial-poster.jpg'

export const StyledVideo = styled.video`
  width: 100%;
  cursor: pointer;
`

export class IntroVideo extends React.Component {

  render () {
    return (
      <StyledVideo poster={poster} ref='video' tabindex='0'
        onEnded={this.ended.bind(this)} onClick={this.play.bind(this)}>
        <source src={tutorial} type='video/mp4' />
      </StyledVideo>
    )
  }

  play () {
    var node = findDOMNode(this.refs.video)
    node.play()
    node.setAttribute('controls', 'controls')
  }

  ended () {
    var node = findDOMNode(this.refs.video)
    node.load()
  }
}

export default IntroVideo
