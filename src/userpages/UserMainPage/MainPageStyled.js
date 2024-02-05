import { styled } from 'styled-components'

export const MainWrap = styled.div`
	width: 1450px;

	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: space-around;

	h1 {
		font-size: 22px;
		padding: 15px 0px;
		font-weight: bold;
	}
`

export const Left = styled.div`
	width: 50%;

	height: 40vw;
`

export const LeftSub1 = styled.div`
	width: 99%;
	height: 380px;

	padding: 20px;

	background-color: White;
	border: 1px solid #c8c8c8;
	margin-bottom: 20px;
`
export const LeftSub2 = styled.div`
	padding: 20px;
	background-color: White;
	width: 99%;
	height: 380px;
	border: 1px solid #c8c8c8;
`
export const Right = styled.div`
	width: 50%;
	height: 40vw;
`

export const RightSub = styled.div`
	border: 1px solid #c8c8c8;
	padding: 20px;
	gap: 10px;
	width: 99%;
	height: 780px;
	background-color: White;
`

export const Title = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 10px;
`

export const MainTabs = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 10px;
`

export const MainTabTitle = styled.p`
	font-size: 18px;
	color: ${(props) => (props.isColor ? props.theme.colors.PriNormal : props.theme.colors.BgBlack)};
	cursor: pointer;
`

export const Board = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 30px;
	font-size: 18px;
	cursor: pointer;
`

export const BoardLeft = styled.div`
	color: ${({ theme, high }) => (high ? theme.colors.StatAlert : 'black')};
	font-weight: ${({ high }) => (high ? 'bold' : 'normal')};
	display: flex;
	align-items: center;
	gap: 12px;
`

export const BoardRight = styled.div`
	color: ${({ theme, high }) => (high ? theme.colors.LineAlert : 'black')};
	font-size: 16px;
`

export const NotItemTitle = styled.div`
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	color: #6b6b6b;
`

export const MainBorderBar = styled.div`
	border-bottom: 2px solid #f1f1f1;
	width: 100%;
	margin: 18px 0;
`
