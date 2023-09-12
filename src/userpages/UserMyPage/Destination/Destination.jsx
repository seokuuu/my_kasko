import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import {
  GreyBtn,
  ExcelBtn,
  WhiteGrnBtn,
  IndigoBtn,
  BlueBtn,
  SkyBtn,
  SwitchBtn,
  TGreyBtn,
  TWhiteBtn,
} from '../../../common/Button/Button'
import Test3 from '../../../pages/Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'

import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  TCSubContainer,
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  ExRadioWrap,
  SubTitle,
  FilterHeaderAlert,
  FHALeft,
  ExInputsWrap,
} from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'
import { getDestination } from '../../../api/myPage'
import useReactQuery from '../../../hooks/useReactQuery'

const Destination = ({ setChoiceComponent }) => {
  const radioDummy = ['전체', '미진행', '진행중', '종료']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  const [savedRadioValue, setSavedRadioValue] = useState('')
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    // if (checkedIndex !== -1) {
    //   const selectedValue = radioDummy[checkedIndex];
    //   setSavedRadioValue(selectedValue); //내 state에 반환
    //   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
    // }
  }, [checkRadio])

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

  const [destination, setDestination] = useState('')
  const 임의데이터 = {
    pageNum: 1,
    pageSize: 20,
    category: '목적지명',
    keyword: '인천',
  }
  const { isLoading, isError, data, isSuccess } = useReactQuery(임의데이터)

  useEffect(() => {
    if (isSuccess && data?.data?.data?.list) {
      let getData = data?.data?.data?.list

      if (Array.isArray(getData)) {
        const newArray = getData.map((item) => ({
          '고객 코드': item.uid,
          대표: item.represent,
          '목적지 코드': item.destinationCode,
          '목적지 명': item.destinationName,
          '담당자 연락처': item.managerPhone,
          '하차지 명': item.name,
          '도착지 연락처': item.phone,
          '상세 주소': item.address,
          비고란: item.memo,
        }))
        setDestination(newArray)
      }
    }
  }, [isSuccess, data])

  const openPost = () => {
    setChoiceComponent('등록')
  }
  const openEdit = async () => {
    setChoiceComponent('수정')
  }

  // 목적지에 따른 조회
  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>목적지 관리</h1>
          </div>
        </FilterHeader>
      </div>
      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div>
            <PageDropdown />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span>개
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={openEdit}>목적지 삭제</WhiteRedBtn>
            <SkyBtn onClick={openPost}>목적지 등록</SkyBtn>
          </div>
        </TCSubContainer>

        <Test3 title={'규격 약호 찾기'} destination={destination} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Destination
