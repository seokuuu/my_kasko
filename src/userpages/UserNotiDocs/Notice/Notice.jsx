import { useEffect, useMemo, useRef, useState } from 'react'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import {
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterRight,
  FilterSubOneContainer,
  FilterWrap,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../../pages/Table/Table'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserNoticeListFieldCols, UserNoticeListFields } from '../../../constants/userNotDoc'
import { useNoticeListQuery } from '../../../api/operate/notice'
import moment from 'moment'
import { useNavigate, useLocation } from 'react-router-dom'
import TableTest from '../../../pages/Table/TableTest'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'

const Notice = () => {
  const [title, setTitle] = useState('')

  const Params = {
    type: '공지사항',
    pageNum: 1,
    pageSize: 50,
    category: '',
    keyword: title,
  }

  const [isRotated, setIsRotated] = useState(false)

  const [param, setParam] = useState(Params)
  const { isSuccess, data: notices, refetch } = useNoticeListQuery(param)
  const pagination = notices?.pagination

  const { onPageChanage } = useTablePaginationPageChange(notices, setParam)
  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  const [getRow, setGetRow] = useState('')
  const navigate = useNavigate()
  const tableField = useRef(UserNoticeListFieldCols)
  const getCol = tableField.current
  const [topData2, setTopData2] = useState([])
  const [result, setResult] = useState([])
  const [fixed, setFixed] = useState([])
  const fixedItem = notices && notices?.list.filter((i) => i.status !== 0)

  useEffect(() => {
    if (!title && fixedItem) {
      setFixed(fixedItem)
    }
  }, [notices])

  useEffect(() => {
    topData2.map((item, index) =>
      setResult((p) => [
        ...p,
        {
          작성일자: item.createDate ? moment(item.createDate).format('YYYY-MM-DD') : '-',
          작성자: item.name,
          순번: item.status ? '고정' : index,
          고유값: item.uid,
          제목: item.getFile ? `${item.title} 📎` : `${item.title} `,
          조회수: item.count,
          타입: '공지사항',
        },
      ]),
    )
  }, [topData2])

  const mappingData2 = useMemo(
    () =>
      notices
        ? notices.list.filter((d, index) => {
            // console.log('DD', moment(d.createDate).format('YYYY-MM-DD'))
            if (!d.status) {
              return {
                ...d,
                작성일자: moment(d.createDate).format('YYYY-MM-DD'),
                // id: Notice.length, // 순번 내림차순
                uid: d.uid,
                title: d.title,
                count: d.count,
                name: d.name,
              }
            }
          })
        : [],
    [notices],
  )

  function createData(data) {
    var result = []
    console.log(data)
    for (var i = 0; i < data?.length; i++) {
      result.push({
        작성일자: data[i].createDate ? moment(data[i].createDate).format('YYYY-MM-DD') : '-',
        작성자: data[i].name,
        순번: '고정',
        고유값: data[i].uid,
        제목: data[i].getFile ? `${data[i].title} 📎` : `${data[i].title} `,
        조회수: data[i].count,
        타입: '자료실',
      })
    }
    return result
  }
  const gettingRow = () => {
    const getData = mappingData2

    if (!isSuccess && !getData) return null
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, UserNoticeListFields))
    }
  }
  useEffect(() => {
    gettingRow()
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, notices])

  const handleSearch = () => {
    refetch()
  }

  const handleOnRowClicked = (e) => {
    const uid = e.data.고유값
    navigate(`/userpage/notice/${uid}`)
  }

  const handleTablePageSize = (event) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageSize: Number(event.target.value),
      pageNum: 1,
    }))
  }

  useEffect(() => {
    refetch()
  }, [])

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>공지사항</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubOneContainer>
              <RowWrap none>
                <PartWrap>
                  <h6 style={{ width: '100px' }}> 검색</h6>
                  <MainSelect />
                  <Input
                    style={{ marginLeft: '10px' }}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                    value={title}
                  />
                </PartWrap>
              </RowWrap>
              <FilterRight></FilterRight>
            </FilterSubOneContainer>
            <FilterFooter>
              <div style={{ display: 'flex' }}>
                <p>초기화</p>
                <ResetImg
                  src="/img/reset.png"
                  style={{ marginLeft: '10px', marginRight: '20px' }}
                  onClick={handleImageClick}
                  className={isRotated ? 'rotate' : ''}
                />
              </div>
              <div style={{ width: '180px' }}>
                <BlackBtn width={100} height={40} onClick={handleSearch}>
                  검색
                </BlackBtn>
              </div>
            </FilterFooter>
          </FilterWrap>
        )}
      </div>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 ({pagination?.listCount}개 )
            <Hidden />
          </div>
          <div style={{ gap: '10px' }}>
            <PageDropdown handleDropdown={handleTablePageSize} />
          </div>
        </TCSubContainer>
        <div>
          <Table
            getRow={getRow}
            getCol={getCol}
            tablePagination={pagination}
            isRowClickable={true}
            handleOnRowClicked={handleOnRowClicked}
            onPageChange={onPageChanage}
            topData={createData(fixed)}
          />
        </div>
      </TableContianer>
    </FilterContianer>
  )
}

export default Notice
