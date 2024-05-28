import { useAtomValue } from 'jotai'
import { FilterLeft, FilterRight, PartWrap, RowWrap } from '../../modal/External/ExternalFilter'
import StandardFind from '../../modal/Multi/StandardFind'
import ProductNumber from '../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { kyuModalAtom } from '../../store/Layout/GlobalProductSearch'
import { DateSearchSelect } from '../../components/Search'
import CustomCheckBox from '../Operate/UI/CustomCheckBox/CustomCheckBox'
import React from 'react'

const OrderSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	onSpecHandler,
}) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<>
			<FilterLeft>
				<RowWrap none>
					<DateSearchSelect
						title={'주문 일자'}
						startInitDate={search.orderStartDate}
						endInitDate={search.orderEndDate}
						startDateChange={(value) => onChange('orderStartDate', value)}
						endDateChange={(value) => onChange('orderEndDate', value)}
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
