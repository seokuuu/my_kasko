import React from 'react'

import { OverAllMain, OverAllSub } from '../../../../common/Overall/Overall.styled'

import SideBar from '../../../../components/Left/SideBar'
import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'

import FAQPost from './FAQPost'

const FAQPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <FAQPost />
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default FAQPostPage
