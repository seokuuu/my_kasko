import React, { useState } from 'react'
import { FilterFooter, ResetImg } from '../../modal/External/ExternalFilter'
import { BlackBtn } from '../../common/Button/Button'
import { useAtomValue } from 'jotai'
import { toggleAtom } from '../../store/Layout/Layout'

/**
 * TODO 공통 Filter Footer components
 * @param reset 초기화 이벤트
 * @param onSearch 검색 이벤트
 */
const GlobalFilterFooter = ({ reset, onSearch }) => {
  const [isRotated, setIsRotated] = useState(false)

  const handleImageClick = async () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
    await reset()
  }

  return (
    <FilterFooter>
      <div style={{ display: 'flex' }}>
        <p>초기화</p>
        <ResetImg
          src="/img/reset.png"
          style={{ marginLeft: '10px', marginRight: '20px' }}
          onClick={handleImageClick}
          className={isRotated ? 'rotate' : ''}
        />
      </div>
      <div style={{ width: '180px' }}>
        <BlackBtn width={100} height={40} onClick={onSearch}>
          검색
        </BlackBtn>
      </div>
    </FilterFooter>
  )
}

export default GlobalFilterFooter