import { OverAllMain, OverAllSub, OverAllTable } from '../../../../common/Overall/Overall.styled'

import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'
import SideBar from '../../../../components/Left/SideBar'

import { useState } from 'react'
import Notice from '../Notice/Notice'

const DatasheetPage = () => {
  const [expanded, setExpanded] = useState('운영 관리')
  const [depth2Color, setDepth2Color] = useState('일반 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Notice title={'자료실'} detailsUrl={'datasheet'} />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default DatasheetPage
