import styled from 'styled-components'

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
  max-width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
