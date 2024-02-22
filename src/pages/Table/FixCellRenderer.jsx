import styled from 'styled-components'

export default function FixCellRenderer(props) {
	return <FixCell cellValue={props.value}>{props.value == '고정' ? '고정' : props.value}</FixCell>
}

const FixCell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 12px;
	padding: 4px;
	margin-top: 4px;
	margin-left: auto;
	margin-right: auto;
	width: 34px;
	/* padding: 4px; */
	height: 30px;
	font-weight: ${(props) => (props.cellValue === '고정' ? 'bold' : '')};
	color: ${(props) => (props.cellValue === '고정' ? 'white' : 'black')};
	background-color: ${(props) => (props.cellValue === '고정' ? '#B02525' : '')};
`
