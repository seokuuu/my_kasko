import React, { useEffect, useRef, useState } from 'react'
import { BlackBtn, GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'
import {
  DoubleWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import {
  BlueBarBtnWrap,
  BlueBarHeader,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { useShipmentListQuery } from '../../../api/shipment'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterContainer, GlobalFilterFooter } from '../../../components/Filter'
import {
  CustomerSearch,
  DateSearchSelect,
  DestinationSearch,
  ProductNumberListSearch,
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
  shippingStartDate: '',
  shippingEndDate: '',
  productNumberList: '',
}

// 합짐 추가 등록 메인 컴포넌트
const RequestAddModal = ({ list, onListAdd }) => {
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
  // Table
  const tableField = useRef(ShippingRegisterFieldsCols)
  const getCol = tableField.current
  const [getRow, setGetRow] = useState('')
  const [rowChecked, setRowChecked] = useAtom(selectedRowsAtom)

  // data fetch
  const [param, setParam] = useState(initData)
  const { data, refetch } = useShipmentListQuery(param)

  // param change
  const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  // reset event
  const onReset = async () => {
    await setParam(initData)
    await refetch()
  }

  // 제품 추가
  const onAdd = () => {
    const key = '주문 고유 번호'
    const findKey = rowChecked.map((item) => item[key])
    const addData = data?.list?.filter((item) => findKey.includes(item.orderUid))

    onListAdd(addData)
  }

  const modalClose = () => setAddModal(false)

  useEffect(() => {
    // 이미 추가된 데이터 중복 제거
    const getData = data?.list?.filter((obj) => !list.some((item) => obj.orderUid === item.orderUid))
    if (getData && Array.isArray(getData)) {
      setGetRow(add_element_field(getData, ShippingRegisterFields))
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [param.pageNum, param.pageSize])

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '85vh' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>합짐 추가 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <FilterContianer style={{ paddingBottom: '0px' }}>
            <FilterHeader style={{ height: '30px' }}></FilterHeader>

            <GlobalFilterContainer>
              <FilterSubcontianer style={{ paddingBottom: '10px' }}>
                <FilterLeft>
                  <RowWrap modal>
                    <DateSearchSelect
                      title={'출하 지시 일자'}
                      startInitDate={param.shippingStartDate}
                      endInitDate={param.shippingEndDate}
                      startDateChange={(value) => onChange('shippingStartDate', value)}
                      endDateChange={(value) => onChange('shippingEndDate', value)}
                    />
                    <DestinationSearch
                      name={param.destinationName}
                      code={param.destinationCode}
                      setName={(value) => onChange('destinationName', value)}
                      setCode={(value) => onChange('destinationCode', value)}
                    />
                  </RowWrap>
                  <RowWrap modal none>
                    <StorageSelect value={param.storage} onChange={(e) => onChange('storage', e.label)} />
                    <CustomerSearch
                      name={param.customerName}
                      code={param.customerCode}
                      setName={(value) => onChange('customerName', value)}
                      setCode={(value) => onChange('customerCode', value)}
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
                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '10px' }}>
                  <PageDropdown
                    handleDropdown={(e) =>
                      setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </TCSubContainer>
              <Table
                hei2={350}
                hei={100}
                getCol={getCol}
                getRow={getRow}
                tablePagination={data?.pagination}
                onPageChange={(value) => onChange('pageNum', value)}
              />
            </TableContianer>
          </FilterContianer>
        </BlueSubContainer>
        <BlueBarBtnWrap style={{ padding: '10px' }}>
          <BlackBtn fontSize={17} width={10} height={35} onClick={onAdd}>
            선택 추가
          </BlackBtn>
        </BlueBarBtnWrap>
      </ModalContainer>
    </>
  )
}

export default RequestAddModal
