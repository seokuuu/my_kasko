import { useState, useRef, useEffect, useMemo } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Table from '../../../pages/Table/Table'
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
import useReactQuery from '../../../hooks/useReactQuery'
import { useNoticeListQuery } from '../../../api/operate/notice'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const Docs = () => {
  // const handleSelectChange = (selectedOption, name) => {
  //   // setInput(prevState => ({
  //   //   ...prevState,
  //   //   [name]: selectedOption.label,
  //   // }));
  // }
  const Params = {
    type: '자료실',
    pageNum: 1,
    pageSize: 100,
  }
  const { isSuccess, data: Docs } = useNoticeListQuery(Params)
  const [isRotated, setIsRotated] = useState(false)
  const [getRow, setGetRow] = useState('')
  const navigate = useNavigate()
  const tableField = useRef(UserNoticeListFieldCols)
  const getCol = tableField.current
  const resData = Docs?.list
  // console.log(resData)
  // Function to handle image click and toggle rotation

  // useEffect 관련 에러가 나와서 따로 빼서 처리
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  const mappingData = useMemo(
    () =>
      Docs
        ? Docs.list.map((d, index) => ({
            ...d,
            createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-',
            id: Docs.list.length - (index + (Params.pageNum - 1) * Params.pageSize), // 순번 내림차순
            uid: d.uid,
            title: d.status ? `${d.title} 📎` : `${d.title} `,
          }))
        : [],
    [Docs],
  )
  // 테이블 row값 가져오기
  const gettingRow = () => {
    const getData = mappingData
    if (!isSuccess && !getData) return null
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, UserNoticeListFields))
    }
  }
  useEffect(() => {
    gettingRow()
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, mappingData])

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

  console.log('isModal =>', isModal)

  const modalOpen = () => {
    setIsModal(true)
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>자료실</h1>
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
                  <Input style={{ marginLeft: '10px' }} />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
                    찾기
                  </GreyBtn>
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
                <BlackBtn width={100} height={40}>
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
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ gap: '10px' }}>
            <PageDropdown />
          </div>
        </TCSubContainer>

        <Table
          getRow={getRow}
          getCol={getCol}
          setChoiceComponent={(e) => {
            const uid = e.고유값
            navigate(`/userpage/docs/${uid}`)
          }}
        />
      </TableContianer>
    </FilterContianer>
  )
}

export default Docs
