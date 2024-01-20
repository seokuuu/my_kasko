import { useAtomValue } from 'jotai'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { FilterRight, FilterLeft, Input, PWRight, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import { customerModalAtom } from '../../../store/Layout/GlobalProductSearch'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import { DateSearchSelect, InputSearch } from '../../../components/Search'

const SellOrderSearchFields = ({
	search,
	setSearch,
	commonDropdownButtonHandler,
	modalButtonClickHandler,
	setCustomerModalAtom,
}) => {
	const {
		// prettier-ignore
		storageList,
		spartList,
		inventoryCustomer,
	} = useGlobalProductSearchFieldData()

	const handleInventoryFindButtonOnClick = (data) => {
		commonDropdownButtonHandler(data.code, 'customerCode')
		commonDropdownButtonHandler(data.name, 'customerName')
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
								defaultValue={storageList[0]}
								value={search.storage}
								name="storage"
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
							/>
						</PWRight>
					</PartWrap>
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
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					<PartWrap first>
						<h6>고객사 명</h6>
						<Input value={search.customerName} readOnly name="customerName" />
						<Input value={search.customerCode} readOnly name="customerCode" />
						<GreyBtn
							style={{ width: '70px' }}
							height={35}
							margin={10}
							fontSize={17}
							onClick={() => modalButtonClickHandler('customer')}
						>
							찾기
						</GreyBtn>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<DateSearchSelect
							title={'상시판매 주문일자'}
							startInitDate={search.orderStartDate}
							endInitDate={search.orderEndDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'orderStartDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'orderEndDate')}
						/>
					</PartWrap>
					<PartWrap>
						<InputSearch
							title={'상시 판매 번호'}
							value={search.productName}
							onChange={(value) => commonDropdownButtonHandler(value, 'auctionNumber')}
						/>
					</PartWrap>
				</RowWrap>
				<PartWrap first>
					<h6>주문 상태</h6>
					<CustomCheckBox
						initOptions={[
							{
								checked: false,
								text: '판매재',
								value: '판매재',
							},
							{
								checked: false,
								text: '판매제외제',
								value: '판매제외제',
							},
						]}
						setState={setSearch}
						stateKey="orderStatusList"
					/>
				</PartWrap>
			</FilterLeft>
			<FilterRight>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
			{useAtomValue(customerModalAtom) === true && (
				<InventoryFind
					title={'고객사 찾기'}
					handleButtonOnClick={handleInventoryFindButtonOnClick}
					setSwitch={setCustomerModalAtom}
					data={inventoryCustomer}
				/>
			)}
		</>
	)
}

export default SellOrderSearchFields
