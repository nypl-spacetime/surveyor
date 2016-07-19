import React from 'react';

import StepContainer from 'components/StepContainer';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import styles from './bearing-introduction.css';

export class Step extends React.Component {

  render() {
    return (
      <div className={`${styles.container} sidebar-padding`}>
        <h3 className='centered'>Thanks!</h3>
        <p>If it's clear which way the camera is pointing, try <a href='javascript:void(0);' onClick={this.next.bind(this)}>setting the camera angle</a>. Otherwise, you can just continue to the <a href="javascript:void(0);" onClick={this.props.skip}>next image</a>.</p>

        <Buttons>
          <Button onClick={this.next.bind(this)} type='secondary'>Set Camera Angle</Button>
        </Buttons>

        <Buttons>
          <Button onClick={this.props.skip} type='primary'>Next Image</Button>
        </Buttons>
      </div>
    );
  }

  next () {
    this.props.next()
  }

}

export default Step;


// import React from 'react'
//
// var explanation = require('../../images/bearing-explanation.svg')
//
// const Step = React.createClass({
//
//   render: function() {
//     return (
//       <div className='geotagger-step all-margin-top opaque'>
//         <h1>Thank you!</h1>
//         <div>
//           Thanks. Would you also like to try finding the angle/bearing/direction of the image?
//         </div>
//         <div>
//           <img className='bearing-explanation' src={explanation} />
//         </div>
//         <div className='buttons'>
//           <button className='button-red' onClick={this.props.thanks}>No!</button>
//           <button className='button-green' onClick={this.done}>Yes, please!</button>
//         </div>
//       </div>
//     )
//   },
//
//   done: function() {
//     this.props.done()
//   }
//
// })
//
// export default Step
