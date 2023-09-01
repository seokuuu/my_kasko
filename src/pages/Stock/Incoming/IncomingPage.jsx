import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Incoming from './Incoming'

import { useState } from 'react'
import { styled } from 'styled-components'

const IncomingPage = () => {
  const [expanded, setExpanded] = useState('재고 관리')
  const [depth2Color, setDepth2Color] = useState('입고 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Incoming />
          </OverAllTable>
          <RightBar />
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default IncomingPage

const RightBar = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  width: 100px;
  height: 100px;
`
