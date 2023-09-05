import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Bidding from './Bidding'

import { useState } from 'react'

const BiddingPage = () => {
  const [expanded, setExpanded] = useState('경매 관리')
  const [depth2Color, setDepth2Color] = useState('경매 응찰(단일/패키지)')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Bidding />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default BiddingPage
