import { useEffect, useState } from 'react'
import { getFaqList } from '../../../api/customerService'
import FAQ from './FAQ'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import useReactQuery from '../../../hooks/useReactQuery'

const FAQPage = () => {
  const depth2Color = 'FAQ'
  const param = {
    pageNum: 1,
    pageSize: 10,
  }
  const [expanded, setExpanded] = useState('고객센터')
  const [faqList, setFaqList] = useState(null)
  const { isLoading, isError, data: getFaqListRes, isSuccess } = useReactQuery(param, 'getFaqList', getFaqList)

  useEffect(() => {
    if (getFaqListRes && getFaqListRes.data && getFaqListRes.data.data) setFaqList(getFaqListRes.data.data.list)
  }, [isSuccess, getFaqListRes])

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
