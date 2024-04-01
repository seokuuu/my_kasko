import styled from 'styled-components'

export function SaleNumberCellRender({ data }) {
	return (
		<span>
			<Point>{data['상시판매 번호']}</Point>
		</span>
	)
}

const Point = styled.p`
	color: #4c83d6;
	font-size: 14px;
	font-weight: 600;
	padding-left: 4px;
`
