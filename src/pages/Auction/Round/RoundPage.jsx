import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Round from './Round'
import RoundAucListEdit from './RoundAucListEdit'
import { aucProListEditAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { useState } from 'react'

const RoundPage = () => {
  const [expanded, setExpanded] = useState('경매 관리')
  const [depth2Color, setDepth2Color] = useState('경매 회차 관리')
  const [type, setType] = useAtom(aucProListEditAtom)

  console.log('type => ', type)
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>{type === '기본' ? <Round /> : type === '수정' ? <RoundAucListEdit /> : null}</OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default RoundPage
