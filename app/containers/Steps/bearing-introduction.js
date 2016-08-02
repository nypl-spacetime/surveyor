import React from 'react';

import StepContainer from 'components/StepContainer';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import styles from './bearing-introduction.css';

const explanation = require('../../images/bearing-explanation.svg');

export class Step extends React.Component {

  render() {
    return (
      <StepContainer>
        <div className='center-vertically sidebar-padding'>
          <h3 className='centered'>Thanks!</h3>
          <p>
            If it's clear which way the camera is pointing, try setting the camera angle.
            Otherwise, you can just continue to the next image.
          </p>
          <p>
            <img className={styles.explanation} src={explanation} />
          </p>
        </div>
        <div>
          <Buttons>
            <Button onClick={this.next.bind(this)} type='secondary'>Set Camera Angle</Button>
          </Buttons>
          <Buttons>
            <Button onClick={this.props.skip} type='primary'>Skip this step</Button>
          </Buttons>
        </div>
      </StepContainer>
    );
  }

  next () {
    this.props.next()
  }

}

export default Step;
