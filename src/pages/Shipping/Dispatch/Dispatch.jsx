import React, { useEffect, useRef, useState } from 'react'
import { BlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { btnCellUidAtom, selectedRowsAtom, StandardDispatchEditAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import {
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterSubcontianer,
  Input,
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import { MainSelect } from '../../../common/Option/Main'
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import DispatchPost from '../../../modal/Multi/DispatchPost'
import { StandardDispatchPostAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { add_element_field } from '../../../lib/tableHelpers'
import { useDriverListQuery, useDriverRemoveMutation } from '../../../api/driver'
import { getStorageList } from '../../../api/search'
import useReactQuery from '../../../hooks/useReactQuery'
import StorageSelect from '../../../components/Search/StorageSelect'

const Dispatch = ({}) => {
  const [uidAtom, _] = useAtom(btnCellUidAtom)
  const [isModalPost, setIsModalPost] = useAtom(StandardDispatchPostAtom)
  const [isModalEdit, setIsModalEdit] = useAtom(StandardDispatchEditAtom)
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(ShippingDispatchFieldsCols)
  const getCol = tableField.current
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const [isRotated, setIsRotated] = useState(false)

  const [param, setParam] = useState({
    pageNum: 1,
    pageSize: 50,
    driverName: '',
    carNumber: '',
    carType: '',
    storage: '',
  })

  // GET
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
  const { refetch, data, isSuccess } = useDriverListQuery(param)
  const { mutate: onDelete } = useDriverRemoveMutation()

  /**
   * param set 이벤트
   */
  const onParamHandle = (e) => {
    const { name, value } = e.target
    setParam((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * 초기화 이벤트
   */
  const handleImageClick = async () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
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
      <FilterHeader>
        <h1>배차기사 관리</h1>
      </FilterHeader>
      <FilterSubcontianer>
        <FilterLeft>
          <RowWrap>
            <PartWrap>
              <h6>기사명</h6>
              <PWRight style={{ width: '160px' }}>
                <Input name="driverName" value={param.driverName} onChange={onParamHandle} />
              </PWRight>
            </PartWrap>
            <PartWrap>
              <h6>차량번호</h6>
              <PWRight style={{ width: '160px' }}>
                <Input name="carNumber" value={param.carNumber} onChange={onParamHandle} />
              </PWRight>
            </PartWrap>
            <PartWrap>
              <h6>차량종류</h6>
              <PWRight style={{ width: '160px' }}>
                <Input name="carType" value={param.carType} onChange={onParamHandle} />
              </PWRight>
            </PartWrap>
            <PartWrap>
              <h6>창고구분</h6>
              <PWRight style={{ width: '160px' }}>
                <StorageSelect
                  value={param.storage}
                  onChange={(e) => setParam((prev) => ({ ...prev, storage: e.label }))}
                />
              </PWRight>
            </PartWrap>
          </RowWrap>
        </FilterLeft>
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
          <BlackBtn width={100} height={40} onClick={refetch}>
            검색
          </BlackBtn>
        </div>
      </FilterFooter>

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
