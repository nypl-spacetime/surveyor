import React from 'react'

import styled from 'styled-components'

import Flex from 'components/Flex'
import Button from 'components/Button'

const Padded = styled.div`
  padding: 2em;
`

export default function SurveyorButton (props) {
  const to = '/' + (props.id || '')

  return (
    <Flex justifyContent='center'>
      <Padded>
        <Button to={to} type='surveyor'>Start Surveying!</Button>
      </Padded>
    </Flex>
  )
}
