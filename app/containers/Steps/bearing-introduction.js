import React from 'react';

import Button from 'components/Button';
import Buttons from 'components/Buttons';

export class Step extends React.Component {

  render() {
    return (
      <div>
        BEaring camera??!?? wil je het doen?
        <Buttons>
          <Button onClick={this.props.reset}>Skip</Button>
          <Button onClick={this.done.bind(this)}>Submit</Button>
        </Buttons>
      </div>
    );
  }

  done () {
    this.props.done()
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
