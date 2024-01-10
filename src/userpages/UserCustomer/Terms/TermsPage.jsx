import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Terms from './Terms'
import { useEffect, useState } from 'react'
import useReactQuery from '../../../hooks/useReactQuery'
import { getPolicy } from '../../../api/customerService'

const TermsPage = () => {
  const depth2Color = '이용약관'
  const [param, setParam] = useState({
    type: '이용 약관',
  })
  const [expanded, setExpanded] = useState('고객센터')
  const [policy, setPolicy] = useState(null)
  // const [selectedPolicy, setSelectedPolicy] = useState('이용약관')
  const { isLoading, isError, data: getPolicyRes, isSuccess } = useReactQuery(param, 'getPolicy', getPolicy)

  useEffect(() => {
    if (getPolicyRes?.data?.data) {
      setPolicy(getPolicyRes.data.data)
    }
  }, [isSuccess, getPolicyRes])

  const handlePolicySelect = (selectedPolicy) => {
    setParam({ type: selectedPolicy })
  }

  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Terms policy={policy} onPolicySelect={handlePolicySelect} />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default TermsPage
