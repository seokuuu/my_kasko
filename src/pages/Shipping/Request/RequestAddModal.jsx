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
  GridWrap,
  Input,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'

import {
  BlueBarBtnWrap,
  BlueBarHeader,
  BlueBlackBtn,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import DateGrid from '../../../components/DateGrid/DateGrid'

// 합짐 추가 등록 메인 컴포넌트
const RequestAddModal = ({}) => {
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
      <ModalContainer style={{ width: '75%', height: '85vh' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>합짐 추가 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <FilterContianer style={{ paddingBottom: '0px' }}>
            <FilterHeader style={{ height: '30px' }}>
              <div style={{ display: 'flex' }}></div>
            </FilterHeader>

            {exFilterToggle && (
              <>
                <FilterSubcontianer style={{ paddingBottom: '10px' }}>
                  <FilterLeft>
                    <RowWrap modal>
                      <PartWrap first>
                        <h6 style={{ width: '120px' }}>출하지시 일자</h6>
                        <GridWrap>
                          <DateGrid bgColor={'white'} fontSize={17} />
                          <Tilde>~</Tilde>
                          <DateGrid bgColor={'white'} fontSize={17} />
                        </GridWrap>
                      </PartWrap>

                      <PartWrap>
                        <h6>목적지</h6>
                        <Input />
                        <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                          찾기
                        </GreyBtn>
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal none>
                      <PartWrap>
                        <h6 style={{ width: '120px' }}>창고구분</h6>
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
                  </FilterLeft>
                  <FilterRight>
                    <DoubleWrap>
                      <h6>제품 번호 </h6>
                      <textarea
                        style={{ height: '80%' }}
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
                <Hidden />

                <div style={{ display: 'flex', gap: '10px' }}>
                  <PageDropdown />
                </div>
              </TCSubContainer>
              <Test3 hei2={350} hei={100} />
              <TCSubContainer></TCSubContainer>
            </TableContianer>
          </FilterContianer>{' '}
        </BlueSubContainer>
        <BlueBarBtnWrap style={{ padding: '10px' }}>
          <BlackBtn fontSize={17} width={10} height={35}>
            선택 추가
          </BlackBtn>
        </BlueBarBtnWrap>
      </ModalContainer>
    </>
  )
}

export default RequestAddModal
