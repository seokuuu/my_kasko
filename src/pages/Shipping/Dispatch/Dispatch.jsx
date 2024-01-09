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
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import DispatchPost from '../../../modal/Multi/DispatchPost'
import { StandardDispatchPostAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { add_element_field } from '../../../lib/tableHelpers'
import { useDriverListQuery, useDriverRemoveMutation } from '../../../api/driver'
import { GlobalFilterHeader, GlobalFilterFooter } from '../../../components/Filter'
import { InputSearch, StorageSelect } from '../../../components/Search'

const Dispatch = ({}) => {
  const uidAtom = useAtomValue(btnCellUidAtom)
  const exFilterToggle = useAtomValue(toggleAtom)
  const [isModalPost, setIsModalPost] = useAtom(StandardDispatchPostAtom)
  const [isModalEdit, setIsModalEdit] = useAtom(StandardDispatchEditAtom)
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(ShippingDispatchFieldsCols)
  const getCol = tableField.current
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const [param, setParam] = useState({
    pageNum: 1,
    pageSize: 50,
    driverName: '',
    carNumber: '',
    carType: '',
    storage: '',
  })

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
    await setParam((prev) => ({ ...prev, driverName: '', carNumber: '', carType: '', storage: null }))
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
      setGetRow(add_element_field(getData, ShippingDispatchFields))
    }
  }, [isSuccess, data])

  return (
    <FilterContianer>
      <GlobalFilterHeader title={'배차기사 관리'} />
      {exFilterToggle && (
        <>
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
          <GlobalFilterFooter reset={onReset} onSearchSubmit={refetch} />
        </>
      )}

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{data?.pagination?.listCount ?? 0}</span> / {param?.pageSize}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown
              handleDropdown={(e) => setParam((prev) => ({ ...prev, pageSize: parseInt(e.target.value) }))}
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
        <Table getCol={getCol} getRow={getRow} />
      </TableContianer>
      {isModalPost && <DispatchPost setIsModalPost={setIsModalPost} id={null} />}
      {isModalEdit && <DispatchPost setIsModalPost={setIsModalEdit} id={uidAtom} />}
    </FilterContianer>
  )
}

export default Dispatch
