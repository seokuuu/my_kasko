import React, { useEffect, useRef, useState } from 'react'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { btnCellUidAtom, selectedRowsAtom, StandardDispatchEditAtom, toggleAtom } from '../../../store/Layout/Layout'
import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import {
  FilterContianer,
  FilterLeft,
  FilterSubcontianer,
  RowWrap,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import { DispatchFields, DispatchFieldsCols } from '../../../constants/admin/Shipping'
import DispatchPost from '../../../modal/Multi/DispatchPost'
import { StandardDispatchPostAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { add_element_field } from '../../../lib/tableHelpers'
import { useDriverListQuery, useDriverRemoveMutation } from '../../../api/driver'
import { GlobalFilterHeader, GlobalFilterFooter, GlobalFilterContainer } from '../../../components/Filter'
import { InputSearch, StorageSelect } from '../../../components/Search'

const paramData = {
  pageNum: 1,
  pageSize: 3,
  driverName: '',
  carNumber: '',
  carType: '',
  storage: '',
}

const Dispatch = ({}) => {
  const uidAtom = useAtomValue(btnCellUidAtom)
  const [isModalPost, setIsModalPost] = useAtom(StandardDispatchPostAtom)
  const [isModalEdit, setIsModalEdit] = useAtom(StandardDispatchEditAtom)
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(DispatchFieldsCols)
  const getCol = tableField.current
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const [param, setParam] = useState(paramData)

  const { refetch, data, isSuccess } = useDriverListQuery(param)
  const { mutate: onDelete } = useDriverRemoveMutation()

  /**
   * param set 이벤트
   */
  const onParamHandle = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  /**
   * 초기화 이벤트
   */
  const onReset = async () => {
    await setParam(paramData)
    await refetch()
  }

  const handleDeleteEvent = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const deleteUIds = checkedArray.map((item) => item['고유 번호'])
      await onDelete(deleteUIds)
      await refetch()
    }
  }

  useEffect(() => {
    const getData = data?.list

    if (!isSuccess && !getData) {
      return
    }

    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, DispatchFields))
    }
  }, [isSuccess, data])

  useEffect(() => {
    refetch()
  }, [param.pageNum, param.pageSize])

  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }

  return (
    <FilterContianer>
      {/* header */}
      <GlobalFilterHeader title={'배차기사 관리'} />
      {/* container */}
      <GlobalFilterContainer>
        <FilterSubcontianer>
          <FilterLeft>
            <RowWrap>
              <InputSearch
                title={'기사명'}
                value={param.driverName}
                onChange={(value) => onParamHandle('driverName', value)}
              />
              <InputSearch
                title={'차량번호'}
                value={param.carNumber}
                onChange={(value) => onParamHandle('carNumber', value)}
              />
              <InputSearch
                title={'차량종류'}
                value={param.carType}
                onChange={(value) => onParamHandle('carType', value)}
              />
              <StorageSelect
                value={param.storage}
                onChange={(e) => setParam((prev) => ({ ...prev, storage: e.label }))}
              />
            </RowWrap>
          </FilterLeft>
        </FilterSubcontianer>
      </GlobalFilterContainer>
      {/* footer */}
      <GlobalFilterFooter reset={onReset} onSearch={refetch} />

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{data?.pagination?.listCount ?? 0}</span> / {param?.pageSize}개 )
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
          <div>{/*선택 중량<span> 2 </span>kg / 총 중량 kg*/}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleDeleteEvent}>선택 삭제</WhiteRedBtn>
            <WhiteSkyBtn onClick={() => setIsModalPost(true)}>추가 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} tablePagination={data?.pagination} onPageChange={onPageChange} />
      </TableContianer>
      {isModalPost && <DispatchPost setIsModalPost={setIsModalPost} id={null} />}
      {isModalEdit && <DispatchPost setIsModalPost={setIsModalEdit} id={uidAtom} />}
    </FilterContianer>
  )
}

export default Dispatch
