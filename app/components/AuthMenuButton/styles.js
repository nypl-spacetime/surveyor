 /* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const StyledButton = styled.button`
  padding: 0;
  margin-right: 10px;

  & > span {
    display: flex;
    align-items: center;
  }

  & > span > * {
    margin-right: 10px;
  }

  @media (max-width: ${mobileWidth}) {
    margin-right: 0;
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

  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`
