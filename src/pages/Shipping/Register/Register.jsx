import React, { useEffect, useRef, useState } from 'react'

import { WhiteSkyBtn } from '../../../common/Button/Button'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import {
  FilterContianer,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  RowWrap,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'

import Hidden from '../../../components/TableInner/Hidden'
import { useShipmentListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import {
  DestinationSearch,
  CustomerSearch,
  DateSearchSelect,
  SpartSelect,
  StorageSelect,
  ProductNumberListSearch,
} from '../../../components/Search'
import { GlobalFilterHeader, GlobalFilterFooter } from '../../../components/Filter'
import GlobalFilterContainer from '../../../components/Filter/GlobalFilterContainer'
import Table from '../../Table/Table'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { useAtom } from 'jotai/index'
import { add_element_field } from '../../../lib/tableHelpers'
import { formatWeight } from '../../../utils/utils'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'

const initData = {
  pageNum: 1,
  pageSize: 10,
  shipmentStatus: '출하 대기',
  storage: '',
  spart: '',
  customerCode: '',
  customerName: '',
  destinationCode: '',
  destinationName: '',
  orderStartDate: '',
  orderEndDate: '',
  productNumberList: '',
}

const Register = ({}) => {
  const [param, setParam] = useState(initData)
  const { data, refetch } = useShipmentListQuery(param)
  const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation()

  // Table
  const tableField = useRef(ShippingRegisterFieldsCols)
  const getCol = tableField.current
  const [getRow, setGetRow] = useState('')
  const selectedUids = useAtom(selectedRowsAtom)[0]

  // param change
  const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  // reset event
  const onReset = async () => {
    await setParam(initData)
    await refetch()
  }

  // array total value calculate
  const calculateTotalFormattedWeight = (key) =>
    formatWeight(data?.list?.map((item) => item[key]).reduce((acc, cur) => acc + cur, 0))

  // 출하 지시
  const onRegister = () => {
    if (!selectedUids) {
      return window.alert('제품을 선택해주세요.')
    }
    const uids = selectedUids.map((item) => item['주문 고유 번호'])
    const shipmentStatus = '출하 지시'

    if (window.confirm('출하 지시 등록하시겠습니까?')) {
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
      <GlobalFilterHeader title={'출하지시 등록'} />
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
            <RowWrap style={{ borderBottom: '0px' }}>
              <DateSearchSelect
                title={'주문 일자'}
                startInitDate={param.orderStartDate}
                endInitDate={param.orderEndDate}
                startDateChange={(value) => onChange('orderStartDate', value)}
                endDateChange={(value) => onChange('orderEndDate', value)}
              />
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

      <TableWrap>
        <ClaimTable>
          <ClaimRow>
            <ClaimTitle>제품 중량(kg)</ClaimTitle>
            <ClaimContent>{formatWeight(data?.pagination?.totalWeight)}</ClaimContent>
            <ClaimTitle>제품 공급가액</ClaimTitle>
            <ClaimContent>{calculateTotalFormattedWeight('orderPrice')}</ClaimContent>
            <ClaimTitle>운반비 공급가액</ClaimTitle>
            <ClaimContent>{calculateTotalFormattedWeight('freightCost')}</ClaimContent>
          </ClaimRow>
        </ClaimTable>
      </TableWrap>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{selectedUids?.length ?? 0}</span> / {data?.pagination?.listCount}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown
              handleDropdown={(e) => setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))}
            />
            <Excel getRow={getRow} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span>{selectedUids?.length ?? 0}</span>kg / 총 중량 {data?.pagination?.totalWeight} kg
          </div>
          <div style={{ display: 'flex' }}>
            <WhiteSkyBtn onClick={onRegister}>출하 지시</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table
          getCol={getCol}
          getRow={getRow}
          tablePagination={data?.pagination}
          onPageChange={(value) => onChange('pageNum', value)}
        />
      </TableContianer>
    </FilterContianer>
  )
}

export default Register
