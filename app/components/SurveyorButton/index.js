import React from 'react'

import Buttons from 'components/Buttons'
import Button from 'components/Button'

export default function SurveyorButton (props) {
  const to = '/' + (props.id || '')
  return (
    <Buttons>
      <Button to={to} type='primary'>Start Surveying!</Button>
    </Buttons>
  )
}
