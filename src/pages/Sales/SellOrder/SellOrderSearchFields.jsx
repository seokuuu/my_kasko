import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { DateSearchSelect, InputSearch } from '../../../components/Search'
import CustomerSearch from '../../../components/Search/CustomerSearch'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { FilterLeft, FilterRight, PWRight, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'

const SellOrderSearchFields = ({ search, setSearch, commonDropdownButtonHandler }) => {
	const {
		// prettier-ignore
		storageList,
		spartList,
	} = useGlobalProductSearchFieldData()

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
					<CustomerSearch search={search} setSearch={setSearch} />
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
					<h6>상시판매 상태</h6>
					<CustomCheckBox
						initOptions={[
							{
								checked: false,
								text: '주문요청',
								value: '주문 요청',
							},
							{
								checked: false,
								text: '주문확정',
								value: '주문 확정',
							},
							{
								checked: false,
								text: '주문취소',
								value: '주문 취소',
							},
						]}
						setState={setSearch}
						stateKey="orderStatusList"
						isExistEntireValue={true}
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
		</>
	)
}

export default SellOrderSearchFields
