 /* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const StyledButton = styled.button`
  & > span {
    display: flex;
    align-items: center;
  }

  & > span > * {
    margin-right: 10px;
  }
`

export const Submissions = styled.span`
  font-size: 40px;

  @media (max-width: ${mobileWidth}) {
    font-size: 30px;
  }
`

export const Title = styled.span`
  max-width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
