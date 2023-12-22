import React, { useState } from 'react'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../../common/Overall/Overall.styled'
import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'
import SideBar from '../../../../components/Left/SideBar'
import ClaimProduct from './ClaimProduct'

/**
 * @description
 * 클레임 등록할 제품 찾기
 */
const ClaimProductPage = () => {
  const [expanded, setExpanded] = useState('운영 관리')
  const [depth2Color, setDepth2Color] = useState('일반 관리')
  return (
    <div>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <ClaimProduct />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </div>
  )
}

export default ClaimProductPage
