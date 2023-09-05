import { OverAllMain, OverAllSub, OverAllTable } from '../../common/Overall/Overall.styled'

import SideBar from '../../components/Left/SideBar'
import Header from '../../components/Header/Header'
import SubHeader from '../../components/Header/SubHeader'

import { useState } from 'react'

const Layout = ({ page, expanded, depth2Color }) => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>{page}</OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default Layout
