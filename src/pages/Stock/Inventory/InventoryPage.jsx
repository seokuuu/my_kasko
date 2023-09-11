import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Inventory from './Inventory'

import { useState } from 'react'

const IncomingPage = () => {
  const [expanded, setExpanded] = useState('재고 관리')
  const [depth2Color, setDepth2Color] = useState('재고 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Inventory />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default IncomingPage
