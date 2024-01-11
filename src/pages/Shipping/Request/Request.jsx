import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'

import {
  TCSubContainer,
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
  CustomInput,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { TableWrap, ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import { useShipmentListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { useAtom } from 'jotai/index'
import { formatWeight } from '../../../utils/utils'
import { add_element_field } from '../../../lib/tableHelpers'
import {
  CustomerSearch,
  DateSearchSelect,
  DestinationSearch,
  ProductNumberListSearch,
  SpartSelect,
  StorageSelect,
} from '../../../components/Search'
import Table from '../../Table/Table'
import RequestSelector from './RequestSelector'
import { getAddNewDestination } from './utils'

const initData = {
  pageNum: 1,
  pageSize: 10,
  shipmentStatus: '출하 지시',
  storage: '',
  customerCode: '',
  customerName: '',
  destinationCode: '',
  destinationName: '',
  auctionStartDate: '',
  auctionEndDate: '',
  shippingStartDate: '',
  shippingEndDate: '',
  spart: '',
  productNumberList: '',
}

const Request = ({ setChoiceComponent }) => {
  // data fetch
  const [param, setParam] = useState(initData)
  const { data, refetch } = useShipmentListQuery(param)
  const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation()

  // Table
  const tableField = useRef(ShippingRegisterFieldsCols)
  const getCol = tableField.current
  const [getRow, setGetRow] = useState('')
  const [rowChecked, setRowChecked] = useAtom(selectedRowsAtom)

  const [selectorList, setSelectorList] = useState([]) // 선별 목록
  const [destinations, setDestinations] = useState(new Array(3)) // 목적지

  // 선별 목록 추가
  const addSelectorList = () => {
    try {
      const newDestination = getAddNewDestination(rowChecked)
      setDestinations(newDestination) // 목적지 등록
      setSelectorList((prev) => [...new Set([...prev, ...rowChecked])]) // 선별 목록 데이터 등록
      setRowChecked([]) // 테이블 체크 목록 초기화
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    } catch (error) {
      window.alert(error.message)
    }
  }

  // 선별 목록 제거
  const removeSelector = () => {
    const key = '주문 고유 번호'
    const deleteKeys = rowChecked.map((item) => item[key])
    const newSelectors = selectorList.filter((item) => !deleteKeys.includes(item[key]))
    setSelectorList(newSelectors)
    setRowChecked([]) // 테이블 체크 목록 초기화
  }

  // param change
  const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  // reset event
  const onReset = async () => {
    await setParam(initData)
    await refetch()
  }

  // 출하 취소
  const onRegisterCancel = () => {
    if (!rowChecked) {
      return window.alert('제품을 선택해주세요.')
    }
    const uids = rowChecked.map((item) => item['주문 고유 번호'])
    const shipmentStatus = '출하 대기'

    if (window.confirm('출하 취소하시겠습니까?')) {
      shipmentStatusUpdate({ shipmentStatus, uids })
    }
  }

  useEffect(() => {
    const getData = data?.list
    if (getData && Array.isArray(getData)) {
      setGetRow(add_element_field(getData, ShippingRegisterFields))
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [param.pageNum, param.pageSize])

  return (
    <FilterContianer>
      {/* header */}
      <GlobalFilterHeader
        title={'출고 요청'}
        subTitle={<Subtitle2 onClick={() => setChoiceComponent('requestRecom')}>선별 추천</Subtitle2>}
      />
      {/* container */}
      <GlobalFilterContainer>
        <FilterSubcontianer>
          <FilterLeft>
            <RowWrap none>
              <StorageSelect value={param.storage} onChange={(e) => onChange('storage', e.label)} />
              <CustomerSearch
                name={param.customerName}
                code={param.customerCode}
                setName={(value) => onChange('customerName', value)}
                setCode={(value) => onChange('customerCode', value)}
              />
            </RowWrap>
            <RowWrap>
              <DestinationSearch
                name={param.destinationName}
                code={param.destinationCode}
                setName={(value) => onChange('destinationName', value)}
                setCode={(value) => onChange('destinationCode', value)}
              />
            </RowWrap>
            <RowWrap>
              <DateSearchSelect
                title={'경매 일자'}
                startInitDate={param.auctionStartDate}
                endInitDate={param.auctionEndDate}
                startDateChange={(value) => onChange('auctionStartDate', value)}
                endDateChange={(value) => onChange('auctionEndDate', value)}
              />
              <DateSearchSelect
                title={'출하 지시 일자'}
                startInitDate={param.shippingStartDate}
                endInitDate={param.shippingEndDate}
                startDateChange={(value) => onChange('shippingStartDate', value)}
                endDateChange={(value) => onChange('shippingEndDate', value)}
              />
            </RowWrap>
            <RowWrap none>
              <SpartSelect value={param.spart} onChange={(e) => onChange('spart', e.label)} />
            </RowWrap>
          </FilterLeft>
          <FilterRight>
            <ProductNumberListSearch
              value={param.productNumberList}
              onChange={(e) => onChange('productNumberList', e.target.value)}
            />
          </FilterRight>
        </FilterSubcontianer>
      </GlobalFilterContainer>
      {/* footer */}
      <GlobalFilterFooter reset={onReset} onSearch={refetch} />

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{rowChecked?.length ?? 0}</span> / {data?.pagination?.listCount}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown
              handleDropdown={(e) => setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))}
            />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span>{rowChecked?.length ?? 0}</span>kg / 총 중량 {data?.pagination?.totalWeight} kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={onRegisterCancel}>출하 취소</WhiteRedBtn>
            <WhiteSkyBtn onClick={addSelectorList}>선별 목록 추가</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table
          getCol={getCol}
          getRow={getRow}
          tablePagination={data?.pagination}
          onPageChange={(value) => onChange('pageNum', value)}
        />
      </TableContianer>
      {/* 선별 등록 */}
      <RequestSelector list={selectorList} destinations={destinations} removeSelector={removeSelector} />
    </FilterContianer>
  )
}

export default Request

const Subtitle2 = styled.h5`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  height: min-content;
  margin-top: 3px;
  color: #4c83d6;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`
