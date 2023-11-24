import { useCallback, useEffect, useState } from 'react'
import { BlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

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
import { deleteAuction, getAuction } from '../../../api/auction/round'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import AuctionRound from '../../../modal/Multi/AuctionRound'
import { roundPostModalAtom } from '../../../store/Layout/Layout'

const Round = ({}) => {
  const [roundModal, setRoundModal] = useAtom(roundPostModalAtom)
  const [types, setTypes] = useState('normal')

  console.log('types', types)
  const radioDummy = ['전체', '미진행', '진행중', '종료']
  const radioDummy2 = ['불량', '제외 요청', '기타 사유']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioDummy2.length }, (_, index) => index === 0))

  const [savedRadioValue, setSavedRadioValue] = useState('')
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue) //내 state에 반환

      if (Array.isArray(originalRow) && originalRow.length) {
        if (selectedValue === '전체') {
          setRow(originalRow) // 전체를 선택하면 원본 배열을 복원
        } else {
          setRow(
            (prevRow) => originalRow.filter((item) => item.status === selectedValue), // 특정 상태를 선택하면 그 상태만 필터링
          )
        }
      }
    }
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

  // api호출, 리액트쿼리 / filter
  const [row, setRow] = useState('')
  const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기
  const [inputParams, setInputParams] = useState({
    pageNum: 1,
    pageSize: 50,
    type: '단일',
  })

  const { isLoading, isError, data, isSuccess } = useReactQuery(inputParams, 'auction', getAuction)

  //  ✅ Props로 test3컴포넌트(테이블) row랑 col 데이터를 넘기는 방식
  useEffect(() => {
    if (isSuccess) {
      const responseData = data?.data?.data?.list
      setRow(responseData)
      setOriginalRow(responseData)
    }
  }, [isSuccess, data])
  const getCol = [
    {
      field: 'uid',
      minWidth: 180,
    },
    { field: 'number', maxWidth: 80 }, //숫자
    { field: 'startDate' },
    { field: 'status', maxWidth: 90 },
    {
      field: 'productCount',
    },
    {
      field: 'successfulBidCount',
    },
    {
      field: 'failBidCount',
    },
  ]

  const handleDropdown = (e) => {
    const page = e.target.value
    setInputParams({
      ...inputParams,
      pageSize: page,
    })
  }
  const 임의의UID = 22 //임의의 uid값 * 현재 에러나옴
  const mutation = useMutationQuery('auction', () => deleteAuction(임의의UID))

  const handleRemoveBtn = useCallback(() => {
    mutation.mutate()
  }, [mutation])

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 회차 관리</h1>
          <SubTitle>
            <StyledHeading isActive={types === 'normal'} onClick={() => setTypes('normal')}>
              단일
            </StyledHeading>
            <StyledSubHeading isActive={types === 'package'} onClick={() => setTypes('package')}>
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
        <Test3 getRow={row} getCol={getCol} />
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            제품 추가
          </BlackBtn>
        </TableBottomWrap>
        {roundModal && <AuctionRound setRoundModal={setRoundModal} />}
      </TableContianer>
    </FilterContianer>
  )
}

export default Round
