import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { GreyBtn, SkyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  DoubleWrap,
  ExCheckWrap,
  FilterContianer,
  FilterHeader,
  FilterHeaderAlert,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PWRight,
  PartWrap,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'
import Hidden from '../../../components/TableInner/Hidden'
import { UserPageUserPreferFieldsCols } from '../../../constants/admin/UserManage'
import Table from '../../Table/Table'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import { getSaleProductList } from '../../../api/saleProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { saleProductListFieldsCols, saleProductListResponseToTableRowMap } from '../../../constants/admin/saleProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'

const SellOrder = ({ setChoiceComponent }) => {
  const [param, setParam] = useState({
    pageNum: 1,
    pageSize: 10,
  })
  const checkBoxSelect = useAtomValue(selectedRowsAtom)
  const checkSales = ['전체', '확정 전송', '확정전송 대기']
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)
  const {
    isLoading,
    isError,
    data: getSaleProductListRes,
    isSuccess,
  } = useReactQuery(param, 'getSaleProductList', getSaleProductList)

  const [saleProductListData, setSaleProductListData] = useState(null)
  const [saleProductPagination, setSaleProductPagination] = useState([])
  useEffect(() => {
    console.log('getSaleProductListRes---', getSaleProductListRes)
    if (getSaleProductListRes && getSaleProductListRes.data && getSaleProductListRes.data.data) {
      setSaleProductListData(formatTableRowData(getSaleProductListRes.data.data.list))
      setSaleProductPagination(getSaleProductListRes.data.data.pagination)
      console.log('getSaleProductListRes.data.data.pagination---', getSaleProductListRes.data.data.pagination)
    }
  }, [isSuccess, getSaleProductListRes])

  const formatTableRowData = (rowData) => {
    return add_element_field(rowData, saleProductListResponseToTableRowMap)
  }
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

  const [isModal, setIsModal] = useAtom(blueModalAtom)

  console.log('isModal =>', isModal)

  const modalOpen = () => {
    setIsModal(true)
  }

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(UserPageUserPreferFieldsCols)
  const getCol = tableField.current
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const handleTablePageSize = (event) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageSize: Number(event.target.value),
    }))
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>상시 판매 주문 확인</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        <FilterHeaderAlert>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <img src="/img/notice.png" />
            </div>
            <div style={{ marginTop: '8px' }}>
              <div>
                · <b style={{ color: '#4c83d6' }}>입금계좌번호</b> : 우리은행 1005-301-817070, 신한은행 140-013-498612,
                기업은행 070-8889-3456, 예금주 : 카스코철강
              </div>
              <div style={{ marginTop: '8px' }}>· 경매일 익일 12:00시 내 입금 필수 (낙찰 확정)</div>
              <div style={{ marginTop: '8px' }}>
                · 낙찰 후 지정 입금 요청일까지 미 입금 시 2주간 경매 참여가 제한되며, 경매 제한 3회 발생 시 당사 경매가
                참여가 불가하오니 주의하시기 바랍니다.
              </div>
              <div style={{ marginTop: '8px' }}>
                · 낙찰금액은 제품대공급가, 제품대부가세를 합한 금액입니다. (상세화면 참조)
              </div>
              <div style={{ marginTop: '8px' }}>· 운반금액은 운반비공급가, 운반비부가세를 합한 금액입니다.</div>
            </div>
          </div>

          <div style={{ marginTop: '-100px' }}>
            수정
            <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
          </div>
        </FilterHeaderAlert>
        {exFilterToggle && (
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap none>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>구분</h6>
                  <MainSelect />
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap>
                  <h6>고객사 명/고객사코드</h6>
                  <Input />
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap>
                  <h6 style={{ width: '165px' }}>상시판매 주문일자</h6>
                  <GridWrap>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6>상시 판매 번호</h6>
                  <Input />
                </PartWrap>
              </RowWrap>
              <RowWrap none>
                <PartWrap first>
                  <h6>주문 상태</h6>
                  <ExCheckWrap>
                    {checkSales.map((x, index) => (
                      <ExCheckWrap style={{ marginRight: '15px' }}>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                          isChecked={check1[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckWrap>
                    ))}
                  </ExCheckWrap>
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
        )}
      </div>
      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
            {saleProductPagination?.listCount}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handleTablePageSize} />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량
            <span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
            kg / 총 중량 {formatWeight(saleProductPagination.totalWeight)} kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>주문 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
        <Table getCol={saleProductListFieldsCols} getRow={saleProductListData} />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteSkyBtn>입금 요청서 발행</WhiteSkyBtn>
            <SkyBtn>입금 확인</SkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default SellOrder
