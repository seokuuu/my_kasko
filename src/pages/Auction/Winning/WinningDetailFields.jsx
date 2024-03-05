import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { FilterLeft, FilterRight, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'

import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { DateSearchSelect, RadioSearchButton } from '../../../components/Search'
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

	const onChangeRadio = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

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
						<h6>낙찰 상태</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: '낙찰', value: '낙찰' },
								{ label: '낙찰 취소', value: '낙찰 취소' },
								{ label: '낙찰 확정', value: '낙찰 확정' },
							]}
							value={search.biddingStatus}
							onChange={(value) => onChangeRadio('biddingStatus', value)}
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>

			<FilterRight></FilterRight>
		</>
	)
}

export default WinningDetailFields
