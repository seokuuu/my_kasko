import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Destination from './Destination'

import { useState } from 'react'

const DestinationPage = () => {
  const [expanded, setExpanded] = useState('마이페이지')
  const [depth2Color, setDepth2Color] = useState('목적지 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Destination />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default DestinationPage
