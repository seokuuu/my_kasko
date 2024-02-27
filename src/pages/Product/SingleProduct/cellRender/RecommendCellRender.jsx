import styled from 'styled-components'

export function recommendCell({ data }) {
	return (
		<>
			{data['추천 제품 여부'] ? (
				<>
					<span style={{ display: 'flex', gap: '4px', paddingLeft: '4px' }}>
						<Point>추천</Point>
						<Number>{data['제품 번호']}</Number>
					</span>
				</>
			) : (
				<div>
					<span>{data['제품 번호']}</span>
				</div>
			)}
		</>
	)
}

const Point = styled.p`
	color: #dbbe4a;
	font-size: 16px;
	font-weight: 600;
	padding-left: 4px;
`
const Number = styled.p`
	z-index: 20;
`
