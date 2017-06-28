/* global __CONFIG__ */

import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import Button from 'components/Button'
import Flex from 'components/Flex'

import {
  selectLoggedIn
} from 'containers/App/selectors'

import { TextStep, Animal, TimerBarContainer, TimerBar } from '../styles'

const configAnimals = __CONFIG__.animals
const animalsByUuid = {}
configAnimals.forEach((animal) => {
  animalsByUuid[animal.uuid] = animal
})

function requireAll (r) {
  return r.keys().map((filename) => {
    const uuid = filename.match(/\.\/(.*)\.small\.png$/)[1]
    return {
      src: r(filename),
      ...animalsByUuid[uuid]
    }
  })
}
const animals = requireAll(require.context('images/public-domain-animals/', false, /\.small\.png$/))

export class Step extends React.Component {

  intitialTimeout = null
  timerBarTimeout = null

  constructor (props) {
    super(props)
    this.state = {
      timerStarted: false,
      duration: 4,
      animal: this.randomAnimal()
    }
  }

  randomAnimal () {
    const animal = animals[Math.floor(Math.random() * animals.length)]

    return {
      src: animal.src,
      name: animal.name
    }
  }

  render () {
    const timerBarStyle = {
      width: this.state.timerStarted ? '100%' : 0,
      transitionDuration: `${this.state.duration}s`
    }

    let oauthQuestion
    if (!this.props.loggedIn) {
      oauthQuestion = (
        <p>
          To save your score, please log in with Google, Facebook, Twitter or GitHub.
        </p>
      )
    }

    const thanks = `The ${this.state.animal.name} says thanks!`

    return (
      <TextStep>
        <div>
          <h2>Thank you!</h2>
          <p>
           Your submission has been recorded.
          </p>
          {oauthQuestion}
          <Animal src={this.state.animal.src} alt={thanks} />
        </div>
        <div>
          <TimerBarContainer>
            <TimerBar style={timerBarStyle} />
          </TimerBarContainer>
          <Flex justifyContent='flex-end'>
            <Button type='submit' onClick={this.next.bind(this)}>Next image</Button>
          </Flex>
        </div>
      </TextStep>
    )
  }

  componentDidMount () {
    this.intitialTimeout = setTimeout(() => {
      this.setState({
        timerStarted: true
      })

      // Initialize timer which proceeds to first step
      this.timerBarTimeout = setTimeout(this.next.bind(this), this.state.duration * 1000)
    }, 100)
  }

  next () {
    if (this.intitialTimeout) {
      clearTimeout(this.intitialTimeout)
    }

    if (this.timerBarTimeout) {
      clearTimeout(this.timerBarTimeout)
    }

    this.props.next()
  }
}

export default connect(createSelector(
  selectLoggedIn(),
  (loggedIn) => ({
    loggedIn
  })
))(Step)
