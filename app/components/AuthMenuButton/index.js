import React from 'react'

import { StyledButton, Submissions, Title } from './styles'

export default function AuthMenuButton (props) {
  const hasSubmissions = props.submissions && props.submissions.completed > 0
  const isAuthenicated = props.oauth && props.oauth.oauth && props.oauth.oauth.provider

  const submissions = hasSubmissions ? props.submissions.completed : 0
  const title = isAuthenicated ? (props.oauth.oauth.data.name || 'Logged in') : 'Save score'

  return (
    <StyledButton {...props}>
      <Submissions>{submissions}</Submissions>
      <Title>{title}</Title>
    </StyledButton>
  )
}
