import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import SellOrderDetail from './SellOrderDetail'

import { useState } from 'react'

const SellOrderDetailPage = () => {
  const [expanded, setExpanded] = useState('상시 판매 관리')
  const [depth2Color, setDepth2Color] = useState('상시 판매 주문 확인')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <SellOrderDetail />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default SellOrderDetailPage
