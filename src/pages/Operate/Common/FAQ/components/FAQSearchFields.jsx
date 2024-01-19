import React from 'react'
import { MainSelect } from '../../../../../common/Option/Main'
import { FilterLeft, Input, PartWrap, RowWrap } from '../../../../../modal/External/ExternalFilter'
import { searchCategoryOptions } from '../../../constants'

/**
 * @description
 * FAQ 목록 검색필터입니다.
 */
const FAQSearchFields = ({ search, setSearch, commonDropdownButtonHandler }) => {
	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap>
						<h6>검색</h6>
						<MainSelect
							options={searchCategoryOptions}
							defaultValue={searchCategoryOptions[0]}
							value={search.category}
							onChange={(e) => {
								commonDropdownButtonHandler(e, 'category')
							}}
						/>
						<Input value={search.keyword} onChange={(e) => setSearch((p) => ({ ...p, keyword: e.target.value }))} />
					</PartWrap>
				</RowWrap>
			</FilterLeft>
		</>
	)
}

export default FAQSearchFields
