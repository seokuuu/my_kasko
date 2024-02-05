import React from 'react'
import { MainSelect } from '../../../../../common/Option/Main'
import { FilterLeft, Input, PartWrap, RowWrap } from '../../../../../modal/External/ExternalFilter'

/**
 * @description
 * FAQ 목록 검색필터입니다.
 */
const FAQSearchFields = ({ search, setSearch, commonDropdownButtonHandler, searchOptions, s }) => {
	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap>
						<h6>검색</h6>
						<MainSelect
							options={searchOptions}
							defaultValue={searchOptions[0]}
							value={searchOptions[0]}
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
