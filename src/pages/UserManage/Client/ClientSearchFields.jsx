import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	PWRight,
	PartWrap,
	RowWrap,
} from '../../../modal/External/ExternalFilter'

import { useState } from 'react'
import { DateSearchSelect, RadioSearchButton } from '../../../components/Search'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import { GreyBtn } from '../../../common/Button/Button'
import { useAtomValue, useSetAtom } from 'jotai'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import StandardFind from '../../../modal/Multi/StandardFind'
import { MainSelect } from '../../../common/Option/Main'

const ClientSearchFields = ({
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

	/**
	 * @description
	 * 경매 일자 auctionStartDate, auctionEndDate
	 * 경매 회차 번호 auctionEndDate
	 * 진행 상태 ?
	 * 제품 번호 auctionEndDate
	 */

	const init = {
		pageNum: 1,
		pageSize: 50,
	}

	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	const [param, setParam] = useState(init)
	const customerStatusList = ['미 입고', '입고 대기', '입고 확정', '입고 확정 취소']
	const agreeStatusList = ['승인', '미승인', '대기']

	function generateCheckOptions(textOptions) {
		return textOptions.map((text) => ({
			text: text,
			value: text,
			checked: false,
		}))
	}

	const setIsKyuModal = useSetAtom(kyuModalAtom)
	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap>
						<h6>입고 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(customerStatusList)}
							setState={setSearch}
							stateKey={'customerStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
					<PartWrap first>
						{/* TODO : 변경해야함 */}
						<h6> 고객사 유형 </h6>
						<PWRight>
							<MainSelect
								options={storageList}
								// defaultValue={storageList[0]}
								value={search.storage}
								name="storage"
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap>
						<h6>승인 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(agreeStatusList)}
							setState={setSearch}
							stateKey={'agreeStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
					<PartWrap>
						{/* TODO : 변경해야함 */}
						<h6>회원 상태</h6>
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
			{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
			<FilterRight></FilterRight>
		</>
	)
}

export default ClientSearchFields
