import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import { GreyBtn, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'
import {
  DoubleWrap,
  FilterContianer,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PartWrap,
  PWRight,
  RowWrap,
  TableContianer,
  TCSubContainer,
  CustomInput,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { StandardDispatchDetailAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import { add_element_field } from '../../../lib/tableHelpers'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { useShipmentDispatchListQuery } from '../../../api/shipment'
import { DateSearchSelect, RadioSearchButton } from '../../../components/Search'

const initData = {
  pageNum: 1,
  pageSize: 10,
  shipmentStatus: '출하 지시',
  storage: '',
  customerCode: '',
  customerName: '',
  destinationCode: '',
  destinationName: '',
  orderStartDate: '',
  orderEndDate: '',
  shippingStartDate: '',
  shippingEndDate: '',
  spart: '',
  productNumberList: '',
}

const DisRegisterStorage = ({}) => {
  // 배차/출고등록  -
  const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)

  // Table
  const tableField = useRef(ShippingRegisterFieldsCols)
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
      setGetRow(add_element_field(getData, ShippingRegisterFields))
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
              <PartWrap>
                <h6 style={{ width: '130px' }}>출고 요청 일자</h6>
                <GridWrap>
                  <DateGrid bgColor={'white'} fontSize={17} />
                </GridWrap>
              </PartWrap>
              <DateSearchSelect
                title={'주문 일자'}
                startInitDate={param.orderStartDate}
                endInitDate={param.orderEndDate}
                startDateChange={(value) => onChange('orderStartDate', value)}
                endDateChange={(value) => onChange('orderEndDate', value)}
              />
            </RowWrap>

            <RowWrap>
              <PartWrap>
                <h6 style={{ width: '130px' }}>창고 구분</h6>
                <PWRight>
                  <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                </PWRight>
              </PartWrap>
              <PartWrap>
                <h6 style={{ width: '80px' }}>상태</h6>
                <MainSelect />
              </PartWrap>
              <RadioSearchButton
                title={'합짐 여부'}
                options={[
                  { label: 'Y', value: true },
                  { label: 'N', value: false },
                ]}
                value={'Y'}
                onChange={(value) => onChange('isMerge', value)}
              />
            </RowWrap>
            <RowWrap>
              <PartWrap>
                <h6 style={{ width: '130px' }}>목적지</h6>
                <CustomInput width={160} height={36} />
                <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                  찾기
                </GreyBtn>
              </PartWrap>
              <RadioSearchButton
                title={'배차출고 여부'}
                options={[
                  { label: 'Y', value: true },
                  { label: 'N', value: false },
                ]}
                value={'Y'}
                onChange={(value) => onChange('isDispatch', value)}
              />
            </RowWrap>
            <RowWrap none>
              <PartWrap>
                <h6>고객사 명/고객사코드</h6>
                <Input />
                <Input />
                <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                  찾기
                </GreyBtn>
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
        <Test3 />
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

export default DisRegisterStorage

const TableWrap = styled.div`
  margin: 30px auto;
`
