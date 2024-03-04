import { SearchContainer, PartWrap, FilterLeft, RowWrap } from '../../../modal/External/ExternalFilter'
import { InputSearch } from '../../../components/Search'
import React from 'react'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { MainSelect } from '../../../common/Option/Main'

const DispatchSearchFilter = ({ search, setSearch }) => {
	const { storageList } = useGlobalProductSearchFieldData()
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap none>
					<InputSearch title={'기사명'} value={search.driverName} onChange={(value) => onChange('driverName', value)} />
					<InputSearch title={'차량번호'} value={search.carNumber} onChange={(value) => onChange('carNumber', value)} />
					<InputSearch title={'차량종류'} value={search.carType} onChange={(value) => onChange('carType', value)} />
					<PartWrap>
						<h6>창고 구분</h6>
						<MainSelect
							options={storageList}
							// defaultValue={storageList[0]}
							value={search.storage}
							name="storage"
							onChange={(e) => onChange('storage', e)}
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>
		</SearchContainer>
	)
}

export default DispatchSearchFilter
