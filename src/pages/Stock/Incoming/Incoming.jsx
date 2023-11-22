import { useAtom } from 'jotai'
import { useState } from 'react'
import { BlackBtn, GreyBtn, SwitchBtn, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { CustomSelect2, MainSelect } from '../../../common/Option/Main'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
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
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  ExCheckWrap,
  ExCheckDiv,
  ExInputsWrap,
  TCSubContainer,
  NewTitle,
  RightTitle,
  RowInWrap,
  Bar,
  MiniInput,
  NewFilterWrap,
  NewFilterLeft,
  NewFilterRight,
  NewRow,
  RightTextarea,
  FilterWrap,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { storageOptions } from '../../../common/Option/Main'
const Incoming = ({}) => {
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

  const modalOpen = () => {
    setIsModal(true)
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>입고 관리</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <>
            {/* 구버젼 시작 */}

            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap first>
                    <h6>창고 구분</h6>
                    <PWRight>
                      <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>매입처</h6>

                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PartWrap>
                  <PartWrap>
                    <h6>규격 약호</h6>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>입고일자</h6>
                    <GridWrap>
                      <DateGrid width={140} bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid width={140} bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>구분</h6>
                    <MainSelect />
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                </RowWrap>
                <RowWrap none>
                  <PartWrap first>
                    <h6>구분2</h6>
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>두께(MM)</h6>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </PartWrap>
                </RowWrap>
                <RowWrap none>
                  <PartWrap>
                    <h6 first>길이(MM)</h6>
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>폭(MM)</h6>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
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

            {/* 구버젼 끝 */}
            {/* 신버젼 시작 */}
            <NewFilterWrap>
              <NewFilterLeft>
                <NewRow bor>
                  <RowInWrap>
                    <NewTitle first>창고구분</NewTitle>
                    <CustomSelect2 />
                  </RowInWrap>
                  <RowInWrap>
                    <NewTitle>매입처</NewTitle>
                    <CustomSelect2 />
                  </RowInWrap>
                  <RowInWrap>
                    <NewTitle>규격 약호</NewTitle>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </RowInWrap>
                </NewRow>
                <Bar />
                <NewRow>
                  <RowInWrap>
                    <NewTitle first>입고일자</NewTitle>
                    <DateGrid width={140} bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid width={140} bgColor={'white'} fontSize={17} />
                  </RowInWrap>
                  <RowInWrap>
                    <NewTitle>구분</NewTitle>
                    <CustomSelect2 />
                    <CustomSelect2 />
                    <CustomSelect2 />
                  </RowInWrap>
                </NewRow>
                <Bar />
                <NewRow>
                  <RowInWrap>
                    <NewTitle>두께(MM)</NewTitle>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </RowInWrap>
                  <RowInWrap>
                    <NewTitle>폭(MM)</NewTitle>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </RowInWrap>
                  <RowInWrap>
                    <NewTitle>길이(MM)</NewTitle>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </RowInWrap>
                </NewRow>
                <NewRow bor>
                  <RowInWrap>
                    <NewTitle first>구분2</NewTitle>
                    <CustomSelect2 />
                    <CustomSelect2 />
                  </RowInWrap>
                </NewRow>
              </NewFilterLeft>
              <NewFilterRight>
                <RightTitle>제품번호</RightTitle>
                <RightTextarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                ></RightTextarea>
              </NewFilterRight>
            </NewFilterWrap>
            {/* 신버젼 끝 */}
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
      </div>

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
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SwitchBtn>입고 확정</SwitchBtn>
          </div>
        </TCSubContainer>

        <Test3 />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn>제품 등록</WhiteBlackBtn>
            <WhiteRedBtn>제품 삭제</WhiteRedBtn>
            <WhiteSkyBtn>재고 수신</WhiteSkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default Incoming
