import { styled } from 'styled-components'

export const OverAllMain = styled.div`
	width: 100%;
	display: flex;
`

export const OverAllSub = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 230px);
	background-color: ${(props) => props.theme.colors.BgPrimary};
`

export const OverAllTable = styled.div`
	width: 100%;
	padding: 0px 50px;
`
