import { useEffect, useState } from 'react'
import { BlackBtn, BtnBound, GreyBtn, SkyBtn, TGreyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import {
  CustomInput,
  DoubleWrap,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  FilterTCTop,
  FilterTopContainer,
  Input,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
  MiniInput,
} from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'

import {
  BlueBarHeader,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'

// 경매 제품 추가(단일) 메인 컴포넌트
// 경매 제품 추가 (패키지), 경매 목록 상세(종료된 경매)와 호환 가능
const RoundAucProAdd = ({}) => {
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']

  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkSales.map((value, index) => {
      return check1[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData1(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check1])

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

  const modalClose = () => {
    setAddModal(false)
  }

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '100%' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>경매 제품 추가(단일)</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 0px' }}>
          <FilterContianer>
            <FilterHeader>
              <div style={{ display: 'flex' }}></div>
              {/* 토글 쓰기 */}
              <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
            </FilterHeader>
            <FilterTopContainer>
              <FilterTCTop>
                <h6>경매 번호</h6>
                <p>2023041050</p>
              </FilterTCTop>
            </FilterTopContainer>
            {exFilterToggle && (
              <>
                <FilterSubcontianer modal style={{ height: '100%' }}>
                  <FilterLeft>
                    <RowWrap modal>
                      <PartWrap first>
                        <h6>창고 구분</h6>
                        <PWRight>
                          <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                        </PWRight>
                      </PartWrap>
                      <PartWrap>
                        <h6>매입처 </h6>
                        <PWRight>
                          <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                        </PWRight>
                      </PartWrap>

                      <PartWrap modal>
                        <h6>규격 약호</h6>
                        <Input />
                        <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                          찾기
                        </GreyBtn>
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal>
                      <PartWrap first>
                        <h6>구분</h6>
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal none>
                      <PartWrap first>
                        <h6>두께(MM)</h6>
                        <ExInputsWrap>
                          <MiniInput /> <Tilde>~</Tilde>
                          <MiniInput />
                        </ExInputsWrap>
                      </PartWrap>
                      <PartWrap>
                        <h6>폭(MM)</h6>
                        <ExInputsWrap>
                          <MiniInput /> <Tilde>~</Tilde>
                          <MiniInput />
                        </ExInputsWrap>
                      </PartWrap>
                      <PartWrap>
                        <h6>길이(MM)</h6>
                        <ExInputsWrap>
                          <MiniInput /> <Tilde>~</Tilde>
                          <MiniInput />
                        </ExInputsWrap>
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal none>
                      <PartWrap first>
                        <h6>유찰 횟수</h6>
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
                    <BlackBtn width={90} height={35}>
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
                </div>
              </TCSubContainer>
              <TCSubContainer>
                <div>
                  선택 중량<span> 2 </span>kg / 총 중량 kg
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <p>시작가 일괄 변경</p>
                  <CustomInput placeholder="" width={120} height={32} />
                  <TGreyBtn height={30} style={{ width: '50px' }}>
                    적용
                  </TGreyBtn>
                </div>
              </TCSubContainer>
              <Test3 hei2={350} hei={100} />
              <TCSubContainer>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <BlackBtn width={13} height={40}>
                    제품 추가
                  </BlackBtn>
                </div>
              </TCSubContainer>
            </TableContianer>
          </FilterContianer>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default RoundAucProAdd
