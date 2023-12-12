import React from 'react'

import { OverAllMain, OverAllSub } from '../../../../common/Overall/Overall.styled'

import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'
import SideBar from '../../../../components/Left/SideBar'

import { useParams } from 'react-router-dom'
import FAQPost from './FAQPost'

const FAQPostPage = () => {
  const { id } = useParams()

  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <FAQPost detailsId={id} />
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default FAQPostPage
