import { FilterLeft, FilterRight, RowWrap } from '../../../modal/External/ExternalFilter'
import { DestinationSearch, InputSearch } from '../../../components/Search'
import React from 'react'

const DestinationSearchFilter = ({
	// prettier-ignore
	search,
	setSearch,
}) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<InputSearch
						title={'목적지'}
						value={search.destinationName}
						onChange={(value) => onChange('destinationName', value)}
					/>
					<InputSearch
						title={'목적지 코드'}
						value={search.destinationCode}
						onChange={(value) => onChange('destinationCode', value)}
					/>
					{/*<DestinationSearch*/}
					{/*	name={search.destinationName}*/}
					{/*	code={search.destinationCode}*/}
					{/*	setName={(value) => onChange('destinationName', value)}*/}
					{/*	setCode={(value) => onChange('destinationCode', value)}*/}
					{/*/>*/}
				</RowWrap>
			</FilterLeft>
			<FilterRight></FilterRight>
		</>
	)
}

export default DestinationSearchFilter
