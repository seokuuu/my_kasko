import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { FilterLeft, FilterRight, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'

import React from 'react'
import { DateSearchSelect, InputSearch } from '../../../components/Search'
import { MainSelect } from '../../../common/Option/Main'

const TransportSearchFilter = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
}) => {
	const {
		// prettier-ignoreø
		storageList,
		spartList,
	} = useGlobalProductSearchFieldData()

	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	return (
		<>
			<FilterLeft>
				<RowWrap style={{ gap: '20px' }}>
					<PartWrap>
						<h6>출발지</h6>
						<MainSelect
							options={storageList}
							// defaultValue={storageList[0]}
							value={search.storage}
							name="storage"
							onChange={(e) => onChange('storage', e)}
						/>
					</PartWrap>
					<PartWrap>
						<InputSearch
							title={'목적지'}
							value={search.destinationName}
							onChange={(value) => onChange('destinationName', value)}
						/>
					</PartWrap>
					{/*<DestinationSearch*/}
					{/*	short={true}*/}
					{/*	name={search.destinationName}*/}
					{/*	code={search.destinationCode}*/}
					{/*	setName={(value) => onChange('destinationName', value)}*/}
					{/*	setCode={(value) => onChange('destinationCode', value)}*/}
					{/*/>*/}
					<PartWrap>
						<DateSearchSelect
							title={'적용 일자'}
							startInitDate={search.startDate}
							endInitDate={search.endDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'startDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'endDate')}
						/>
					</PartWrap>
					<PartWrap>
						<h6>제품구분</h6>
						<MainSelect
							options={spartList}
							defaultValue={spartList[0]}
							value={search.spart}
							name="spart"
							onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>
			<FilterRight></FilterRight>
		</>
	)
}

export default TransportSearchFilter
