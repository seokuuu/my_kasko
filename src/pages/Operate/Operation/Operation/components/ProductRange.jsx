import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import {
  useProductRangeDetailsQuery,
  useProductRangeListQuery,
  useProductRangeRegisterMutation,
  useProductRangeRemoveMutation,
  useProductRangeUpdateMutation,
} from '../../../../../api/operate/productRange'
import { ProductRangeFieldCols, ProductRangeFields } from '../../../../../constants/admin/ProductRange'
import { add_element_field } from '../../../../../lib/tableHelpers'
import { TableContianer } from '../../../../../modal/External/ExternalFilter'
import AddProduct from '../../../../../modal/Operate/AddProduct'
import {
  doubleClickedRowAtom,
  operateAddAtom,
  popupAtom,
  popupObject,
  popupTypeAtom,
  selectedRowsAtom,
} from '../../../../../store/Layout/Layout'
import Table from '../../../../Table/Table'
import CommonTableHeader from '../../../UI/CommonTableHeader'
import { commonListSearchInitValue } from '../../../constants'
import usePaging from '../../../hook/usePaging'

/**
 * @description
 * 제품군 관리
 */
const ProductRange = () => {
  // 제품군명(등록/수정)
  const [spart, setSpart] = useState('')

  // 서버 옵션(요청 변수)
  const [search, setSearch] = useState(commonListSearchInitValue)
  // 목록 리스트
  const [rows, setRows] = useState([])
  // 셀 클릭시 테이블 상세 데이터 조회
  const [detailRow, setDetailsRow] = useAtom(doubleClickedRowAtom)

  // 상세 ID
  const [detailsId, setDetailsId] = useState(0)

  // 제품군 관리 목록 API
  const { data, refetch } = useProductRangeListQuery(search)

  // 제품군 상세 API

  const { data: detailsData } = useProductRangeDetailsQuery(detailsId)

  // 제품군 등록 API
  const { mutate: register } = useProductRangeRegisterMutation()

  // 제품군 수정 API
  const { mutate: update } = useProductRangeUpdateMutation()
  // 제품군 삭제 API
  const { mutate: remove } = useProductRangeRemoveMutation()

  // 모달
  const [modal, setModal] = useAtom(operateAddAtom)
  // 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom)
  const setNowPopupType = useSetAtom(popupTypeAtom) // 팝업 타입
  const setNowPopup = useSetAtom(popupObject) // 팝업 객체
  // 테이블에서 선택된 값
  const selected = useAtomValue(selectedRowsAtom)
  // 선택된 데이터 갯수
  const selectedLength = useMemo(() => (selected ? selected.length : 0), [selected])

  /**
   * @constant
   * @description
   * 테이블 목록 데이터입니다.
   * 날짜 포멧과 순번 데이터 생성을 위해 기존 데이터를 원하는 방식으로 맵핑합니다.
   */
  const mappingData = useMemo(
    () =>
      data
        ? data.list.map((d, index) => ({
            ...d,
            id: data.list.length - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
            uid: d.uid,
          }))
        : [],
    [data],
  )

  // 테이블 데이터 리스트 값 설정
  useEffect(() => {
    if (mappingData) {
      setRows(add_element_field(mappingData, ProductRangeFields))
    }
  }, [mappingData])

  // 등록
  function productRegister() {
    register({ spart })
    setSpart('')
    setModal(false)
  }

  // 수정
  function productUpdate() {
    update({ uid: detailsData.uid, spart })
    setSpart('')
    setModal(false)
    setDetailsId(0)
  }

  // 삭제 핸들러
  function removeEventHandler() {
    if (!selectedLength && selectedLength === 0) return alert('삭제할 목록을 선택해주세요.')
    setPopupSwitch(true)
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '삭제하시겠습니까?',
      next: '1-14',
      func() {
        if (selected && selected.length !== 0) {
          remove(selected.map((s) => s['고유값']))
          refetch()
        }
      },
    })
  }

  // 상세 데이터값 조회 및 모달 창 오픈
  useEffect(() => {
    if (detailRow && detailRow['고유값']) {
      setDetailsId(detailRow['고유값'])
      setDetailsRow([])
      setModal(true)
    }
  }, [detailRow])

  const { pagination, onPageChanage } = usePaging(data, setSearch)

  return (
    <TableContianer>
      <CommonTableHeader
        title={detailsData ? '제품군 수정' : '제품군 추가'}
        selectedLength={selectedLength}
        totalLength={data ? data.list.length : 0}
        toRegister={() => setModal(true)}
        removeEventHandler={removeEventHandler}
      />
      <Table
        getCol={ProductRangeFieldCols}
        getRow={rows}
        setChoiceComponent={() => {}}
        tablePagination={pagination}
        onPageChange={onPageChanage}
      />
      {modal && (
        <AddProduct
          initValue={detailsData ? detailsData.spart : ''}
          title={'제품군 추가'}
          contentTitle={'제품군 입력'}
          deliveryHandler={(v) => setSpart(v)}
          register={detailsId ? productUpdate : productRegister}
          // 등록과 수정을 구분하기 위해 => 초기화 해주지 않으면 등록을 눌렀을 때, detailsId 값으로 인해 수정이 되는 경우가 있을 수 있습니다.
          closeHandler={() => setDetailsId(0)}
        />
      )}
    </TableContianer>
  )
}

export default ProductRange
