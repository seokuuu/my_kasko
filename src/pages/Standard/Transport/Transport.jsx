import { useEffect, useState, useCallback } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, ExcelBtn, TGreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Table from '../../Table/Table'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { CustomInput, FilterWrap } from '../../../modal/External/ExternalFilter'
import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  TableBottomWrap,
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
  TableTitle,
  SubTitle,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'
import { Link } from 'react-router-dom'

import { ExRadioWrap } from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import { CheckBox } from '../../../common/Check/Checkbox'

import { useRef } from 'react'

import { StandardTransportationFields, StandardTransportationFieldsCols } from '../../../constants/admin/Standard'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import { getAdminTransportation, deleteAdminTransportation } from '../../../service/admin/Standard'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { isArray } from 'lodash'

const Transport = ({}) => {
  const radioDummy = ['증가', '감소']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)

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

  console.log('isModal =>', isModal)

  const modalOpen = () => {
    setIsModal(true)
  }

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(StandardTransportationFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const Param = {
    pageNum: 1,
    pageSize: 5,
    type: 0, // 매입 매출 구분 (0: 매입 / 1: 매출)
  }

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getAdminTransportation', getAdminTransportation)
  const resData = data?.data?.data?.list
  console.log('resData => ', resData)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, StandardTransportationFields))
    }
  }, [isSuccess, resData])

  console.log('getRow =>', getRow)

  // DELETE
  const mutation = useMutation(deleteAdminTransportation, {
    onSuccess: () => {
      queryClient.invalidateQueries('destination')
    },
  })

  const handleRemoveBtn = useCallback(() => {
    if (isArray(checkedArray) && checkedArray.length > 0) {
      if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
        checkedArray.forEach((item) => {
          mutation.mutate(item['운반비 고유 번호']) //mutation.mutate로 api 인자 전해줌
        })
      }
    } else {
      alert('선택해주세요!')
    }
  }, [checkedArray])

  console.log('checkedArray =>', checkedArray)

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>운반비 관리</h1>
            <SubTitle>
              <h5>운반비 관리</h5>
              <Link to={'/standard/surcharge'}>
                <h6>할증 관리</h6>
              </Link>
            </SubTitle>
          </div>
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>출발지</h6>
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>목적지</h6>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
                  <PartWrap>
                    <h6>적용일자</h6>
                    <GridWrap>
                      <DateGrid bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>제품구분</h6>
                    <MainSelect />
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

      <TableTitle>
        <h5>매입 운반비</h5>
        <h6>매출 운반비</h6>
      </TableTitle>
      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <TCSubDiv>
            <div>
              선택 <span>0</span>(개)
            </div>
          </TCSubDiv>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleRemoveBtn}>운반비 삭제</WhiteRedBtn>
            <WhiteSkyBtn>운반비 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <TCGreyDiv>
            <div>
              <p style={{ marginRight: '10px' }}>적용일자</p>
              <DateGrid height={30} width={130} bgColor={'white'} fontSize={15} />
            </div>
            <div>
              <p style={{ marginLeft: ' 20px' }}>단가 일괄 수정</p>
              <div style={{ display: 'flex', gap: '10px', margin: '0px 15px', padding: '5px' }}>
                {radioDummy.map((text, index) => (
                  <RadioMainDiv key={index}>
                    <RadioCircleDiv
                      isChecked={checkRadio[index]}
                      onClick={() => {
                        setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                      }}
                    >
                      <RadioInnerCircleDiv />
                    </RadioCircleDiv>
                    <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                  </RadioMainDiv>
                ))}
              </div>
            </div>
            <div></div>
            <CustomInput placeholder="% 입력" style={{ marginRight: '5px' }} width={140} height={30} />
            <TGreyBtn>적용</TGreyBtn>
          </TCGreyDiv>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>

        <Table getCol={getCol} getRow={getRow} />
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            저장
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
    </FilterContianer>
  )
}

export default Transport

const TCSubDiv = styled.div``

const TCGreyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }

  p {
    color: ${(props) => props.theme.colors.TxtAlter};
    font-size: 16px;
  }
`
