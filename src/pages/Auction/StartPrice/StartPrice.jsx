import { useCallback, useEffect, useRef, useState } from 'react'
import { BlackBtn, NewBottomBtnWrap, TGreyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import PageDropdown from '../../../components/TableInner/PageDropdown'

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

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isArray } from 'lodash'
import moment from 'moment'
import { deleteStartPrice, getStartPrice, unitPricePost } from '../../../api/auction/startprice'
import Hidden from '../../../components/TableInner/Hidden'
import {
  AuctionStartPriceFields,
  AuctionStartPriceFieldsCols,
  AuctionUnitPricePost,
  AuctionUnitPricePostDropOptions,
  AuctionUnitPricePostDropOptions2,
  AuctionUnitPricePostDropOptions3,
} from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import Upload from '../../../modal/Upload/Upload'
import { AuctionUnitPriceAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import useMutationQuery from '../../../hooks/useMutationQuery'

const StartPrice = ({}) => {
  const [insertList, setInsertList] = useState({ insertList: [] })
  console.log('insertList', insertList)
  const [tablePagination, setTablePagination] = useState([])
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']

  const [applyDate, setApplyDate] = useState() // 적용 일자
  // 단가 일괄 변경 data
  const effectDate = moment(applyDate).format('YYYY-MM-DD')
  const nowDate = new Date()
  const nowRealDate = moment(nowDate).format('YYYY-MM-DD')
  const [effectPrice, setEffectPrice] = useState()
  const [initObject, setInitObject] = useState()

  const [modalSwitch, setModalSwitch] = useAtom(AuctionUnitPriceAtom)

  console.log('modalSwitch', modalSwitch)
  console.log('initObject', initObject)

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

  const [dropInput, setDropInput] = useState({
    spart: '',
    preferThickness: '',
    grade: '',
  })

  const handleSelectChange = (selectedOption, name) => {
    setDropInput((prevState) => ({
      ...prevState,
      [name]: selectedOption.label,
    }))
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
  const tableField = useRef(AuctionStartPriceFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const [Param, setParam] = useState({
    pageNum: 1,
    pageSize: 50,
  })

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getStartPrice', getStartPrice)
  const resData = data?.data?.data?.list

  console.log('resData', resData)
  const resPagination = data?.data?.data?.pagination
  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, AuctionStartPriceFields))
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

  // 체크 시 응찰가, 적용일자 자동 적용
  // TODO : 응찰가와 적용일자가 비어있으면 체크 안되게 막는 법 예외처리
  useEffect(() => {
    const updatedProductList = checkedArray?.map((item) => ({
      uid: item['고유 번호'],
      effectDate: effectDate,
      effectPrice: effectPrice,
      // 여기에 다른 필요한 속성을 추가할 수 있습니다.
    }))

    // winningCreateData를 업데이트하여 productList를 갱신
    setInitObject((prevData) => ({
      ...prevData,
      updateList: updatedProductList,
    }))
  }, [checkedArray])

  // 삭제 mutate
  const mutation = useMutation(deleteStartPrice, {
    onSuccess: () => {
      queryClient.invalidateQueries('auction')
    },
  })
  // 삭제 onClick
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

  const editInit = {
    failCount: '',
    effectPrice: '',
    effectDate: nowRealDate,
  }

  // 단가 등록
  const [editInput, setEditInput] = useState(editInit)

  console.log('editInput', editInput)

  // editInput과 onEditHandler를 name 매칭
  const convertKey = {
    유찰횟수: 'failCount',
    '적용 단가': 'effectPrice',
  }

  // 단가 등록 post 함수
  const postMutation = useMutationQuery('', unitPricePost)
  const propsPost = () => {
    postMutation.mutate({ insertList })
  }

  const onEditHandler = useCallback((e) => {
    console.log('Edit input event:', e)
    const { name, value } = e.target

    // failCount와 effectPrice에 대해서만 정수로 변환
    const intValue = ['failCount', 'effectPrice'].includes(name) ? parseInt(value, 10) : value

    setEditInput((prevEditInput) => ({
      ...prevEditInput,
      [name]: ['failCount', 'effectPrice'].includes(name) ? (isNaN(intValue) ? '' : intValue) : value,
    }))
  }, [])

  const dropdownProps = [
    { options: AuctionUnitPricePostDropOptions, defaultValue: AuctionUnitPricePostDropOptions[0] },
    { options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
    { options: AuctionUnitPricePostDropOptions3, defaultValue: AuctionUnitPricePostDropOptions3[0] },
  ]

  useEffect(() => {
    // editInput을 포함하는 객체를 생성하고 insertList 상태에 할당합니다.
    setInsertList([{ ...editInput }])
  }, [editInput])

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 시작 단가 관리</h1>
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
                  <h6>구분</h6>
                  <PWRight style={{ width: '160px' }}>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                  <PWRight style={{ width: '160px' }}>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                  <PWRight style={{ width: '160px' }}>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>
              </RowWrap>

              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap first>
                  <h6>적용 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>

                <PartWrap>
                  <h6>유찰 횟수</h6>
                  <ExInputsWrap>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </ExInputsWrap>
                </PartWrap>
                <PartWrap />
              </RowWrap>
            </FilterLeft>
            <FilterRight>
              <DoubleWrap></DoubleWrap>
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
            <p>일괄 단가 적용</p>
            <CustomInput
              placeholder="응찰가 입력"
              width={120}
              height={32}
              onChange={(e) => {
                setEffectPrice(parseInt(e.target.value))
              }}
            />
            <DateGrid
              placeholder="적용일자"
              bgColor={'white'}
              fontSize={14}
              height={32}
              width={130}
              startDate={applyDate}
              setStartDate={setApplyDate}
            />
            <TGreyBtn height={30} style={{ width: '50px' }}>
              적용
            </TGreyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
        <TCSubContainer>
          <div></div>
          <div>
            <WhiteRedBtn style={{ marginRight: '10px' }} onClick={handleRemoveBtn}>
              삭제
            </WhiteRedBtn>
            <WhiteBlackBtn
              onClick={() => {
                setModalSwitch(true)
              }}
            >
              단가 등록
            </WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <NewBottomBtnWrap bottom={0}>
          <BlackBtn width={12} height={40}>
            저장
          </BlackBtn>
        </NewBottomBtnWrap>
      </TableContianer>
      {modalSwitch && (
        <Upload
          modalSwitch={modalSwitch}
          setModalSwitch={setModalSwitch}
          title={'단가 등록'}
          propsHandler={propsPost}
          modalInTable={AuctionUnitPricePost}
          getRow={getRow}
          // uidAtom={uidAtom}
          onEditHandler={onEditHandler}
          dropdownProps={dropdownProps}
          editInput={editInput}
          setEditInput={setEditInput}
          convertKey={convertKey}
          handleSelectChange={handleSelectChange}
          dropInput={dropInput}
          setDropInput={setDropInput}
        />
      )}
    </FilterContianer>
  )
}

export default StartPrice
