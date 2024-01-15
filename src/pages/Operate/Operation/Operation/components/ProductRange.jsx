import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useMemo } from 'react'
import { ProductRangeFieldCols } from '../../../../../constants/admin/ProductRange'
import { TableContianer } from '../../../../../modal/External/ExternalFilter'
import AddProduct from '../../../../../modal/Operate/AddProduct'
import {
  operateAddAtom,
  popupAtom,
  popupObject,
  popupTypeAtom,
  selectedRowsAtom,
} from '../../../../../store/Layout/Layout'
import Table from '../../../../Table/Table'
import CommonTableHeader from '../../../UI/CommonTableHeader'
import useProductRange from '../../../hook/useProductRange'
import useProductRangeList from '../../../hook/useProductRangeList'

/**
 * @description
 * 제품군 관리
 */
const ProductRange = () => {
  // 목록 관련 데이터 훅입니다.
  const { mappingData, rows, refetch, isLoading, setSearch, pagination, onPageChanage } = useProductRangeList()
  // 수정,등록,삭제,상세 관련 데이터 훅입니다.
  const { remove, removeData, detailsData, onSpartChange, initUid, onDetermineFunction } = useProductRange()
  // 모달
  const [modal, setModal] = useAtom(operateAddAtom)
  // 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom)
  const setNowPopupType = useSetAtom(popupTypeAtom) // 팝업 타입 2(확인 취소 버튼이 있는 모달)
  const setNowPopup = useSetAtom(popupObject) // 팝업 객체
  // 테이블에서 선택된 값
  const selected = useAtomValue(selectedRowsAtom)
  // 선택된 데이터 갯수
  const selectedLength = useMemo(() => (selected ? selected.length : 0), [selected])

  // 삭제 핸들러
  function removeEventHandler() {
    if (!selectedLength && selectedLength === 0) return alert('삭제할 목록을 선택해주세요.')
    console.log('removeData :', removeData)
    /**
     * @description
     * 모달 관련 섦명
     * setNowPopup에 넘겨주는 객체의 num의 첫번째 숫자 관련한 모달이 나타납니다.
     * 확인을 누를시 ( 2번의 경우),next값이 있는 경우, fun 함수가 실행되고 next 값의 첫번째 숫자에 대한 모달이 나타납니다.
     * 취소를 누를시 ,모달이 닫힙니다.
     * @todo
     * 확인을 누를시, 분기처리
     * removeData 값 여부에 따라 어떤 모달 넘버를 넘겨줄지에 대한 분기 처리
     *
     *
     */

    setPopupSwitch(true)
    // setNowPopupType(2)
    setNowPopup({
      num: '2-1', // 모달 번호
      title: '삭제하시겠습니까?',
      next: '1-14', // 다음으로 나타날 모달 번호
      func() {
        if (selected && selected.length !== 0) {
          remove(selected.map((s) => s['고유값']))
          refetch()
        }
      },
    })
  }

  // 삭제할 데이터 중 사용중인 제품군이 있다면 예외 모달을 띄워줍니다.
  useEffect(() => {
    if (removeData && removeData.data.data.length > 0) {
      alert('삭제할 수 없습니다.\n해당 항목은 현재 사용 중입니다.')
    }
  }, [removeData])

  return (
    <TableContianer>
      <CommonTableHeader
        title={detailsData ? '제품군 수정' : '제품군 추가'}
        selectedLength={selectedLength}
        totalLength={mappingData ? mappingData.length : 0}
        toRegister={() => setModal(true)}
        removeEventHandler={removeEventHandler}
        setState={setSearch}
      />
      <Table
        getCol={ProductRangeFieldCols}
        getRow={rows}
        setChoiceComponent={() => {}}
        tablePagination={pagination}
        onPageChange={onPageChanage}
        noRowsMessage="제품군 목록이 비어있습니다."
        loading={isLoading}
      />
      {modal && (
        <AddProduct
          initValue={detailsData ? detailsData.spart : ''}
          title={'제품군 추가'}
          contentTitle={'제품군 입력'}
          deliveryHandler={onSpartChange}
          register={onDetermineFunction}
          // 등록과 수정을 구분하기 위해 => 초기화 해주지 않으면 등록을 눌렀을 때, detailsId 값으로 인해 수정이 되는 경우가 있을 수 있습니다.
          closeHandler={initUid}
        />
      )}
    </TableContianer>
  )
}

export default ProductRange
