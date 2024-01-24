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

const UserManangeSearchFields = ({
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

	console.log('param', param)

	const setIsKyuModal = useSetAtom(kyuModalAtom)

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap>
						{/* TODO : 변경해야함 */}
						<h6>고객 검색</h6>
						<MainSelect
							options={storageList} 
							// defaultValue={storageList[0]}
							value={search.storage}
							name="storage"
							onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
						/>
						<Input readOnly={true} value={search.spec} />
						<GreyBtn
							style={{ width: '70px' }}
							height={35}
							margin={10}
							fontSize={17}
							onClick={() => setIsKyuModal(true)}
						>
							찾기
						</GreyBtn>
					</PartWrap>
				</RowWrap>
			</FilterLeft>

			<FilterRight></FilterRight>
		</>
	)
}

export default UserManangeSearchFields
