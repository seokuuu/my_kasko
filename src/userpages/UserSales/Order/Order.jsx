import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { BlackBtn, GreyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { CheckBox } from '../../../common/Check/Checkbox'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { add_element_field } from '../../../lib/tableHelpers'
import {
  AlertImg,
  DoubleWrap,
  ExRadioWrap,
  FilterAlterTxt,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterHeaderAlert,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  MiniInput,
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { useUserOrderCancelMutaion, useUserOrderListQuery } from '../../../api/user'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { userOrderListField, userOrderListFieldsCols } from '../../../constants/user/order'
import Table from '../../../pages/Table/Table'
import CustomPagination from '../../../components/pagination/CustomPagination'
import { useNavigate } from 'react-router-dom'
import useTableSelection from '../../../hooks/useTableSelection'

/**
 * 상시판매 주문확인 목록
 * @description
 * [1] 주문 목록을 조회합니다.
 * [2] 선택 항목을 주문취소 합니다.
 */
const Order = ({}) => {
  // API 파라미터
  const [searchParam, setSearchParam] = useState({ pageNum: 1, pageSize: 50 }); // 테이블 조회 파라미터
  // API
  const { data: orderData, isLoading, isError } = useUserOrderListQuery(searchParam); // 주문확인 목록 조회 쿼리
  const { mutate: requestCancel, loading: isCancelLoading } = useUserOrderCancelMutaion(); // 주문취소 뮤테이션
  // 테이블 데이터
  const tableDisplayData = useMemo(() => {
    if(!orderData || !orderData.list) {
      return [];
    }
    const rowData = orderData.list;
    const displayData = add_element_field(rowData.map((v, idx) => ({...v, index: idx + 1})), userOrderListField);
    return displayData;
  }, [orderData]); // 테이블 노출 데이터
  // 페이지 데이터
  const paginationData = useMemo(() => {
    let initialData = { pageNum: 1, startPage: 1, endPage: 1, maxPage: 1, listCount: 0 };
    if(orderData && orderData.pagination) {
      initialData = orderData.pagination;
      initialData.endPage = Math.max(orderData.pagination.endPage, 1);
    }
    return initialData;
  }, [orderData]);
  // 선택 항목
  // 갯수
  const totalCount = useMemo(() => (orderData && orderData.pagination)? orderData.pagination.listCount || 0 : 0 , [orderData]);
  // 중량
  const totalWeight = useMemo(() => (orderData && orderData.pagination)? orderData.pagination.totalWeight || 0 : 0 , [orderData]); // 총 중량
  // 선택 항목
  const { selectedData, selectedWeight, selectedWeightStr, selectedCountStr, selectedCount } = useTableSelection({ weightKey: '총 중량' });

  // NAVIGATION
  const navigate = useNavigate();

  /**
   * 필터 핸들러
   * @param {object} param 파라미터 객체
   */
  function handleSearchParamChange(newParam) {
    setSearchParam(prevParam => ({
      ...prevParam,
      ...newParam,
      ...(!newParam['page']&& { page: 1 })
    }));
  }
  
  /**
   * 조회갯수 변경 핸들러
   * @param {number} searchSize 1페이지당 조회 갯수 
   */
  function handleSearchSizeChange(e) {
    const newSize = e.target.value;
    if(newSize !== searchParam.pageSize && !isNaN(newSize)) {
      handleSearchParamChange({ pageSize: newSize });
    }
  }

  /**
   * 선택 항목 주문 취소 핸들러
   * @todo 주문취소하기 연동
   */
  function handleOrderCancel(e) {
    e.preventDefault();

    if(selectedCount < 1) {
      return alert('주문 취소할 제품을 선택해 주세요.');
    }

    // requestCancel({});
  }

  /**
   * 테이블 열 클릭 핸들러
   */
  function handleTableRowClick(row) {
    const uid = row?.data['상시판매 번호'];
    if(uid) {
      navigate(`/userpage/salesorder/${uid}`);
    }
  }

  /* ============================== COMMON start ============================== */
  // CHECKS
  const radioDummy = ['전체', '주문요청', '주문취소', '주문확정']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  // FILTER ON TOGGLE
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom);
  const [toggleMsg, setToggleMsg] = useState('On')
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }
  // RESET
  const [isRotated, setIsRotated] = useState(false)
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }
  /* ============================== COMMON end ============================== */

  // ERROR SECTION
  if(isError) {
    return <div>ERROR</div>
  }

  // LOADING SECTION
  if(isLoading) {
    return <div>Loading</div>
  }

  // DATA SECTION
  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>주문 확인</h1>
        </div>
        {/* 검색필터 ON|OFF */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {/* 공지사항 */}
      <FilterHeaderAlert>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <img src="/img/notice.png" />
          </div>
          <div style={{ marginTop: '6px' }}>
            <FilterAlterTxt style={{ marginTop: '0px' }}>
              · 경매 남은 시간은 본 화면에서 발생되는 메시지 창에 따라 다소 지연될 수 있습니다. 경매 남은 시간을
              최신으로 갱신하려면 다시 조회해 주세요.
            </FilterAlterTxt>
          </div>
        </div>
        <AlertImg>
          수정
          <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
        </AlertImg>
      </FilterHeaderAlert>
      {/* 검색 필터 */}
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap none>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>
                <PartWrap>
                  <h6>매입처</h6>
                  <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
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
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
                <PartWrap>
                  <h6>주문일자</h6>
                  <GridWrap>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid width={130} bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
              </RowWrap>

              {/* RowWrap none : border-bottom이 없음
PartWrap first : Row의 제일 앞에 오는 Part (제목 width 고정용) */}
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
              <RowWrap none>
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
      {/* 테이블 */}
      <TableContianer>
        {/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount.toLocaleString()}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handleSearchSizeChange} />
            <Excel getRow={tableDisplayData} />
          </div>
        </TCSubContainer>
        {/* 선택항목 중량 | 주문 취소 */}
        <TCSubContainer>
          <div>
            선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeight.toLocaleString()} (kg)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleOrderCancel} disabled={isCancelLoading}>주문 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
        {/* 테이블 */}
        <Table getRow={tableDisplayData} getCol={userOrderListFieldsCols} isRowClickable handleOnRowClicked={handleTableRowClick} />
        {/* 페이지네이션 */}
        <CustomPagination pagination={paginationData} onPageChange={p => { handleSearchParamChange({page: p}) }} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Order
