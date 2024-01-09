import { useEffect, useMemo, useState, useRef } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../../pages/Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { FilterWrap } from '../../../modal/External/ExternalFilter'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../../pages/Table/Table'
import {
  TCSubContainer,
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubOneContainer,
  FilterLeft,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  InputStartWrap,
  FilterHeaderAlert,
  PageSelect,
  HiddenBtn,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserNoticeListFieldCols, UserNoticeListFields } from '../../../constants/userNotDoc'
import { useNoticeListQuery } from '../../../api/operate/notice'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import TableTest from '../../../pages/Table/TableTest'

const Notice = () => {
  const [title, setTitle] = useState('')

  const Params = {
    type: '공지사항',
    pageNum: 1,
    pageSize: 10,
    category: '제목',
    keyword: title,
  }
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)

  const { isSuccess, data: notices, refetch } = useNoticeListQuery(Params)
  const pagination = notices?.pagination
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

  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const [getRow, setGetRow] = useState('')
  const navigate = useNavigate()
  const tableField = useRef(UserNoticeListFieldCols)
  const getCol = tableField.current
  const [topData2, setTopData2] = useState([])
  const [result, setResult] = useState([])
  const [fixed, setFixed] = useState([])
  const fixedItem = notices && notices?.list.filter((i) => i.status !== 0)
  const notFixedItem = notices && topData2?.filter((i) => i.status !== 0)
  console.log(fixedItem)

  // 상단고정 데이터

  useEffect(() => {
    if (!title && fixedItem) {
      setFixed(fixedItem)
    }
  }, [notices])

  console.log('FIXED', fixed)
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

  // useEffect(() => {
  //   if (notices) {
  //     const newTopData = fixedItem.filter((d, index) => {
  //       if (d.status) {
  //         return {
  //           ...d,
  //           createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-',
  //           작성자: d.name,
  //           순번: '고정',
  //           고유값: d.uid,
  //           제목: d.getFile ? `${d.title} 📎` : `${d.title} `,
  //           조회수: d.count,
  //           타입: '자료실',
  //         }
  //       } else {
  //         return null
  //       }
  //     })
  //     setTopData2(newTopData)
  //     // console.log('NEW TOP DATA :', newTopData)
  //   }
  // }, [notices])
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

  console.log('DATA2')
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
            조회 목록 ({notices?.pagination?.listCount}개 )
            <Hidden />
          </div>
          <div style={{ gap: '10px' }}>
            <PageDropdown />
          </div>
        </TCSubContainer>
        <div>
          <TableTest
            getRow={getRow}
            getCol={getCol}
            pagination={pagination}
            setChoiceComponent={(e) => {
              const uid = e.고유값
              navigate(`/userpage/notice/${uid}`, { state: { data: e } })
            }}
            topData={createData(fixed)}
            type={'공지사항'}
          />
        </div>
      </TableContianer>
    </FilterContianer>
  )
}

export default Notice
