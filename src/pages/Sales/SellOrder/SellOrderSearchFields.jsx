import { useAtomValue } from 'jotai'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	FilterRight,
	FilterLeft,
	Input,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
	GridWrap,
} from '../../../modal/External/ExternalFilter'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import DateGrid from '../../../components/DateGrid/DateGrid'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import { customerModalAtom } from '../../../store/Layout/GlobalProductSearch'
import InventoryFind from '../../../modal/Multi/InventoryFind'

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
					<PartWrap>
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
					<PartWrap>
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
					<PartWrap>
						<h6 style={{ width: '165px' }}>상시판매 주문일자</h6>
						<GridWrap>
							<DateGrid width={130} bgColor={'white'} fontSize={17} />
							<Tilde>~</Tilde>
							<DateGrid width={130} bgColor={'white'} fontSize={17} />
						</GridWrap>
					</PartWrap>
					<PartWrap>
						<h6>상시 판매 번호</h6>
						<Input />
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
						stateKey="saleCategoryList"
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
