import React, { useRef, useState, useEffect } from 'react'
import TableModal from '../../../modal/Table/TableModal'
import useReactQuery from '../../../hooks/useReactQuery'
import { gethyunDaiOriginal } from '../../../api/SellProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { singleDispatchFields } from '../../../constants/admin/Single'
function HyunDaiOriginal(props) {
  const [getRow, setGetRow] = useState('')
  const ref = useRef(null)
  const { data: original, isSuccess } = useReactQuery('', 'original', gethyunDaiOriginal)
  const [filterData, setFilteredData] = useState([])
  useEffect(() => {
    if (original === undefined) {
      original && setFilteredData(original)
    }

    if (!isSuccess && !filterData) return null
    if (Array.isArray(filterData)) {
      setGetRow(add_element_field(filterData, singleDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filterData])
  return (
    <div>
      {' '}
      <TableModal
        title="원본고비"
        // setBtnCellModal,
        propsHandler={() => {}}
        // modalInTable=
        getRow
        uidAtom
        onEditHandler
        editTitle
        convertKey
        startDate
        // setStartDate
      />
    </div>
  )
}

export default HyunDaiOriginal
