import React, { useEffect } from 'react'
import { Input, PartWrap } from '../../modal/External/ExternalFilter'
import { GreyBtn } from '../../common/Button/Button'
import { useAtom } from 'jotai'
import { invenCustomer, invenCustomerData } from '../../store/Layout/Layout'
import InventoryFind from '../../modal/Multi/InventoryFind'
import useReactQuery from '../../hooks/useReactQuery'
import { getCustomerFind } from '../../service/admin/Auction'

/**
 * TODO 고객사 검색 components
 * @param name 고객사 이름
 * @param code 고객사 코드
 * @param setName 고객사 이름 set 이벤트
 * @param setCode 고객사 코드 set 이벤트
 */
const CustomerSearch = ({ name, code, setName, setCode }) => {
  const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
  const [customerData, _] = useAtom(invenCustomerData)
  const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

  const modalOpen = () => setCustomerPopUp(true)

  useEffect(() => {
    setName(customerData.name)
    setCode(customerData.code)
  }, [customerData.code, customerData.name])

  return (
    <PartWrap>
      <h6>고객사 명/고객사 코드</h6>
      <Input name="customerName" value={name} readOnly />
      <Input name="customerCode" value={code} readOnly />
      <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
        찾기
      </GreyBtn>
      {customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />}
    </PartWrap>
  )
}

export default CustomerSearch
