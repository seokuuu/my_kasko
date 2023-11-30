import { useEffect, useState } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, TGreyBtn, TWhiteBtn, WhiteGrnBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import Test3 from '../../../pages/Test/Test3'
import { toggleAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import {
  DoubleWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  MiniInput,
  PartWrap,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../../modal/External/ExternalFilter'

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
              <RowWrap none>
                <PartWrap first>
                  <h6>경매일자</h6>
                  <GridWrap>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6>출고 일자</h6>
                  <GridWrap>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>창고구분</h6>
                  <MainSelect />
                </PartWrap>
                <PartWrap>
                  <h6>규격 약호</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
                <PartWrap>
                  <h6>고객사 명/고객사코드</h6>
                  <Input />
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>

              {/* RowWrap none : border-bottom이 없음
PartWrap first : Row의 제일 앞에 오는 Part (제목 width 고정용) */}
              <RowWrap none>
                <PartWrap first>
                  <h6>두께(MM)</h6>
                  <MiniInput /> <Tilde>~</Tilde>
                  <MiniInput />
                </PartWrap>
                <PartWrap>
                  <h6>폭(MM)</h6>
                  <MiniInput /> <Tilde>~</Tilde>
                  <MiniInput />
                </PartWrap>
                <PartWrap>
                  <h6>길이(MM)</h6>
                  <MiniInput /> <Tilde>~</Tilde>
                  <MiniInput />
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
