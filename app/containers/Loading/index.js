import React from 'react'
import styled from 'styled-components'

import CenteredItemPage from 'components/CenteredItemPage'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 150px;
  }
`

const Text = styled.div`
  margin: 0 auto;
  width: 60px;
  white-space: nowrap;
`

const nypl = require('images/nypl.svg')

export class Loading extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dots: 0,
      maxDots: 3
    }
  }

  render () {
    const loading = `Loading${(new Array(this.state.dots + 1).join('.'))}`
    return (
      <CenteredItemPage>
        <Container>
          <img src={nypl} />
          <Text>{loading}</Text>
        </Container>
      </CenteredItemPage>
    )
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({
        dots: (this.state.dots + 1) % (this.state.maxDots + 1)
      })
    }, 500)
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

export default Loading
