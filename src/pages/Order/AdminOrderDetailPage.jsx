import { OverAllMain, OverAllSub, OverAllTable } from '../../common/Overall/Overall.styled'

import SideBar from '../../components/Left/SideBar'
import Header from '../../components/Header/Header'
import SubHeader from '../../components/Header/SubHeader'
import { useState } from 'react'
import AdminOrderDetail from './AdminOrderDetail'
const OrderDetailPage = () => {
  const [expanded, setExpanded] = useState('주문 관리')
  const [depth2Color, setDepth2Color] = useState('주문 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <AdminOrderDetail />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default OrderDetailPage
