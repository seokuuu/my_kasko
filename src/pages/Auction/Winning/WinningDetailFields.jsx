import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	FilterLeft,
	FilterRight,
	PartWrap,
	RowWrap
} from '../../../modal/External/ExternalFilter'

import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { DateSearchSelect } from '../../../components/Search'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'

const WinningDetailFields = ({
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
					{/* 구분 */}
					<PartWrap first>
						<DateSearchSelect
							title={'확정 전송 일자'}
							startInitDate={search.startSendDate}
							endInitDate={search.endSendDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'startSendDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'endSendDate')}
						/>
					</PartWrap>
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<h6>주문 상태</h6>
						<CustomCheckBox
							initOptions={[
								{
									checked: false,
									text: '확정 전송',
									value: '확정 전송',
								},
								{
									checked: false,
									text: '확정 전송 대기',
									value: '확정 전송 대기',
								},
							]}
							setState={setSearch}
							stateKey="orderStatusList"
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>

			<FilterRight></FilterRight>
		</>
	)
}

export default WinningDetailFields
