import { useAtom, useAtomValue } from 'jotai'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNoticeListQuery } from '../../../../api/operate/notice'
import { NoticeListFieldCols, NoticeListFields } from '../../../../constants/admin/Notice'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TableContianer } from '../../../../modal/External/ExternalFilter'
import { doubleClickedRowAtom, selectedRowsAtom } from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import CommonHeader from '../../UI/CommonHeader'
import CommonTableHeader from '../../UI/CommonTableHeader'
import { noticeListSearchInitValue, noticeSearchCategoryOptions } from '../../constants'

const Notice = ({}) => {
  const navigate = useNavigate()

  // 서버 옵션(요청 변수)
  const [search, setSearch] = useState(noticeListSearchInitValue)
  // 셀 클릭시 테이블 상세 데이터 조회
  const [detailRow, setDetailsRow] = useAtom(doubleClickedRowAtom)
  // 테이블에서 선택된 값
  const selected = useAtomValue(selectedRowsAtom)
  // 목록 리스트
  const [rows, setRows] = useState([])

  const { data, refetch } = useNoticeListQuery({
    ...search,
    category: search.category.label,
  })

  /**
   * @constant
   * @description
   * 테이블 목록 데이터입니다.
   * 날짜 포멧과 순번 데이터 생성을 위해 기존 데이터를 원하는 방식으로 맵핑합니다.
   */
  const mappingData = useMemo(
    () =>
      data
        ? data.list.map((d, index) => ({
            ...d,
            createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-',
            id: data.list.length - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
            uid: d.uid,
            status: d.status ? 'Y' : 'N',
          }))
        : [],
    [data],
  )

  // 등록 버튼 누를시 함수
  function toRegister() {
    navigate('/operate/notice/register')
  }

  // 테이블 데이터 리스트 값 설정
  useEffect(() => {
    if (mappingData) {
      setRows(add_element_field(mappingData, NoticeListFields))
    }
  }, [mappingData])
  console.log('공지사항 데이터 목록 :', data)
  return (
    <FilterContianer>
      {/* 헤더(카테고리탭 & 검색) */}
      <CommonHeader
        search={search}
        setSearch={setSearch}
        refetch={refetch}
        searchInitValue={noticeListSearchInitValue}
        tabHighlightValue={'notice'}
        searchCategoryOptions={noticeSearchCategoryOptions}
      />
      <TableContianer>
        {/* 테이블 헤더 */}
        <CommonTableHeader
          totalLength={data ? data.list.length : 0}
          selected={selected}
          removeEventHandler={() => {}}
          toRegister={toRegister}
          title={'공지사항'}
        />
        {/* 테이블 */}
        <Table getCol={NoticeListFieldCols} getRow={rows} setChoiceComponent={() => {}} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Notice
