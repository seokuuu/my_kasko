import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import UserSalesWrapper from '../_layouts/UserSalesWrapper'
import Order from './Order'
import OrderDetail from './OrderDetail'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderPage = () => {
  const [expanded, setExpanded] = useState('상시판매')
  const [depth2Color, setDepth2Color] = useState('주문확인')
  const { salesNumber } = useParams(); 

  return (
    <UserSalesWrapper>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            { salesNumber? <OrderDetail salesNumber={salesNumber} /> : <Order /> }
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </UserSalesWrapper>
  )
}

export default OrderPage
