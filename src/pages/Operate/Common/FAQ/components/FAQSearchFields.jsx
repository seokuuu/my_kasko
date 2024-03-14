import React from 'react'
import { MainSelect } from '../../../../../common/Option/Main'
import { FilterLeft, Input, PartWrap, RowWrap } from '../../../../../modal/External/ExternalFilter'

/**
 * @description
 * FAQ 목록 검색필터입니다.
 */
const FAQSearchFields = ({ search, setSearch, searchOptions, s }) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap>
						<h6>검색</h6>
						<MainSelect
							options={searchOptions}
							value={search.category}
							onChange={(e) => {
								onChange('category', e)
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
