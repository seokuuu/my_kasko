import { useAtom } from 'jotai'
import React from 'react'
import { GreyBtn } from '../../common/Button/Button'
import useReactQuery from '../../hooks/useReactQuery'
import { Input, PartWrap } from '../../modal/External/ExternalFilter'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { getCustomerFind } from '../../service/admin/Auction'
import { customerModalAtom } from '../../store/Layout/GlobalProductSearch'
/**
 * @description
 * @param search
 * @param setSearch
 */
const CustomerSearch = ({ search, setSearch }) => {
	// 고객사 목록입니다.
	const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

	// 고객사 코드 및 이름을 setState에 할당해줍니다.
	const handleInventoryFindButtonOnClick = (data) => {
		// data가 없거나 && data에 code 필드가 없거나 && data에 name 필드가 없으면 함수를 종료합니다.
		if (!data && !Object.hasOwn(data ?? {}, 'code') && !Object.hasOwn(data ?? {}, 'name')) return
		setSearch((p) => ({ ...p, customerCode: data?.code ?? '', customerName: data?.name ?? '' }))
	}
	// 고객사 모달값잆니다.
	const [modal, setModal] = useAtom(customerModalAtom)
	return (
		<PartWrap>
			<h6>고객사 명/고객사 코드</h6>
			<Input name="customerName" value={search.customerName} readOnly />
			<Input name="customerCode" value={search.customerCode} readOnly />
			<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={() => setModal(true)}>
				찾기
			</GreyBtn>
			{modal && (
				<InventoryFind
					title={'고객사 찾기'}
					handleButtonOnClick={handleInventoryFindButtonOnClick}
					setSwitch={setModal}
					data={inventoryCustomer}
				/>
			)}
		</PartWrap>
	)
}

export default CustomerSearch
