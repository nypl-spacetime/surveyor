import React from 'react'

import Flex from 'components/Flex'
import Button from 'components/Button'

export default function SurveyorButton (props) {
  const to = '/' + (props.id || '')

  return (
    <Flex justifyContent='flex-end'>
      <Button to={to} type='surveyor'>Start Surveying!</Button>
    </Flex
    >
  )
}
