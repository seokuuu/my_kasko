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
				<RowWrap>
					{/* 창고 구분 */}
					<PartWrap first>
						<h6>창고 구분</h6>
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
					{/* 고객사 명 */}
					<PartWrap>
						<CustomerSearch search={search} setSearch={setSearch} />
					</PartWrap>
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<h6>구분</h6>
						{/* 제품군 */}
						<PWRight>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								value={search.spart}
								name="spart"
								onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<DateSearchSelect
						title={'경매 일자'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => onChange('auctionStartDate', value)}
						endDateChange={(value) => onChange('auctionEndDate', value)}
					/>
					<DateSearchSelect
						title={'확정 전송 일자'}
						startInitDate={search.startSendDate}
						endInitDate={search.endSendDate}
						startDateChange={(value) => onChange('startSendDate', value)}
						endDateChange={(value) => onChange('endSendDate', value)}
					/>
				</RowWrap>
				{/* 6 행 */}
				<RowWrap none>
					{/*<DateSearchSelect*/}
					{/*	title={'상시 판매 주문 일자'}*/}
					{/*	startInitDate={search.startDate}*/}
					{/*	endInitDate={search.endDate}*/}
					{/*	startDateChange={(value) => onChange('startDate', value)}*/}
					{/*	endDateChange={(value) => onChange('endDate', value)}*/}
					{/*/>*/}
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
