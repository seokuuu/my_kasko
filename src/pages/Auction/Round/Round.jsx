import { useCallback, useEffect, useRef, useState } from 'react'
import { BlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Table from '../../Table/Table'

import { CheckBox } from '../../../common/Check/Checkbox'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import {
  DoubleWrap,
  ExRadioWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
  StyledHeading,
  StyledSubHeading,
  SubTitle,
  TCSubContainer,
  TableBottomWrap,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import { deleteAuction, getAuction, useGetAuctionList } from '../../../api/auction/round'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import AuctionRound from '../../../modal/Multi/AuctionRound'
import { roundPostModalAtom } from '../../../store/Layout/Layout'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuctionRoundFields, AuctionRoundFieldsCols } from '../../../constants/admin/Auction'
import { add_element_field } from '../../../lib/tableHelpers'
import { isArray } from 'lodash'

const Round = ({}) => {
  const [roundModal, setRoundModal] = useAtom(roundPostModalAtom)
  const [types, setTypes] = useState('단일')

  console.log('types', types)
  const radioDummy = ['전체', '미진행', '진행중', '종료']
  const radioDummy2 = ['불량', '제외 요청', '기타 사유']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioDummy2.length }, (_, index) => index === 0))

  const [savedRadioValue, setSavedRadioValue] = useState('')

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

  // api호출, 리액트쿼리 / filter
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(AuctionRoundFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기
  const [inputParams, setInputParams] = useState({
    pageNum: 1,
    pageSize: 50,
    type: types,
  })

  useEffect(() => {
    setInputParams((prevParams) => ({
      ...prevParams,
      type: types,
    }))
  }, [types])

  const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(inputParams, 'auction', getAuction)

  useEffect(() => {
    refetch()
  }, [inputParams])

  //  ✅ Props로 test3컴포넌트(테이블) row랑 col 데이터를 넘기는 방식

  const resData = data?.data?.data?.list
  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, AuctionRoundFields))
    }
  }, [isSuccess, resData])

  const handleDropdown = (e) => {
    const page = e.target.value
    setInputParams({
      ...inputParams,
      pageSize: page,
    })
  }
  // const 임의의UID = 22 //임의의 uid값 * 현재 에러나옴
  // const mutation = useMutationQuery('auction', () => deleteAuction(임의의UID))

  // const handleRemoveBtn = useCallback(() => {
  //   mutation.mutate()
  // }, [mutation])

  // 삭제
  const mutation = useMutation(deleteAuction, {
    onSuccess: () => {
      queryClient.invalidateQueries('auction')
    },
  })

  const handleRemoveBtn = useCallback(() => {
    if (isArray(checkedArray) && checkedArray.length > 0) {
      if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
        checkedArray.forEach((item) => {
          mutation.mutate(item['고유 번호']) //mutation.mutate로 api 인자 전해줌
        })
      }
    } else {
      alert('선택해주세요!')
    }
  }, [checkedArray])

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 회차 관리</h1>
          <SubTitle>
            <StyledHeading isActive={types === '단일'} onClick={() => setTypes('단일')}>
              단일
            </StyledHeading>
            <StyledSubHeading isActive={types === '패키지'} onClick={() => setTypes('패키지')}>
              패키지
            </StyledSubHeading>
          </SubTitle>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap first>
                  <h6>경매 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6>경매 회차 번호</h6>
                  <Input />
                </PartWrap>
                <PartWrap />
              </RowWrap>

              <RowWrap>
                <PartWrap first>
                  <h6>진행 상태</h6>
                  <ExRadioWrap>
                    {radioDummy.map((text, index) => (
                      <RadioMainDiv key={index}>
                        <RadioCircleDiv
                          isChecked={checkRadio[index]}
                          onClick={() => {
                            setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                          }}
                        >
                          <RadioInnerCircleDiv isChecked={checkRadio[index]} />
                        </RadioCircleDiv>
                        <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                      </RadioMainDiv>
                    ))}
                  </ExRadioWrap>
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
            <PageDropdown handleDropdown={handleDropdown} />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleRemoveBtn}>회차 삭제</WhiteRedBtn>
            <WhiteSkyBtn
              onClick={() => {
                setRoundModal(true)
              }}
            >
              경매 회차 등록
            </WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} />
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            제품 추가
          </BlackBtn>
        </TableBottomWrap>
        {roundModal && <AuctionRound setRoundModal={setRoundModal} types={types} />}
      </TableContianer>
    </FilterContianer>
  )
}

export default Round
