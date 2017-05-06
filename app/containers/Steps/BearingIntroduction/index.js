import React from 'react'

import StepContainer from 'components/StepContainer'
import Button from 'components/Button'
import Buttons from 'components/Buttons'

import { Explanation } from './styles'

import explanation from 'images/bearing-explanation.svg'

export class Step extends React.Component {
  render () {
    return (
      <StepContainer>
        <div className='center-vertically sidebar-padding'>
          <h3 className='centered'>Thanks!</h3>
          <p>
            If it's clear which way the camera is pointing, try setting the camera angle.
            Otherwise, you can just continue to the next image.
          </p>
          <p>
            <Explanation alt='Camera and target' title='Camera and target' src={explanation} />
          </p>
        </div>
        <div>
          <Buttons justifyContent='flex-end'>
            <Button onClick={this.props.skip} type='secondary'>Skip</Button>
            <Button onClick={this.next.bind(this)} type='primary'>Continue</Button>
          </Buttons>
        </div>
      </StepContainer>
    )
  }

  next () {
    this.props.next()
  }
}

export default Step
