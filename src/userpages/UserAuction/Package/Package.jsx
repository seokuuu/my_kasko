import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import { Link } from 'react-router-dom'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnBound, BtnWrap } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import Excel from '../../../components/TableInner/Excel'
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
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

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
  MiniInput,
  CustomInput,
} from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'

import { userPageSingleDestiFindAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import useReactQuery from '../../../hooks/useReactQuery'
import { getAuctionDestination } from '../../../api/auction/winning'
import { getBidding } from '../../../api/auction/bidding'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import { useQueryClient } from '@tanstack/react-query'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../../pages/Table/Table'

const Single = ({}) => {
  const radioDummy = ['전체', '미응찰', '관심제품', '응찰']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
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

  const { data: auctionDestination } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

  console.log('auctionDestination', auctionDestination?.data?.data)

  const [customerData, setCustomerData] = useState()
  const [propsUid, setPropsUid] = useState(null)
  const [destiObject, setDestiObject] = useState()

  const productListInner = {
    biddingPrice: null,
    customerDestinationUid: null,
  }

  const [winningCreateInput, setwinningCreateInput] = useState(productListInner)

  console.log('winningCreateInput', winningCreateInput)

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(AuctionBiddingFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]
  const [tablePagination, setTablePagination] = useState([])

  const [Param, setParam] = useState({
    pageNum: 1,
    pageSize: 50,
    type: '패키지',
  })

  // 전체 GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getBidding', getBidding)
  const resData = data?.data?.data?.list
  const resPagination = data?.data?.data?.pagination

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, AuctionBiddingFields))
      setTablePagination(resPagination)
    }
  }, [isSuccess, resData])

  const auctionNumber = checkedArray?.[0]?.['경매 번호']

  const init = {
    auctionNumber: null,
    type: '패키지',
  }
  const [winningCreateData, setWinningCreateData] = useState(init)
  // 목적지 찾기 및 목적지 uid, auctionNumber set //
  useEffect(() => {
    const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
    setDestiObject(selectedObject)
    setWinningCreateData((p) => ({
      ...p,
      auctionNumber: auctionNumber,
    }))
  }, [propsUid, auctionNumber])

  useEffect(() => {
    const updatedProductList = checkedArray?.map((item) => ({
      productUid: item['제품 고유 번호'],
      biddingPrice: winningCreateInput.biddingPrice,
      customerDestinationUid: destiObject?.uid,
      // 여기에 다른 필요한 속성을 추가할 수 있습니다.
    }))

    // winningCreateData를 업데이트하여 productList를 갱신
    setWinningCreateData((prevData) => ({
      ...prevData,
      biddingList: updatedProductList,
    }))
  }, [checkedArray, winningCreateInput, destiObject])

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

  console.log('winningCreateData', winningCreateData)

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 응찰</h1>
          <SubTitle>
            <Link to={`/userpage/auctionsingle`}>
              <h6>단일</h6>
            </Link>
            <h5>패키지</h5>
          </SubTitle>
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
              · 경매 남은 시간은 본 화면에서 발생되는 메시지 창에 따라 다소 지연될 수 있습니다. 경매 남은 시간을
              최신으로 갱신하려면 다시 조회해 주세요.
            </div>
            <div style={{ marginTop: '6px' }}>
              · 처음 경매 참여하신 고객은 왼쪽 메뉴 경매 관리 {'>'} 고객 목적지 등록 화면에서 배송 목적지를 반드시
              등록한 후 응찰에 참여해 주시길 부탁드립니다.
            </div>
          </div>
        </div>

        <div>
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
              <RowWrap>
                <PartWrap first>
                  <h6>조회 구분</h6>
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
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <span style={{ margin: '0px -10px 0px 5px' }}>~</span>
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
            <PageDropdown handleDropdown={handleTablePageSize} />
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
              justifyContent: 'center',
            }}
          >
            <p>목적지</p>
            <CustomInput placeholder="h50" width={60} height={32} defaultValue={destiObject?.code} />
            <CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destiObject?.destinationName} />
            <CustomInput placeholder="도착지 연락처" width={120} height={32} defaultValue={destiObject?.name} />
            <TWhiteBtn
              style={{ width: '50px' }}
              height={30}
              onClick={() => {
                setDestinationPopUp(true)
              }}
            >
              찾기
            </TWhiteBtn>
            <TGreyBtn>적용</TGreyBtn>
            <BtnBound style={{ margin: '0px' }} />
            <p>일괄 경매 응찰</p>
            <CustomInput
              placeholder="응찰가 + 최고가 입력"
              width={140}
              height={32}
              onChange={(e) => {
                setwinningCreateInput((p) => ({
                  ...p,
                  biddingPrice: parseInt(e.target.value) || null,
                }))
              }}
            />
            <TGreyBtn height={30} style={{ width: '50px' }}>
              적용
            </TGreyBtn>
            <BtnBound style={{ margin: '0px' }} />
            <SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50}>
              응찰
            </SkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
      </TableContianer>
      {destinationPopUp && (
        <InventoryFind
          title={'목적지 찾기'}
          type={'낙찰 생성'}
          setSwitch={setDestinationPopUp}
          data={auctionDestination}
          setPropsUid={setPropsUid}
        />
      )}
    </FilterContianer>
  )
}

export default Single
