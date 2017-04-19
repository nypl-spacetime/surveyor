/* global __CONFIG__ */

import styled from 'styled-components'

const mainColor = __CONFIG__.cssVariables.mainColor

export const StyledButton = styled.button`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 10px;
  }
`

export const Submissions = styled.span`
  font-size: 40px;
`

export const Title = styled.span`
  color: ${mainColor};
`
