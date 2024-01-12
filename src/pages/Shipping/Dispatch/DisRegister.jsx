import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
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
import Hidden from '../../../components/TableInner/Hidden'
import { StandardDispatchDetailAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import { useShipmentDispatchListQuery } from '../../../api/shipment'
import { add_element_field } from '../../../lib/tableHelpers'
import {
  CustomerSearch,
  DateSearchSelect,
  DestinationSearch,
  ProductNumberListSearch,
  RadioSearchButton,
  SpartSelect,
  StorageSelect,
} from '../../../components/Search'
import Table from '../../Table/Table'

const initData = {
  pageNum: 1,
  pageSize: 10,
  shipmentStatus: '출하 지시',
  storage: '',
  customerCode: '',
  customerName: '',
  destinationCode: '',
  destinationName: '',
  shipmentRequestStartDate: '',
  shipmentRequestEndDate: '',
  dockStatus: '',
  mergeStatus: '',
  driverStatus: '',
  spart: '',
  productNumberList: '',
}

const DisRegister = ({}) => {
  // 배차/출고등록  -
  const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)

  // Table
  const tableField = useRef(ShippingDispatchFieldsCols)
  const getCol = tableField.current
  const [getRow, setGetRow] = useState('')
  const [rowChecked, setRowChecked] = useAtom(selectedRowsAtom)

  // data fetch
  const [param, setParam] = useState(initData)
  const { data, refetch } = useShipmentDispatchListQuery(param)

  // param change
  const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  // reset event
  const onReset = async () => {
    await setParam(initData)
    await refetch()
  }

  useEffect(() => {
    const getData = data?.list
    if (getData && Array.isArray(getData)) {
      setGetRow(add_element_field(getData, ShippingDispatchFields))
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [param.pageNum, param.pageSize])

  return (
    <FilterContianer>
      <GlobalFilterHeader title={'배차/출고 등록'} />

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
                title={'출고 요청 일자'}
                startInitDate={param.shipmentRequestStartDate}
                endInitDate={param.shipmentRequestEndDate}
                startDateChange={(value) => onChange('shipmentRequestStartDate', value)}
                endDateChange={(value) => onChange('shipmentRequestEndDate', value)}
              />
              <SpartSelect value={param.spart} onChange={(e) => onChange('spart', e.label)} />
            </RowWrap>
            <RowWrap none>
              <RadioSearchButton
                title={'배차출고 여부'}
                options={[
                  { label: '전체', value: '' },
                  { label: 'Y', value: true },
                  { label: 'N', value: false },
                ]}
                value={param.driverStatus}
                onChange={(value) => onChange('driverStatus', value)}
              />
              <RadioSearchButton
                title={'상차도 여부'}
                options={[
                  { label: '전체', value: '' },
                  { label: 'Y', value: true },
                  { label: 'N', value: false },
                ]}
                value={param.dockStatus1}
                onChange={(value) => onChange('dockStatus', value)}
              />
              <RadioSearchButton
                title={'합짐 여부'}
                options={[
                  { label: '전체', value: '' },
                  { label: 'Y', value: true },
                  { label: 'N', value: false },
                ]}
                value={param.mergeStatus}
                onChange={(value) => onChange('mergeStatus', value)}
              />
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
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>배차 취소</WhiteRedBtn>
            <WhiteSkyBtn
              onClick={() => {
                setIsPostModal(true)
              }}
            >
              배차 등록
            </WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table
          getCol={getCol}
          getRow={getRow}
          tablePagination={data?.pagination}
          onPageChange={(value) => onChange('pageNum', value)}
          setChoiceComponent={() => {}}
        />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn>수취서 출력</WhiteBlackBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
      {isPostModal && <DispatchDetail setIsPostModal={setIsPostModal} />}
    </FilterContianer>
  )
}

export default DisRegister

const TableWrap = styled.div`
  margin: 30px auto;
`
