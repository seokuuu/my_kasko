import { useAtom } from 'jotai'
import React from 'react'
import { getDestinationFind } from '../../api/search'
import { GreyBtn } from '../../common/Button/Button'
import useReactQuery from '../../hooks/useReactQuery'
import { CustomInput, PartWrap } from '../../modal/External/ExternalFilter'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { invenDestination } from '../../store/Layout/Layout'
import DestinationFind from '../../modal/Multi/DestinationFind'

/**
 * TODO 목적지 검색 components
 * @param name 목적지 명
 * @param code 목적지 코드
 * @param setName 목적지 명 set 이벤트
 * @param setCode 목적지 코드 set 이벤트
 * @param short 제목을 "목적지" 로 전달
 */
const DestinationSearch = ({ name, code, setName, setCode, short }) => {
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	const modalOpen = () => setDestinationPopUp(true)

	const handleFindButtonOnClick = (data) => {
		if (!data && !Object.hasOwn(data ?? {}, 'code') && !Object.hasOwn(data ?? {}, 'name')) return
		setName(data.name)
		setCode(data.code)
	}

	return (
		<PartWrap first>
			{short ? <h6>목적지</h6> : <h6>목적지/목적지 코드</h6>}
			<CustomInput width={200} height={36} value={name && code ? name + '/' + code : ''} />
			<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
				찾기
			</GreyBtn>
			{destinationPopUp && (
				<DestinationFind handleButtonOnClick={handleFindButtonOnClick} setSwitch={setDestinationPopUp} />
			)}
		</PartWrap>
	)
}

export default DestinationSearch
