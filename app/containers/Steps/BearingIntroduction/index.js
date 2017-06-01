import React from 'react'

import Button from 'components/Button'
import Flex from 'components/Flex'

import { Explanation, TextStep } from '../styles'

import explanation from 'images/bearing-explanation.svg'

export class Step extends React.Component {
  render () {
    return (
      <TextStep>
        <div>
          <h2>Thanks!</h2>
          <p>
            If it's clear which way the camera is pointing, try setting the camera angle.
            Otherwise, you can just continue to the next image.
          </p>
          <p>
            <Explanation alt='Camera and target' title='Camera and target' src={explanation} />
          </p>
        </div>
        <Flex justifyContent='flex-end'>
          <Button onClick={this.props.skip} type='skip'>Skip</Button>
          <Button onClick={this.props.next} type='submit'>Continue</Button>
        </Flex>
      </TextStep>
    )
  }
}

export default Step
