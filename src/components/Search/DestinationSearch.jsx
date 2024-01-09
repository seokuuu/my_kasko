import { GreyBtn } from '../../common/Button/Button'
import React, { useEffect } from 'react'
import { CustomInput } from '../../modal/External/ExternalFilter'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { useAtom } from 'jotai'
import { invenDestination, invenDestinationData } from '../../store/Layout/Layout'
import useReactQuery from '../../hooks/useReactQuery'
import { getDestinationFind } from '../../api/search'

// TODO 목적지 검색 components
const DestinationSearch = ({ name, code, onChange }) => {
  const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
  const [destinationData, _] = useAtom(invenDestinationData)
  const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

  const modalOpen = () => setDestinationPopUp(true)

  useEffect(() => {
    onChange((prev) => ({ ...prev, destinationName: destinationData?.name, destinationCode: destinationData?.code }))
  }, [destinationData.code, destinationData.name])

  return (
    <>
      <CustomInput width={200} height={36} value={name && code ? name + '/' + code : ''} />
      <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
        찾기
      </GreyBtn>
      {destinationPopUp && (
        <InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
      )}
    </>
  )
}

export default DestinationSearch
