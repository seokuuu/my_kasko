import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterHeader, StyledHeading, SubTitle } from '../../../../../modal/External/ExternalFilter'

const CategoryTab = () => {
	// 쿼리 스트링 설정
	const [searchParams, setSearchParams] = useSearchParams()
	const category = searchParams.get('category')

	// 카테고리 탭 옵션
	const categoryOptions = [
		{ text: '제품군 관리', value: 'product' },
		{ text: '정책 관리', value: 'policy' },
		{ text: '창고 관리', value: 'storage' },
	]
	return (
		<div>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>운영 관리</h1>
					<SubTitle>
						{categoryOptions.map((c) => (
							<StyledHeading
								key={c.value}
								isActive={category === c.value}
								onClick={() => {
									searchParams.set('category', c.value)
									setSearchParams(searchParams)
								}}
							>
								{c.text}
							</StyledHeading>
						))}
					</SubTitle>
				</div>
				{/* 토글 쓰기 */}
			</FilterHeader>
		</div>
	)
}

export default CategoryTab
