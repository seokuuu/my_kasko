import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Hyundai from './Hyundai'

import { useState } from 'react'

const HyundaiPage = () => {
  const [expanded, setExpanded] = useState('판매 제품 관리')
  const [depth2Color, setDepth2Color] = useState('단일 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Hyundai />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default HyundaiPage
