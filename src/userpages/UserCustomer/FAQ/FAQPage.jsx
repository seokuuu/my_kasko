import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import FAQ from './FAQ'
import { useState, useEffect } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../../../api'
import useReactQuery from '../../../hooks/useReactQuery'
import { getFaqList } from '../../../service/user/customerService'

const FAQPage = () => {
  const param = {
    pageNum: 1,
    pageSize: 10,
  }
  const [expanded, setExpanded] = useState('고객센터')
  const [depth2Color, setDepth2Color] = useState('FAQ')
  const [faqList, setFaqList] = useState(null)
  const { isLoading, isError, data: getFaqListRes, isSuccess } = useReactQuery(param, 'getFaqList', getFaqList)

  useEffect(() => {
    if (getFaqListRes && getFaqListRes.data && getFaqListRes.data.data) {
      setFaqList(getFaqListRes.data.data.list)
    }
  }, [getFaqListRes])

  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <FAQ faqList={faqList} />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default FAQPage
