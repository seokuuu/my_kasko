import { useEffect, useRef, useState } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Table from '../../Table/Table'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import {
  DoubleWrap,
  ExCheckDiv,
  ExCheckWrap,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterHeaderAlert,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
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

import { useAtom } from 'jotai'
import { Link, useNavigate } from 'react-router-dom'
import { winningAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { AuctionWinningFields, AuctionWinningFieldsCols } from '../../../constants/admin/Auction'
import { useQueryClient } from '@tanstack/react-query'
import useReactQuery from '../../../hooks/useReactQuery'
import { getWinning, deleteBidding } from '../../../api/auction/winning'
import { add_element_field } from '../../../lib/tableHelpers'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import useMutationQuery from '../../../hooks/useMutationQuery'

const Winning = ({ detailRow }) => {
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']

  const [winningCreate, setWinningCreate] = useAtom(winningAtom)

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

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(AuctionWinningFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  // 낙찰 취소 관련
  const keysToExtract = ['경매 번호', '창고', '고객사 목적지 고유 번호', '낙찰 상태']

  const keyMappings = {
    '경매 번호': 'auctionNumber',
    창고: 'storage',
    '고객사 목적지 고유 번호': 'customerDestinationUid',
    '낙찰 상태': 'biddingStatus',
  }

  // 낙찰 취소에 사용될 array
  const extractedArray = checkedArray?.map((item) =>
    keysToExtract.reduce((obj, key) => {
      obj[keyMappings[key]] = item[key]
      return obj
    }, {}),
  )
  // 낙찰 취소 POST
  const deleteMutation = useMutationQuery('', deleteBidding)

  // 낙찰 취소 버튼 Handler
  const deleteOnClickHandler = () => {
    deleteMutation.mutate(extractedArray)
  }

  const [Param, setParam] = useState({
    pageNum: 1,
    pageSize: 10,
    orderType: '경매',
  })

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getDetailProgress', getWinning)
  const resData = data?.data?.data?.list

  console.log('resData', resData)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, AuctionWinningFields))
    }
  }, [isSuccess, resData])

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 낙찰 관리</h1>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      <FilterHeaderAlert>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <img src="/img/notice.png" />
          </div>
          <div style={{ marginTop: '6px' }}>
            <div>
              · 입금계좌번호 : 우리은행 1005-301-817070, 신한은행 140-013-498612, 기업은행 070-8889-3456, 예금주 :
              카스코철강
            </div>
            <div style={{ marginTop: '6px' }}>· 경매일 익일 12:00시 내 입금 필수 (낙찰 확정)</div>
            <div style={{ marginTop: '6px' }}>
              · 낙찰 후 지정 입금 요청일까지 미 입금 시 2주간 경매 참여가 제한되며, 경매 제한 3회 발생 시 당사 경매가
              참여가 불가하오니 주의하시기 바랍니다.
            </div>
            <div style={{ marginTop: '6px' }}>
              · 낙찰금액은 제품대공급가, 제품대부가세를 합한 금액입니다. (상세화면 참조)
            </div>
            <div style={{ marginTop: '6px' }}>· 운반금액은 운반비공급가, 운반비부가세를 합한 금액입니다.</div>
          </div>
        </div>

        <div style={{ marginTop: '-100px' }}>
          수정
          <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
        </div>
      </FilterHeaderAlert>
      {exFilterToggle && (
        <>
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
                  <h6>고객사 명/고객사코드</h6>
                  <Input />
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap first>
                  <h6>구분</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>주문 상태</h6>
                  <ExCheckWrap>
                    {checkSales.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                          isChecked={check1[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
                <PartWrap />
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap>
                  <h6 style={{ width: '130px' }}>확정 전송 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>

                <PartWrap>
                  <h6 style={{ marginLeft: '0px' }}>경매일시</h6>
                  <ExInputsWrap>
                    <GridWrap>
                      <DateGrid bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid bgColor={'white'} fontSize={17} />
                    </GridWrap>
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
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to={`/auction/winningcreate`}>
              <WhiteBlackBtn>낙찰 생성</WhiteBlackBtn>
            </Link>
            <WhiteRedBtn onClick={deleteOnClickHandler}>낙찰 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} setChoiceComponent={() => {}} />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SkyBtn>입금확인</SkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default Winning
