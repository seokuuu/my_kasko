import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClaimListQuery } from '../../../../api/operate/claim'
import { SkyBtn, WhiteRedBtn } from '../../../../common/Button/Button'
import { ClaimListFieldCols, ClaimListFields } from '../../../../constants/admin/Claim'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TCSubContainer, TableContianer } from '../../../../modal/External/ExternalFilter'
import Table from '../../../Table/Table'
import { claimInitState } from '../../constants'
import ClaimHeader from './components/ClaimHeader'

/**
 * @description
 * 클레임 관리 페이지 컴포넌트
 * @param {*} param0
 * @returns
 */
const Claim = () => {
  const navigate = useNavigate()

  // 목록 API(REQUEST PARAMETER)
  const [search, setSearch] = useState(claimInitState)

  // 목록 리스트
  const [row, setRow] = useState([])

  // 목록 API
  const { data, refetch } = useClaimListQuery({ ...search, claimStatus: search.claimStatus.value })

  console.log('data :', data)
  useEffect(() => {
    if (data) {
      setRow(add_element_field(data.list, ClaimListFields))
    }
  }, [data])

  return (
    <FilterContianer>
      {/* 카테고리탭 & 검색필터 on & 검색 */}
      <ClaimHeader search={search} setSearch={setSearch} refetch={refetch} />
      <TableContianer>
        <TCSubContainer bor>
          <div>
            클레임 목록(선택 <span>2</span> / 50개 )
          </div>
          <div></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span> (명)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>클레임 삭제</WhiteRedBtn>
            <SkyBtn
              onClick={() => {
                navigate('/operate/common/product')
              }}
            >
              클레임 등록
            </SkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={ClaimListFieldCols} getRow={row} setChoiceComponent={() => {}} />
        {/* <Test3 title={'규격 약호 찾기'} /> */}
      </TableContianer>
    </FilterContianer>
  )
}

export default Claim
