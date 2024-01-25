import { useAtomValue, useSetAtom } from 'jotai'
import { GreyBtn } from '../../common/Button/Button'
import { MainSelect } from '../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterRight,
	FilterLeft,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../modal/External/ExternalFilter'
import StandardFind from '../../modal/Multi/StandardFind'
import ProductNumber from '../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { kyuModalAtom } from '../../store/Layout/GlobalProductSearch'
import { DateSearchSelect } from '../../components/Search'
import CustomerSearch from '../../components/Search/CustomerSearch'
import CustomCheckBox from '../Operate/UI/CustomCheckBox/CustomCheckBox'
import React from 'react'

const OrderSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	modalButtonClickHandler,
	onSpecHandler,
}) => {
	const {
		// prettier-ignore
		storageList,
		spartList,
	} = useGlobalProductSearchFieldData()

	const setIsKyuModal = useSetAtom(kyuModalAtom)
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<>
			<FilterLeft>
				<RowWrap none>
					<DateSearchSelect
						title={'주문 일자'}
						startInitDate={search.startDate}
						endInitDate={search.endDate}
						startDateChange={(value) => onChange('startDate', value)}
						endDateChange={(value) => onChange('endDate', value)}
					/>
					<PartWrap>
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
								},								{
									checked: false,
									text: '주문 취소',
									value: '주문 취소',
								},								{
									checked: false,
									text: '주문 확정',
									value: '주문 확정',
								},
							]}
							setState={setSearch}
							stateKey="orderStatusList"
						/>
					</PartWrap>
				</RowWrap>
				{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
			</FilterLeft>
			<FilterRight>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
		</>
	)
}

export default OrderSearchFields
