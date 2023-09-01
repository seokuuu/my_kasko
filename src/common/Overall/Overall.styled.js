import { styled } from 'styled-components'

export const OverAllMain = styled.div`
  min-width: 1200px;
  display: flex;
`

export const OverAllSub = styled.div`
  width: 100%;
  display: block;
  background-color: ${(props) => props.theme.colors.BgPrimary};
`

export const OverAllTable = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`
