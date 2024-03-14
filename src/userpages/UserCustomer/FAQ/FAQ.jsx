import React, { useState } from 'react'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { categories, corLabels } from '../../../constants/user/faqTableConfig'
import {
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import TableV2 from '../../../pages/Table/TableV2'
import { useNavigate } from 'react-router-dom'

const FAQ = ({
	faqList,
	faqPagination,
	totalCount,
	onPageChange,
	handleTablePageSize,
	onSelectedCategory,
	isLoading,
}) => {
	const navigate = useNavigate()
	const [selectedCategory, setSelectedCategory] = useState('경매')

	const getCategoryStyle = (category) => ({
		color: selectedCategory === category ? 'black' : 'grey',
		fontWeight: selectedCategory === category ? 'bold' : 'normal',
	})

	const handleCategoryClick = (category) => {
		onSelectedCategory(category)
		setSelectedCategory(category)
	}

	const handleOnRowClicked = (row) => {
		const faqUid = row.data.uid
		navigate(`/userpage/userfaq/${faqUid}`)
	}

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>FAQ</h1>
					<SubTitle>
						{categories.map((category, index) => (
							<button key={index} style={getCategoryStyle(category)} onClick={() => handleCategoryClick(category)}>
								{category}
							</button>
						))}
					</SubTitle>
				</div>
			</FilterHeader>
			<TableContianer>
				<TCSubContainer bor>
					<div>게시글 목록 ({totalCount?.toLocaleString()}개 )</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
					</div>
				</TCSubContainer>
				<TableV2
					getRow={faqList}
					loading={isLoading}
					getCol={corLabels}
					tablePagination={faqPagination}
					onPageChange={onPageChange}
					handleOnRowClicked={handleOnRowClicked}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default FAQ
