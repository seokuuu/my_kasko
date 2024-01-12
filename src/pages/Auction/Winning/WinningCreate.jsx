import { useEffect, useRef, useState } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import {
  DoubleWrap,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  FilterTCBottom,
  FilterTCBSubdiv,
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

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { InputContainer, NoOutInput, Unit } from '../../../common/Input/Input'

import { WinningCreateFindAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import CustomerFind from '../../../modal/Multi/CustomerFind'
import Table from '../../Table/Table'
import useReactQuery from '../../../hooks/useReactQuery'
import { getDetailProgress } from '../../../api/auction/detailprogress'
import { add_element_field } from '../../../lib/tableHelpers'
import { AuctionWinningCreateFields, AuctionWinningCreateFieldsCols } from '../../../constants/admin/Auction'
import { useQueryClient } from '@tanstack/react-query'
import { getWinningCreate } from '../../../api/auction/winning'

const WinningCreate = ({}) => {
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']
  const [isModal, setIsModal] = useAtom(WinningCreateFindAtom)
  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환ㄴ
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

  const [tablePagination, setTablePagination] = useState([])

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(AuctionWinningCreateFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const paramData = {
    pageNum: 1,
    pageSize: 50,
    saleType: '경매 대상재',
    registrationStatus: '경매 등록 대기',
  }
  const [Param, setParam] = useState(paramData)

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getWinningCreate', getWinningCreate)
  const resData = data?.data?.data?.list
  console.log('resData ', resData)
  const resPagination = data?.data?.data?.pagination

  console.log('resData', resData)

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

  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>낙찰 생성</h1>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>

      {exFilterToggle && (
        <>
          <FilterTopContainer>
            <FilterTCTop>
              <h6>경매 번호</h6>
              <p>2023041050</p>
            </FilterTCTop>
            <FilterTCBottom>
              <FilterTCBSubdiv>
                <div>
                  <h6 style={{ fontSize: '18px' }}>고객사</h6>
                  <Input />
                  <GreyBtn
                    style={{ width: '70px' }}
                    height={35}
                    margin={10}
                    fontSize={17}
                    onClick={() => {
                      setIsModal(true)
                    }}
                  >
                    찾기
                  </GreyBtn>
                </div>

                <div>
                  <h6 style={{ fontSize: '18px' }}>목적지</h6>
                  <Input placeholder="코드" style={{ width: '60px', marginRight: '10px', fontSize: '16px' }} />
                  <Input placeholder="목적지명" style={{ width: '120px', marginRight: '10px', fontSize: '16px' }} />
                  <Input placeholder="하차지명" style={{ width: '130px', marginRight: '10px', fontSize: '16px' }} />
                  <Input
                    placeholder="하차지 연락처"
                    style={{ width: '130px', marginRight: '10px', fontSize: '16px' }}
                  />
                  <Input placeholder="주소" style={{ width: '130px', marginRight: '10px', fontSize: '16px' }} />

                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </div>
              </FilterTCBSubdiv>
              <FilterTCBSubdiv>
                <div style={{ marginRight: '10px' }}>
                  <h6 style={{ fontSize: '18px' }}>낙찰가 총액</h6>
                  <InputContainer>
                    <NoOutInput type="number" />
                    <Unit>원</Unit>
                  </InputContainer>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <h6 style={{ fontSize: '17px' }}>총 중량</h6>
                  <Input />
                </div>

                <div style={{ marginRight: '10px' }}>
                  <h6 style={{ fontSize: '17px' }}> 확정전송 총액</h6>
                  <InputContainer>
                    <NoOutInput type="number" />
                    <Unit>원</Unit>
                  </InputContainer>
                </div>
              </FilterTCBSubdiv>
            </FilterTCBottom>
          </FilterTopContainer>
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
              <RowWrap none>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
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
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SkyBtn>제품 추가</SkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>선택 목록 제거</WhiteRedBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
      {isModal && <CustomerFind setSwitch={setIsModal} />}
    </FilterContianer>
  )
}

export default WinningCreate
