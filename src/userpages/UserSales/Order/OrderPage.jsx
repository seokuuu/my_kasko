import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Order from './Order'
import OrderDetail from './OrderDetail'

import { useState } from 'react'

const OrderPage = () => {
  const [expanded, setExpanded] = useState('상시판매')
  const [depth2Color, setDepth2Color] = useState('주문확인')
  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Order />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default OrderPage
