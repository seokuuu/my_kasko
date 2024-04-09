import React from 'react'
import { MainSelect } from '../../../../common/Option/Main'
import { DateSearchSelect, DestinationSearch } from '../../../../components/Search'
import CustomerSearch from '../../../../components/Search/CustomerSearch'
import useGlobalProductSearchFieldData from '../../../../hooks/useGlobalProductSearchFieldData'
import { FilterLeft, FilterRight, PWRight, PartWrap, RowWrap } from '../../../../modal/External/ExternalFilter'
import CustomCheckBox from '../../UI/CustomCheckBox/CustomCheckBox'
import ProductNumber from '../../../../components/GlobalProductSearch/SearchFields/ProductNumber'

/**
 * @description
 * 재고수불관리 검색필터입니다.
 */
const InventorySearchFields = ({ search, setSearch, commonDropdownButtonHandler }) => {
	const { storageList, spartList } = useGlobalProductSearchFieldData()
	// 입고상태 체크박스 목록
	const receiptStatusList = ['미 입고', '입고 대기', '입고 확정', '입고 확정 취소']

	// 판매구분 체크박스 목록
	const saleCategoryList = ['판매재', '판매 제외재', '판매 완료재']
	// 주문 상태 체크박스 목록
	const orderStatusList = ['확정 전송', '확정 전송 대기']
	// 출하 상태 체크박스 목록
	const shipmentStatusList = ['출하 대기', '출하 완료', '출고 지시', '출고 완료', '운송 완료']
	function generateCheckOptions(textOptions) {
		return textOptions.map((text) => ({
			text: text,
			value: text,
			checked: false,
		}))
	}
	// param change
	const onChange = (key, value) => setSearch((prev) => ({ ...prev, [key]: value }))
	return (
		<>
			<FilterLeft
				style={{
					maxWidth: '70%',
				}}
			>
				<RowWrap>
					<PartWrap first>
						<h6>창고 구분</h6>
						<PWRight>
							<MainSelect
								options={storageList}
								defaultValue={''}
								name="storage"
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
							/>
						</PWRight>
					</PartWrap>
					{/* 고객사 */}
					<CustomerSearch search={search} setSearch={setSearch} />
				</RowWrap>
				<RowWrap>
					{/* 목적지 */}
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>구분</h6>
						<PWRight>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								name="spart"
								value={search.spart}
								onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
							/>
						</PWRight>
					</PartWrap>
					<PartWrap>
						<h6>입고 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(receiptStatusList)}
							setState={setSearch}
							stateKey={'receiptStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>판매 구분</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(saleCategoryList)}
							setState={setSearch}
							stateKey={'saleCategoryList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
					<PartWrap>
						<h6>주문 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(orderStatusList)}
							setState={setSearch}
							stateKey={'orderStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>

				<RowWrap>
					<PartWrap first>
						<h6>출하 상태</h6>
						<CustomCheckBox
							initOptions={generateCheckOptions(shipmentStatusList)}
							setState={setSearch}
							stateKey={'shipmentStatusList'}
							isExistEntireValue={true}
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>

				<RowWrap>
					<DateSearchSelect
						title={'경매 일자'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
					/>
				</RowWrap>
				<RowWrap>
					<DateSearchSelect
						title={'주문 일자'}
						startInitDate={search.orderStartDate}
						endInitDate={search.orderEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
					/>
					<DateSearchSelect
						title={'출고 요청 일자'}
						startInitDate={search.shipmentRequestStartDate}
						endInitDate={search.shipmentRequestEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
					/>
				</RowWrap>
				<RowWrap>
					<DateSearchSelect
						title={'출고 지시 일자'}
						startInitDate={search.shippingStartDate}
						endInitDate={search.shippingEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
					/>
					<DateSearchSelect
						title={'출고 일자'}
						startInitDate={search.shipmentStartDate}
						endInitDate={search.shipmentEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
					/>
				</RowWrap>
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

export default InventorySearchFields
