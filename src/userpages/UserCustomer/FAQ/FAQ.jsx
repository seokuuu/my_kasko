import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { categories, corLabels, responseToTableRowMap } from '../../../constants/user/faqTableConfig'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	FilterContianer,
	FilterHeader,
	SubTitle,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { formatDateString } from '../../../utils/utils'

const FAQ = ({ faqList, faqPagination, onPageChange, handleTablePageSize, onSelectedCategory, isLoading, isError }) => {
	const [faqListData, setFaqListData] = useState(null)
	const [faqPaginationData, setFaqPaginationData] = useState(null)
	const [selectedCategory, setSelectedCategory] = useState('경매')
	const navigate = useNavigate()

	console.log('faqPagination :', faqPagination)

	useEffect(() => {
		setFaqListData(formatTableRowData(faqList))
		setFaqPaginationData(faqPagination)
	}, [faqList, faqPagination, selectedCategory])

	const formatDate = (date) => {
		return formatDateString(date, '/')
	}

	const formatTableRowData = (faqList) => {
		if (!faqList || faqList.length === 0) return null

		const filteredList = faqList
			.map((e) => {
				e.createDate = formatDate(e.createDate)
				return e
			})
			.filter((faq) => faq.category === selectedCategory)

		return add_element_field(filteredList, responseToTableRowMap)
	}

	const getCategoryStyle = (category) => ({
		color: selectedCategory === category ? 'black' : 'grey',
		fontWeight: selectedCategory === category ? 'bold' : 'normal',
	})

	const handleCategoryClick = (category) => {
		onSelectedCategory(category)
		setSelectedCategory(category)
	}

	const handleOnRowClicked = (row) => {
		console.log('row =>', row)
		const faqUid = row.data.uid
		navigate(`/userpage/userfaq/${faqUid}`)
	}

	// 목록 갯수
	const listCount = useMemo(() => faqPagination.listCount, [faqPagination])
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
					<div>게시글 목록 ({listCount}개 )</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
					</div>
				</TCSubContainer>
				<Table
					getCol={corLabels}
					getRow={faqListData}
					isRowClickable={true}
					handleOnRowClicked={handleOnRowClicked}
					tablePagination={faqPaginationData}
					onPageChange={onPageChange}
					loading={isLoading}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

FAQ.propTypes = {
	faqList: PropTypes.arrayOf(
		PropTypes.shape({
			category: PropTypes.string,
			count: PropTypes.number,
			createDate: PropTypes.string,
			title: PropTypes.string,
			uid: PropTypes.number,
		}),
	),
}

export default FAQ
