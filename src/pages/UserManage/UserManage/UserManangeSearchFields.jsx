import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	FilterLeft,
	FilterRight,
	Input,
	PartWrap,
	RowWrap
} from '../../../modal/External/ExternalFilter'

import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { GreyBtn } from '../../../common/Button/Button'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'

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
