import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap } from '../../../common/Button/Button'
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
import Hidden from '../../../components/TableInner/Hidden'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import PageDropdown from '../../../components/TableInner/PageDropdown'

const UserPerformance = ({}) => {
  const radioDummy = ['전체', '미진행', '진행중', '종료']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

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

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>출고 실적 조회</h1>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>매입처</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>규격 약호</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap>
                  <h6>구분2</h6>
                  <MainSelect />
                  <span style={{ margin: '0px -10px 0px 5px' }}>~</span>
                  <MainSelect />
                </PartWrap>

                <PartWrap>
                  <h6>두께(MM)</h6>
                  <ExInputsWrap>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </ExInputsWrap>
                </PartWrap>
                <PartWrap />
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap>
                  <h6>폭(MM)</h6>
                  <ExInputsWrap>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </ExInputsWrap>
                </PartWrap>

                <PartWrap>
                  <h6>길이(MM)</h6>
                  <ExInputsWrap>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </ExInputsWrap>
                </PartWrap>
              </RowWrap>
            </FilterLeft>
            <FilterRight>
              <DoubleWrap>
                <h6>제품 번호 </h6>
                <textarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                />
              </DoubleWrap>
            </FilterRight>
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
        </>
      )}
      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
            <Excel />
            <WhiteGrnBtn>
              <div>
                <img src="/img/grnstar.png" />
              </div>
              관심상품 등록
            </WhiteGrnBtn>
          </div>
        </TCSubContainer>
        <TCSubContainer bor>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <TWhiteBtn height={30} width={25}>
              찾기
            </TWhiteBtn>
            <TGreyBtn height={30} width={25}>
              적용
            </TGreyBtn>
            <SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50}>
              응찰
            </SkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  )
}

export default UserPerformance
