import React from 'react';

import StepContainer from 'components/StepContainer';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import styles from './thanks.css';

const requireAll = (requireContext) => requireContext.keys().map(requireContext);

var thankYouAnimals = requireAll(
  require.context('images/public-domain-animals/', false, /-small.png$/)
);

export class Step extends React.Component {

  intitialTimeout = null;
  timerBarTimeout = null;

  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      duration: 2.5,
      animalSrc: this.randomAnimal()
    };
  }

  randomAnimal() {
    return thankYouAnimals[Math.floor(Math.random() * thankYouAnimals.length)];
  }

  render() {
    var timerBarStyle = {
      width: this.state.timerStarted ? '100%' : 0,
      transitionDuration: `${this.state.duration}s`
    };

    return (
      <StepContainer>
        <div className={` ${styles.container} sidebar-padding`}>
          <h3 className='centered'>Thank you!</h3>
          <img className={styles.animal} src={this.state.animalSrc}/>
          <div className={styles['timer-bar']} style={timerBarStyle} />
        </div>
        <Buttons>
          <Button type='primary' onClick={this.next.bind(this)}>Next image</Button>
        </Buttons>
      </StepContainer>
    );
  }

  componentDidMount() {
    this.intitialTimeout = setTimeout(() => {
      this.setState({
        timerStarted: true
      });

      // Initialize timer which proceeds to first step
      this.timerBarTimeout = setTimeout(this.next.bind(this), this.state.duration * 1000);
    }, 100);
  }

  next() {
    if (this.intitialTimeout) {
      clearTimeout(this.intitialTimeout);
    }

    if (this.timerBarTimeout) {
      clearTimeout(this.timerBarTimeout);
    }

    this.props.next();
  }
}

export default Step;

//
//

//
// const Step = React.createClass({
//
//   getInitialState: function() {
//     return {
//       timerStarted: false,
//       duration: 2.5
//     };
//   },
//
//   intitialTimeout: null,
//   timerBarTimeout: null,
//
//   render: function() {
//     var timerBarStyle = {
//       width: this.state.timerStarted ? '100%' : 0,
//       transitionDuration: `${this.state.duration}s`
//     };
//
//     return (
//       <div className='geotagger-step all-margin-top opaque'>
//         <h1>Thank you!</h1>
//
//         <div>
//           <img className='centered-block geotagger-thanks-owl' src={owl} />
//         </div>
//         <div>
//           <div className='geotagger-thanks-timer-bar' style={timerBarStyle} />
//         </div>
//         <div>
//           <button className='button-green' onClick={this.done}>Show me another image</button>
//         </div>
//       </div>
//     );
//   },
//
//   componentDidMount() {
//     this.intitialTimeout = setTimeout(() => {
//       this.setState({
//         timerStarted: true
//       });
//       // Initialize timer which proceeds to first step
//       this.timerBarTimeout = setTimeout(this.done, this.state.duration * 1000);
//     }, 100);
//   },
//
//   done: function() {
//     if (this.intitialTimeout) {
//       clearTimeout(this.intitialTimeout);
//     }
//
//     if (this.timerBarTimeout) {
//       clearTimeout(this.timerBarTimeout);
//     }
//
//     this.props.done();
//   }
// });
//
// export default Step;
