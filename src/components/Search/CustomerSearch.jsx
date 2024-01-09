import React, { useEffect } from 'react'
import { Input } from '../../modal/External/ExternalFilter'
import { GreyBtn } from '../../common/Button/Button'
import { useAtom } from 'jotai'
import { invenCustomer, invenCustomerData } from '../../store/Layout/Layout'
import InventoryFind from '../../modal/Multi/InventoryFind'
import useReactQuery from '../../hooks/useReactQuery'
import { getCustomerFind } from '../../service/admin/Auction'

// TODO 고객사 검색 components
const CustomerSearch = ({ name, code, onChange }) => {
  const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
  const [customerData, _] = useAtom(invenCustomerData)
  const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

  const modalOpen = () => setCustomerPopUp(true)

  useEffect(() => {
    onChange((prev) => ({ ...prev, customerName: customerData?.name, customerCode: customerData?.code }))
  }, [customerData.code, customerData.name])

  return (
    <>
      <Input name="customerName" value={name} readOnly />
      <Input name="customerCode" value={code} readOnly />
      <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
        찾기
      </GreyBtn>
      {customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />}
    </>
  )
}

export default CustomerSearch
