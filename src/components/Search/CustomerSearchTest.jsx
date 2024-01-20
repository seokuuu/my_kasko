import { useAtomValue } from 'jotai'
import React from 'react'
import { GreyBtn } from '../../common/Button/Button'
import useReactQuery from '../../hooks/useReactQuery'
import { Input, PartWrap } from '../../modal/External/ExternalFilter'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { getCustomerFind } from '../../service/admin/Auction'
import { customerModalAtom } from '../../store/Layout/GlobalProductSearch'
/**
 * @description
 * 고객사 찾기 테스트 컴포넌트입니다.
 */
const CustomerSearchTest = ({
	search,
	// setName,
	// setCode,
	modalButtonClickHandler,
	commonDropdownButtonHandler,
	setCustomerModalAtom,
}) => {
	// const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
	// const [customerData, _] = useAtom(invenCustomerData)
	const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

	// const modalOpen = () => setCustomerPopUp(true)
	const handleInventoryFindButtonOnClick = (data) => {
		commonDropdownButtonHandler(data.code, 'customerCode')
		commonDropdownButtonHandler(data.name, 'customerName')
	}
	// useEffect(() => {
	// 	setName(customerData.name)
	// 	setCode(customerData.code)
	// }, [customerData.code, customerData.name])

	return (
		<PartWrap>
			<h6>고객사 명/고객사 코드</h6>
			<Input name="customerName" value={search.customerName} readOnly />
			<Input name="customerCode" value={search.customerCode} readOnly />
			<GreyBtn
				style={{ width: '70px' }}
				height={35}
				margin={10}
				fontSize={17}
				onClick={() => modalButtonClickHandler('customer')}
			>
				찾기
			</GreyBtn>
			{useAtomValue(customerModalAtom) === true && (
				<InventoryFind
					title={'고객사 찾기'}
					handleButtonOnClick={handleInventoryFindButtonOnClick}
					setSwitch={setCustomerModalAtom}
					data={inventoryCustomer}
				/>
			)}
			{/* {customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />} */}
		</PartWrap>
	)
}

export default CustomerSearchTest
