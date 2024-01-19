import { useAtom } from 'jotai'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { gethyunDaiOriginal } from '../../../api/SellProduct'
import { queryClient } from '../../../api/query'
import { BlackBtn } from '../../../common/Button/Button'
import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/HyunDaiOrigin'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { BlueBarHeader, WhiteCloseBtn } from '../../../modal/Common/Common.Styled'
import {
  ExRadioWrap,
  FilterContianer,
  FilterFooter,
  FilterLeft,
  FilterSubcontianer,
  GridWrap,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import { btnCellRenderAtom, btnCellUidAtom, onClickCheckAtom } from '../../../store/Layout/Layout'
import usePaging from '../../Operate/hook/usePaging'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'

const parameter = {
  pageNum: 2,
  pageSize: 10,
  startDate: '2023-08-17',
  endDate: '2023-08-17',
  timeOfDay: 'am',
}

function HyunDaiOriginal({ title }) {
  const radioDummy = [
    {
      label: '오전',
      value: 'am',
    },
    {
      label: '오후',
      value: 'pm',
    },
  ]
  const [radio, setRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [radioData, setRadioData] = useState(Array.from({ length: radioDummy.length }, () => ''))

  const [request, setRequest] = useState({
    pageNum: 1,
    pageSize: 50,
    startDate: '2023-08-17',
    endDate: '2023-08-17',
    timeOfDay: 'am',
  })
  const [isRotated, setIsRotated] = useState(false)
  const [getRow, setGetRow] = useState('')
  const tableRef = useRef(SingleDispatchFieldsCols)
  const getCol = tableRef.current
  const { data: original, isSuccess, isLoading } = useReactQuery(request, 'original', gethyunDaiOriginal)
  const [filterData, setFilteredData] = useState([])
  const [onClickCheck, setOnClickCheck] = useAtom(onClickCheckAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [uidModal, setUidModal] = useAtom(btnCellUidAtom)
  const d = original?.data?.list
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  console.log('data :', original)
  //====================== 라디오체크 (오전이냐 오후냐 선택하는 부분) ======================
  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = radioDummy.map((value, index) => {
      return radio[index] ? value.value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setRadioData(filteredCheck)
  }, [radio])

  useEffect(() => {
    if (isSuccess) setFilteredData(d)
  }, [isSuccess])

  //테이블에 데이터 패치하는중
  useEffect(() => {
    if (d === undefined) {
      d && setFilteredData(d)
    }
    if (!isSuccess && !filterData) return null
    if (Array.isArray(d)) {
      setGetRow(add_element_field(filterData, singleDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filterData])
  console.log(filterData)
  const modalClose = () => {
    if (onClickCheck) {
      setBtnCellModal(false)
      setOnClickCheck(false)
    }
  }

  console.log('시작', startDate)
  console.log('끝', endDate)

  // 뒤에 배경 안움직이게
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // 초기화 버튼
  const handleImageClick = () => {
    setStartDate('')
    setEndDate('')
    // setRadioData({ label: '오전', value: 'am' })
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  useEffect(() => {
    setRequest(() => ({
      pageNum: 1,
      pageSize: 50,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
      timeOfDay: radioData.join(''),
    }))
  }, [startDate, endDate, radioData])

  const handleSubmit = () => {
    queryClient.prefetchQuery(['original', request], async () => {
      const res = await gethyunDaiOriginal(request)
      setFilteredData(res.data?.list)
      return res.data?.list
    })
  }

  const { pagination, onPageChanage } = usePaging(original?.data, setRequest)
  return (
    <OutSide>
      <Container>
        <BlueBarHeader>
          <div>{title}</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <FilterContianer>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap none>
                <PartWrap first>
                  <h6>일정</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setStartDate} startDate={startDate} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setEndDate} startDate={endDate} />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6>시점</h6>
                  <ExRadioWrap>
                    {radioDummy.map((i, idx) => (
                      <RadioMainDiv key={idx}>
                        <RadioCircleDiv
                          isChecked={radio[idx]}
                          onClick={() => setRadio(CheckBox(radio, radio.length, idx))}
                        >
                          <RadioInnerCircleDiv isChecked={radio[idx]} />
                        </RadioCircleDiv>
                        <o style={{ display: 'flex', marginLeft: '5px' }}>{i.label}</o>
                      </RadioMainDiv>
                    ))}
                  </ExRadioWrap>
                </PartWrap>
              </RowWrap>
            </FilterLeft>
          </FilterSubcontianer>
          <FilterFooter>
            <div style={{ display: 'flex' }}>
              <p>초기화</p>
              <ResetImg
                src="/img/reset.png"
                style={{ marginLeft: '10px', marginRight: '20px' }}
                onClick={() => handleImageClick()}
                className={isRotated ? 'rotate' : ''}
              />
            </div>
            <div style={{ width: '180px' }}>
              <BlackBtn width={100} height={40} onClick={handleSubmit}>
                검색
              </BlackBtn>
            </div>
          </FilterFooter>
        </FilterContianer>
        <TableContianer>
          <TCSubContainer bor>
            <div>조회 목록 (총{' ' + original?.data?.pagination.listCount}개 )</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown handleDropdown={(e) => onSizeChange(e, setRequest)} />
              <Excel getRow={getRow} />
            </div>
          </TCSubContainer>
          <TCSubContainer bor>
            <div>총 {original?.data?.pagination.totalWeight} 중량 kg</div>
          </TCSubContainer>
          <Table
            getRow={getRow}
            getCol={getCol}
            loading={isLoading}
            tablePagination={pagination}
            onPageChange={onPageChanage}
          />
        </TableContianer>
      </Container>
    </OutSide>
  )
}

export default HyunDaiOriginal

export const Container = styled.div`
  max-width: 80%;
  max-height: 700px;
  margin: auto;
  position: absolute;
  top: 43%;
  width: 100%;
  left: 55%;
  transform: translate(-50%, -50%);
`

export const OutSide = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`
