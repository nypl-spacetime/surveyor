import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import StepContainer from 'components/StepContainer';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import {
  selectLoggedIn
} from 'containers/App/selectors';

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
    const timerBarStyle = {
      width: this.state.timerStarted ? '100%' : 0,
      transitionDuration: `${this.state.duration}s`
    };

    let oauthQuestion;

    if (!this.props.loggedIn) {
      oauthQuestion = (
        <p className='centered'>
          To save your score, please log in using the <b>Save score</b> option in the menu
        </p>
      )
    }

    return (
      <StepContainer>
        <div className={` ${styles.container} sidebar-padding`}>
          <h3 className='centered'>Thank you!</h3>
          {oauthQuestion}
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


export default connect(createSelector(
  selectLoggedIn(),
  (loggedIn) => ({
    loggedIn
  })
))(Step);
