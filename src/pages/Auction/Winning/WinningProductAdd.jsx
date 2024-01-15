import { useEffect, useRef, useState } from 'react'
import { BlackBtn, BtnBound, GreyBtn, TGreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

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
  MiniInput,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useQueryClient } from '@tanstack/react-query'
import { getWinningCreate } from '../../../api/auction/winning'
import { AuctionWinningCreateFields, AuctionWinningCreateFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import {
  BlueBarHeader,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import Table from '../../Table/Table'
import { isArray } from 'lodash'

// 낙찰 생성 제품 추가(단일) 메인 컴포넌트
const WinningProductAdd = ({ setAddModal, newResData, setNewResData }) => {
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']
  const [tablePagination, setTablePagination] = useState([])
  const paramData = {
    pageNum: 1,
    pageSize: 50,
    saleType: '경매 대상재',
    registrationStatus: '경매 등록 대기',
  }
  const [Param, setParam] = useState(paramData)
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

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(AuctionWinningCreateFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getWinningCreate', getWinningCreate)
  const resData = data?.data?.data?.list
  console.log('resData Modal ', resData)
  const resPagination = data?.data?.data?.pagination

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, AuctionWinningCreateFields))
      setTablePagination(resPagination)
    }
  }, [isSuccess, resData])

  const handleTablePageSize = (event) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageSize: Number(event.target.value),
      pageNum: 1,
    }))
  }

  const handleAddBtn = () => {
    if (isArray(checkedArray) && checkedArray.length > 0) {
      if (window.confirm('선택한 항목을 추가하시겠습니까?')) {
        checkedArray.forEach((item) => {
          console.log('item =>', item)
          setNewResData((prevData) => [...prevData, item])
        })
        setAddModal(false)
      }
    } else {
      alert('선택해주세요!')
    }
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
  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }
  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '98vh' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>낙찰 생성 제품 추가</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
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
                <FilterSubcontianer modal>
                  <FilterLeft>
                    <RowWrap>
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
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                      </PartWrap>
                    </RowWrap>
                    <RowWrap none>
                      <PartWrap first>
                        <h6>유찰 횟수</h6>
                        <ExInputsWrap>
                          <Input /> <Tilde>~</Tilde>
                          <Input />
                        </ExInputsWrap>
                      </PartWrap>
                    </RowWrap>
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
                  <p>낙찰가 일괄 변경</p>
                  <CustomInput placeholder="낙찰가 입력" width={120} height={32} />
                  <TGreyBtn height={30} style={{ width: '50px' }}>
                    적용
                  </TGreyBtn>
                  <BtnBound />
                  <p>확정전송가 일괄 변경</p>
                  <CustomInput placeholder="확정전송가 입력" width={120} height={32} />
                  <TGreyBtn height={30} style={{ width: '50px' }}>
                    적용
                  </TGreyBtn>
                </div>
              </TCSubContainer>
              <Table
                getCol={getCol}
                getRow={getRow}
                hei2={250}
                tablePagination={tablePagination}
                onPageChange={onPageChange}
              />
              <TCSubContainer style={{ padding: '0px', position: 'relative', top: '40px' }}>
                <div></div>
                <div>
                  <BlackBtn style={{ width: '150px', height: '35px' }} onClick={handleAddBtn}>
                    제품 추가
                  </BlackBtn>
                </div>
                <div></div>
              </TCSubContainer>
            </TableContianer>
          </FilterContianer>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default WinningProductAdd
