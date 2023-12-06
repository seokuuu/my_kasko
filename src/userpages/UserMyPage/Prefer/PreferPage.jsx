import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import { useState } from 'react'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import Prefer from './Prefer'
import PreferPost from './PreferPost'

const PreferPage = () => {
  const [expanded, setExpanded] = useState('마이페이지')
  const [depth2Color, setDepth2Color] = useState('선호 제품 관리')
  const [choiceComponent, setChoiceComponent] = useState('리스트')

  const renderChoiceComponent = () => {
    switch (choiceComponent) {
      case '리스트':
        return <Prefer setChoiceComponent={setChoiceComponent} />
      case '등록':
        return <PreferPost setChoiceComponent={setChoiceComponent} />
      default:
        return <Prefer setChoiceComponent={setChoiceComponent} />
    }
  }

  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>{renderChoiceComponent()}</OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default PreferPage
