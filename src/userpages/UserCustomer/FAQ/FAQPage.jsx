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
  const paramData = {
    pageNum: 1,
    pageSize: 50,
  }
  const [param, setParam] = useState(paramData)
  const [expanded, setExpanded] = useState('고객센터')
  const [faqList, setFaqList] = useState(null)
  const [faqPagination, setFaqPagination] = useState([])
  const { isLoading, isError, data: getFaqListRes, isSuccess } = useReactQuery(param, 'getFaqList', getFaqList)

  useEffect(() => {
    if (getFaqListRes && getFaqListRes.data && getFaqListRes.data.data) {
      setFaqList(getFaqListRes.data.data.list)
      console.log('getFaqListRes---', getFaqListRes)
      setFaqPagination(getFaqListRes.data.data.pagination)
    }
  }, [isSuccess, getFaqListRes])

  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }

  const handleTablePageSize = (event) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageSize: Number(event.target.value),
      pageNum: 1,
    }))
  }

  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <FAQ handleTablePageSize={handleTablePageSize} faqList={faqList} faqPagination={faqPagination} onPageChange={onPageChange} />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default FAQPage
