import moment from 'moment'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserOrderCancelMutaion, useUserOrderListQuery } from '../../../api/user'
import { BlackBtn, GreyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import DateSearchSelect from '../../../components/Search/DateSearchSelect'
import StorageSelect from '../../../components/Search/StorageSelect'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import CustomPagination from '../../../components/pagination/CustomPagination'
import { userOrderListField, userOrderListFieldsCols } from '../../../constants/user/order'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
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
  Input,
  MiniInput,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { toggleAtom } from '../../../store/Layout/Layout'
import CustomerSearch from '../../../components/Search/CustomerSearch'
import SpartSelect from '../../../components/Search/SpartSelect'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  pageNum: 1,              // 페이지 번호
  pageSize: 50,            // 페이지 갯수
  auctionNumber: '',       // 상시판매 번호
  orderStatusList: '',     // 주문상태(전체 / 확정 전송 / 확정 전송 대기 / 주문 요청 / 주문취소 / 주문확정)
  orderStartDate: '',      // 주문일자, 상시판매일자 (20240301 format)
  orderEndDate: '',        // 주문일자, 상시판매일자 (20240301 format)
  customerCode: '',        // 고객사 코드
  customerName: '',        // 고객사 명
  storage: '',             // 창고구분
  supplier: '',            // 매입처
  spec: '',                // 규격약호
  spart: '',               // 제품군
  maker: '',               // 제조사
  grade: '',               // 제품 등급
  minThickness: '',        // 최소 두께
  maxThickness: '',        // 최대 두께
  minWidth: '',            // 최소 폭
  maxWidth: '',            // 최대 폭
  minLength: '',           // 최소 길이
  maxLength: '',           // 최대 길이
  productNumberList: '',    // 제품 번호
}

/**
 * @constant 주문 상태
 */
const ORDER_STATUS_LIST = ['전체', '확정 전송', '확정 전송 대기', '주문 요청', '주문 취소', '주문 확정'];

/**
 * @constant 쌍 입력 값
 */
const pairValues = [
  { name: '두께', keys: [ 'minThickness', 'maxThickness' ] },
  { name: '폭', keys: [ 'minWidth', 'maxWidth' ] },
  { name: '길이', keys: [ 'minLength', 'maxLength' ] },
]

/**
 * 상시판매 주문확인 목록
 * @description
 * [1] 주문 목록을 조회합니다.
 * [2] 선택 항목을 주문취소 합니다.
 * 
 * @todo
 * - 주문 취소 API 연동 (BE문의)
 * - 주문일자 입력 > 시작, 종료일 같음 (Err)
 * - 매입처 옵션 연동
 * - 규격약호 옵션 연동
 * - 구분 2, 3번째 옵션 연동
 */
const Order = ({}) => {
  // API 파라미터
  const { searchParams, handleParamsChange, handlePageSizeChange, tempSearchParams, handleTempParamsChange, handleSearch, handleParamsReset } = useTableSearchParams({...initialSearchParams});
  // API
  const { data: orderData, isSuccess, isError, isLoading } = useUserOrderListQuery(searchParams); // 주문확인 목록 조회 쿼리
  const { mutate: requestCancel, loading: isCancelLoading } = useUserOrderCancelMutaion(); // 주문취소 뮤테이션
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({ tableField: userOrderListField, serverData: orderData });
  // 선택 항목
  const { selectedData, selectedWeightStr, selectedCountStr, hasSelected } = useTableSelection({ weightKey: '총 중량' });
  // NAVIGATION
  const navigate = useNavigate();

  /**
   * 입력 핸들러
   * @param {string} param.key searchParams 키 값
   * @param {string} param.value 값
   * @param {boolean} param.numType 숫자 타입 여부
   * @param {boolean} param.dateType 일자 타입 여부
   * @param {boolean} param.radioType 라디오/셀렉트박스 여부
   */
  function handleTypedInputChange({key, value, numType=false, dateType=false, radioType=false}) {
    let typedValue;

    if(numType) typedValue = value.replace(/[^0-9]./g, '');
    else if (dateType) typedValue = moment(value).format('YYYYMMDD');
    else if(radioType) typedValue = value === '전체'? '' : (value || '');
    else typedValue = value;

    handleTempParamsChange({ [key]: typedValue });
  }

  /**
   * 필터 검색 유효성 확인 메시지 반환 함수
   */
  const getInvalidationMessage = useCallback(() => {
    // 주문일자 검증
    if(tempSearchParams.orderStartDate || tempSearchParams.orderEndDate) {
      if(!tempSearchParams.orderStartDate) return '시작 주문일자를 입력해 주세요.';
      if(!tempSearchParams.orderEndDate) return '종료 주문일자를 입력해 주세요.';
      if(new Date(moment(tempSearchParams.orderStartDate)) > new Date(moment(tempSearchParams.orderEndDate))) {
        return '시작 주문일자와 종료 주문일자를 정확히 입력해 주세요';
      }
    }
    
    // 최소값, 최대값 검증
    for(const pv of pairValues) {
      const minV = tempSearchParams[pv.keys[0]];
      const maxV = tempSearchParams[pv.keys[1]];
      if(minV || maxV) {
        if(!minV) return `최소 ${pv.name} 을(를) 입력해 주세요.`;
        if(!maxV) return `최대 ${pv.name} 을(를) 입력해 주세요.`;
        if(Number(minV) > Number(maxV)) return `최소, 최대 ${pv.name} 을(를) 확인해 주세요.`;
      }
    }

    return '';
  }, [tempSearchParams]);

  /**
   * 필터 검색 핸들러
   * @param {*} e 
   */
  function handleFilterSearch(e) {
    e.preventDefault();

    const warning = getInvalidationMessage();
    
    if(warning) {
      return alert(warning);
    }

    handleSearch();
  }


  /**
   * 선택 항목 주문 취소 핸들러
   * @todo 주문취소하기 연동 | 취소하기 API 문의
   */
  function handleOrderCancel(e) {
    e.preventDefault();

    if(!hasSelected) {
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
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: ORDER_STATUS_LIST.length }, (_, index) => index === 0));
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
                {/* 창고 구분 */}
                <StorageSelect
                  value={tempSearchParams.storage || ''}
                  onChange={v => { 
                    handleTypedInputChange({ key: 'storage', value: v.label, radioType: true }); 
                  }} 
                />
                {/* 매입처*/}
                <PartWrap>
                  <h6>매입처</h6>
                  <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                </PartWrap>
                {/* 규격약호 찾기 */}
                <PartWrap>
                  <h6>규격 약호</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              {/* 고객사 찾기 */}
              <RowWrap>
                <CustomerSearch
                  name={tempSearchParams.customerName || ''}
                  code={tempSearchParams.customerCode || ''}
                  setName={n => { handleTypedInputChange({key: 'customerName', value: n}) }}
                  setCode={c => { handleTypedInputChange({key: 'customerCode', value: c}) }}
                />
              </RowWrap>
              <RowWrap>
                {/* 구분 */}
                <PartWrap first>
                  <SpartSelect value={tempSearchParams.spart || ''} onChange={v => { handleTypedInputChange({ key: 'spart', value: v.label }) }}/>
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
              {/* 주문 일자 */}
                <DateSearchSelect 
                  title="주문일자" 
                  startInitDate={searchParams.orderStartDate? new Date(searchParams.orderStartDate) : ''} 
                  endInitDate={searchParams.orderEndDate? new Date(searchParams.orderEndDate) : ''}
                  startDateChange={v => { handleTypedInputChange({key: 'orderStartDate', value: v, dateType: true }) }} 
                  endDateChange={v => { handleTypedInputChange({key: 'orderEndDate', value: v, dateType: true }) }}  
                />
              </RowWrap>
              {/* 두께 | 폭 | 길이 */}
              <RowWrap none>
                <PartWrap first>
                  <h6>두께(MM)</h6>
                  <MiniInput 
                    value={tempSearchParams.minThickness} 
                    onChange={e => { handleTypedInputChange({key: 'minThickness', value: e.target.value, numType: true}) }} 
                  />
                  <Tilde>~</Tilde>
                  <MiniInput
                    value={tempSearchParams.maxThickness} 
                    onChange={e => { handleTypedInputChange({key:'maxThickness', value: e.target.value, numType: true}) }} 
                  />
                </PartWrap>
                <PartWrap>
                  <h6>폭(MM)</h6>
                  <MiniInput 
                    value={tempSearchParams.minWidth} 
                    onChange={e => { handleTypedInputChange({key: 'minWidth', value: e.target.value, numType: true}) }} 
                  />
                  <Tilde>~</Tilde>
                  <MiniInput
                    value={tempSearchParams.maxWidth} 
                    onChange={e => { handleTypedInputChange({key: 'maxWidth', value: e.target.value, numType: true}) }} 
                  />
                </PartWrap>
                <PartWrap>
                  <h6>길이(MM)</h6>
                  <MiniInput 
                    value={tempSearchParams.minLength} 
                    onChange={e => { handleTypedInputChange({key: 'minLength', value: e.target.value, numType: true}) }} 
                  />
                  <Tilde>~</Tilde>
                  <MiniInput
                    value={tempSearchParams.maxLength} 
                    onChange={e => { handleTypedInputChange({ key: 'maxLength', value: e.target.value, numType: true}) }} 
                  />
                </PartWrap>
              </RowWrap>
              {/* 진행 상태 */}
              <RowWrap none>
                <PartWrap first>
                  <h6>진행 상태</h6>
                  <ExRadioWrap>
                    {ORDER_STATUS_LIST.map((text, index) => (
                      <RadioMainDiv key={index}>
                        <RadioCircleDiv
                          isChecked={checkRadio[index]}
                          onClick={() => {
                            setCheckRadio(CheckBox(checkRadio, checkRadio.length, index));
                            handleTypedInputChange({key: 'orderStatusList', value: text, radioType: true});
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
            {/* 제품 번호 */}
            <FilterRight>
              <DoubleWrap>
                <h6>제품 번호 </h6>
                <textarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                  value={tempSearchParams.productNumberList || ''}
                  onChange={e => { handleTypedInputChange({ key: 'productNumberList', value: e.target.value }) }}
                />
              </DoubleWrap>
            </FilterRight>
          </FilterSubcontianer>
          <FilterFooter>
            <button style={{ display: 'flex' }} onClick={() => { handleParamsReset() }}>
              <p>초기화</p>
              <ResetImg
                src="/img/reset.png"
                style={{ marginLeft: '10px', marginRight: '20px' }}
                onClick={handleImageClick}
                className={isRotated ? 'rotate' : ''}
              />
            </button>
            <div style={{ width: '180px' }}>
              <BlackBtn width={100} height={40} disabled={isLoading} onClick={handleFilterSearch}>
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
            조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handlePageSizeChange} />
            <Excel getRow={tableRowData} />
          </div>
        </TCSubContainer>
        {/* 선택항목 중량 | 주문 취소 */}
        <TCSubContainer>
          <div>
            선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleOrderCancel} disabled={isCancelLoading}>주문 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
        {/* 테이블 */}
        <Table getRow={tableRowData} getCol={userOrderListFieldsCols} isRowClickable handleOnRowClicked={handleTableRowClick} />
        {/* 페이지네이션 */}
        <CustomPagination pagination={paginationData} onPageChange={p => { handleParamsChange({page: p}) }} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Order
