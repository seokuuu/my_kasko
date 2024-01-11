import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Request from './Request'
import RequestRecom from './RequestRecom'

import React, { useState, useCallback } from 'react'

const RequestPage = () => {
  const [expanded, setExpanded] = useState('출고 관리')
  const [depth2Color, setDepth2Color] = useState('출고 요청')
  // request(출고 요청) / requestRecom (선별 추천 목록)
  const [choiceComponent, setChoiceComponent] = useState('request')

  const renderChoiceComponent = useCallback(() => {
    switch (choiceComponent) {
      case 'request':
        return <Request setChoiceComponent={setChoiceComponent} />
      case 'requestRecom':
        return <RequestRecom setChoiceComponent={setChoiceComponent} />
      default:
        return <Request setChoiceComponent={setChoiceComponent} />
    }
  }, [choiceComponent])
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>{renderChoiceComponent()}</OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default RequestPage
