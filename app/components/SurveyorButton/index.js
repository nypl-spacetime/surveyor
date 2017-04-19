import React from 'react'

import Buttons from 'components/Buttons'
import Button from 'components/Button'

export default function SurveyorButton (props) {
  return (
    <Buttons>
      <Button to='/' type='primary'>Start Surveying!</Button>
    </Buttons>
  )
}
