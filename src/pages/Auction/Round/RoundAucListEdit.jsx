import { useEffect, useRef, useState } from 'react'
import {
  BlackBtn,
  BtnBound,
  GreyBtn,
  NewBottomBtnWrap,
  SkyBtn,
  TGreyBtn,
  WhiteBtn,
  WhiteRedBtn,
} from '../../../common/Button/Button'
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
  CustomInput,
  MiniInput,
} from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import DefaultBlueBar from '../../../modal/Multi/DefaultBlueBar'
import RoundAucProAdd from './RoundAucProAdd'
import { add_element_field } from '../../../lib/tableHelpers'
import useReactQuery from '../../../hooks/useReactQuery'
import { useQueryClient } from '@tanstack/react-query'
import { getDetailAuction } from '../../../api/auction/round'
import { AuctionRoundDetailFields, AuctionRoundDetailFieldsCols } from '../../../constants/admin/Auction'
import Table from '../../Table/Table'

//경매 목록 수정(단일)
const RoundAucListEdit = ({ setEditPage, types, uidAtom, auctionNum }) => {
  const [newResData, setNewResData] = useState([])
  const [addList, setAddList] = useState([])
  const [deleteList, setDeleteList] = useState([])
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
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
  const tableField = useRef(AuctionRoundDetailFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기
  const [inputParams, setInputParams] = useState({
    pageNum: 1,
    pageSize: 50,
    auctionNumber: auctionNum,
  })

  useEffect(() => {
    setInputParams((prevParams) => ({
      ...prevParams,
      type: types,
    }))
  }, [types])

  const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
    inputParams,
    'getdetailauction',
    getDetailAuction,
  )

  useEffect(() => {
    refetch()
  }, [inputParams])

  const resData = data?.data?.data?.list
  const NeoResData = [...resData, newResData]
  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, AuctionRoundDetailFields))
    }
  }, [isSuccess, resData])

  console.log('resData', resData)

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 목록 수정 ({types})</h1>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      <FilterTopContainer>
        <FilterTCTop>
          <h6>경매 번호</h6>
          <p>{auctionNum}</p>
        </FilterTCTop>
      </FilterTopContainer>
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
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
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
              <RowWrap>
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p>시작가 일괄 변경</p>
            <CustomInput placeholder="" width={120} height={32} />
            <TGreyBtn height={30} style={{ width: '50px' }}>
              적용
            </TGreyBtn>
            <BtnBound />
            <SkyBtn
              onClick={() => {
                setAddModal(true)
              }}
            >
              제품 추가
            </SkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} />
        <TCSubContainer>
          <div style={{ display: 'flex', gap: '10px' }}></div>
          <div>
            <WhiteRedBtn>선택 목록 제거</WhiteRedBtn>
          </div>
        </TCSubContainer>
        {addModal && <RoundAucProAdd setAddModal={setAddModal} newResData={newResData} setNewResData={setNewResData} />}
        <NewBottomBtnWrap bottom={-5}>
          <WhiteBtn width={13} height={40}>
            돌아가기
          </WhiteBtn>
          <BlackBtn width={13} height={40}>
            등록
          </BlackBtn>
        </NewBottomBtnWrap>
      </TableContianer>
    </FilterContianer>
  )
}

export default RoundAucListEdit
