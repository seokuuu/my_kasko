import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Destination from './Destination'
import DestinationPost from './DestinationPost'
import DestinationEdit from './DestinationEdit'

import { useState } from 'react'

const DestinationEditPage = () => {
  const [expanded, setExpanded] = useState('마이페이지')
  const [depth2Color, setDepth2Color] = useState('목적지 관리')
  const [choiceComponent, setChoiceComponent] = useState('리스트')

  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <DestinationEdit />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default DestinationEditPage
