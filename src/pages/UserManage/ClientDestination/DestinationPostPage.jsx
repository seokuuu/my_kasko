import React from 'react'

import { OverAllMain, OverAllSub } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'

import DestinationPost from './DestinationPost'
import { useState } from 'react'
const DestinationPostPage = () => {
  const [expanded, setExpanded] = useState('사용자 관리')
  const [depth2Color, setDepth2Color] = useState('고객사 목적지 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <DestinationPost />
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default DestinationPostPage
