import { styled } from 'styled-components'

export const TableWrap = styled.div`
	margin: 30px auto;
`

export const ClaimTable = styled.div`
	display: block;
`
export const ClaimRow = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	font-size: 16px;

	@media print {
		font-size: 14px;
	}
`
export const ClaimTitle = styled.div`
	display: flex;
	border: 1px solid #c8c8c8;
	background-color: #dbe2f0;
	width: 16.66%;
	justify-content: center;
	align-items: center;
`
export const ClaimContent = styled.div`
	display: flex;
	border: 1px solid #c8c8c8;
	background-color: white;
	width: 16.66%;
	justify-content: center;
	align-items: center;
	color: ${({ bold }) => (bold ? '#17479e' : 'none')};
	font-weight: ${({ bold }) => (bold ? '700' : 'none')};
`

export const DateTitle = styled.div`
	width: ${({ small }) => (small ? '220px' : '260px')};
	padding: 10px;
	font-size: 16px;
`

export const ClaimContent2 = styled.div`
	width: 85%;
	display: flex;
	padding: 0px 20px;
	flex-direction: row-reverse;
	border: 1px solid #c8c8c8;
	background-color: white;
	align-items: center;
`
