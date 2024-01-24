import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { useState } from 'react'
import { CustomerSearch, DateSearchSelect } from '../../../components/Search'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import { GreyBtn } from '../../../common/Button/Button'
import { useAtomValue, useSetAtom } from 'jotai'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import StandardFind from '../../../modal/Multi/StandardFind'

const ClientDestinationSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	const {
		// prettier-ignore
		storageList,
		supplierList,
		spartList,
		makerList,
		stockStatusList,
		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	const init = {
		customerCode: '',
		customerName: '',
		destinationCode: '',
		destinationName: '',
	}
	const [param, setParam] = useState(init)
	const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value, pageNum: 1 }))
	const setIsKyuModal = useSetAtom(kyuModalAtom)

	console.log('param', param)

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<CustomerSearch search={search} setSearch={setSearch} />
				</RowWrap>
			</FilterLeft>

			<FilterRight></FilterRight>
		</>
	)
}

export default ClientDestinationSearchFields
