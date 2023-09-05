import { OverAllMain, OverAllSub } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'

import CarrierEdit from './CarrierEdit'
import { useState } from 'react'
const CarrierEditPage = () => {
  const [expanded, setExpanded] = useState('사용자 관리')
  const [depth2Color, setDepth2Color] = useState('운송사 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <CarrierEdit />
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default CarrierEditPage
