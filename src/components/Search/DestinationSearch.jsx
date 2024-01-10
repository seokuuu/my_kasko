import { GreyBtn } from '../../common/Button/Button'
import React, { useEffect } from 'react'
import { CustomInput, PartWrap } from '../../modal/External/ExternalFilter'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { useAtom } from 'jotai'
import { invenDestination, invenDestinationData } from '../../store/Layout/Layout'
import useReactQuery from '../../hooks/useReactQuery'
import { getDestinationFind } from '../../api/search'

/**
 * TODO 목적지 검색 components
 * @param name 목적지 명
 * @param code 목적지 코드
 * @param setName 목적지 명 set 이벤트
 * @param setCode 목적지 코드 set 이벤트
 */
const DestinationSearch = ({ name, code, setName, setCode }) => {
  const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
  const [destinationData, _] = useAtom(invenDestinationData)
  const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

  const modalOpen = () => setDestinationPopUp(true)

  useEffect(() => {
    setName(destinationData.name)
    setCode(destinationData.code)
  }, [destinationData.code, destinationData.name])

  return (
    <PartWrap first>
      <h6>목적지/목적지 코드</h6>
      <CustomInput width={200} height={36} value={name && code ? name + '/' + code : ''} />
      <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
        찾기
      </GreyBtn>
      {destinationPopUp && (
        <InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
      )}
    </PartWrap>
  )
}

export default DestinationSearch
