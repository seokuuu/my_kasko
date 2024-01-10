import React, { Fragment, useState } from 'react'

import { BlackBtn, GreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

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
import { useShipmentListQuery } from '../../../api/shipment'
import {
  DestinationSearch,
  CustomerSearch,
  DateSearchSelect,
  SpartSelect,
  StorageSelect,
  ProductNumberListSearch,
} from '../../../components/Search'
import { GlobalFilterHeader, GlobalFilterFooter } from '../../../components/Filter'
import { useAtomValue } from 'jotai'
import GlobalFilterContainer from '../../../components/Filter/GlobalFilterContainer'

const initData = {
  pageNum: 1,
  pageSize: 50,
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

  // search change
  const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  // reset event
  const onReset = async () => {
    await setParam(initData)
    await refetch()
  }

  const titleData = ['제품 중량(kg)', '제품 공급가액', '운반비 공급가액']
  const contentData = ['986,742', '986,742', '986,742']

  console.log(param)
  console.log(data)

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
                startDateChange={(value) => onChange('startDate', value)}
                endDateChange={(value) => onChange('endDate', value)}
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
          {[0].map((index) => (
            <ClaimRow key={index}>
              {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                <Fragment agmentkey={title}>
                  <ClaimTitle>{title}</ClaimTitle>
                  <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                </Fragment>
              ))}
            </ClaimRow>
          ))}
        </ClaimTable>
      </TableWrap>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / {2}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>출하 취소</WhiteRedBtn>
            <WhiteSkyBtn>출하 지시</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        {/*<Test3 />*/}
      </TableContianer>
    </FilterContianer>
  )
}

export default Register
