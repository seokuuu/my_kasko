import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { add_element_field } from '../../lib/tableHelpers'
import { BlueBarHeader, WhiteCloseBtn } from '../../modal/Common/Common.Styled'
import PageDropdown from '../../components/TableInner/PageDropdown'
import Excel from '../../components/TableInner/Excel'
import { TableContianer, TCSubContainer } from '../../modal/External/ExternalFilter'
import Table from '../Table/Table'
import {
  btnCellRenderAtom, btnCellUidAtom, onClickCheckAtom, pageSort, selectedRowsAtom,
} from '../../store/Layout/Layout'
import { proNoFieldCols, proNoFieldManage } from '../../constants/admin/ProNoOrder'
import useReactQuery from '../../hooks/useReactQuery'
import { getProNoList } from '../../api/orderList'
import { KilogramSum } from '../../utils/KilogramSum'
import { useAtomValue } from 'jotai/index'

export const Container = styled.div`
    max-width: 80%;
    max-height: 700px;
    margin: auto;
    position: absolute;
    top: 43%;
    width: 100%;
    left: 55%;
    transform: translate(-50%, -50%);
`

function ProNoPage({ title, proNoNumber }) {
  const checkBoxSelect = useAtomValue(selectedRowsAtom)
  const [onClickCheck, setOnClickCheck] = useAtom(onClickCheckAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const paramData = {
    pageNum: 1, pageSize: 5, productNoNumber: proNoNumber,
  }
  const [param, setParam] = useState(paramData)
  const [proNoPagination, setProNoPagination] = useState([])
  const [proNoListData, setProNoListData] = useState(null)
  const formatTableRowData = (proNoField) => {
    return add_element_field(proNoField, proNoFieldManage)
  }
  const { data: proNoRes, isSuccess } = useReactQuery(param, 'getProNoList', getProNoList)
  useEffect(() => {
    if (proNoRes && proNoRes.data && proNoRes.data.list) {
      setProNoListData(formatTableRowData(proNoRes.data.list))
      setProNoPagination(proNoRes.data.pagination)
    }
  }, [proNoRes, isSuccess])
  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam, pageNum: Number(value),
    }))
  }
  const [sortNum, setSortNum] = useAtom(pageSort)
  const handleDropdown = (e) => {
    setSortNum(e.target.value)
  }
  const totalWeight = proNoRes?.data.pagination.totalWeight
  const formattedTotalWeight = totalWeight && totalWeight.toLocaleString()
  const modalClose = () => {
    if (onClickCheck) {
      setBtnCellModal(false)
      setOnClickCheck(false)
    }
  }

  // 뒤에 배경 안움직이게
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (<OutSide>
    <Container>
      <BlueBarHeader>
        <div>{title}</div>
        <div>
          <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
        </div>
      </BlueBarHeader>

      <TableContianer>
        <div
          style={{
            border: '1px solid #BFBFBF', height: '40px', display: 'flex', alignItems: 'center',
          }}
        >
          <div style={{ padding: '0px 32px', display: 'flex', gap: '29px' }}>
            <span style={{ fontSize: '15px' }}>Pro.no</span>
            <span style={{ fontSize: '15px', color: '#4C83D6' }}>{proNoNumber}</span>
          </div>
        </div>

        <div
          style={{
            border: '1px solid #BFBFBF', marginTop: '8px', padding: '24px 40px', alignItems: 'center',
          }}
        >
          <TCSubContainer bor>
            <div>조회 목록 (선택 0 / 12개)</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown handleDropdown={handleDropdown} />
              <Excel />
            </div>
          </TCSubContainer>
          <TCSubContainer bor>
            <div>
              선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 {formattedTotalWeight}kg
            </div>
          </TCSubContainer>
          <Table
            getCol={proNoFieldCols}
            getRow={proNoListData}
            tablePagination={proNoPagination}
            onPageChange={onPageChange} />
        </div>
      </TableContianer>
    </Container>
  </OutSide>)
}

export default ProNoPage

export const OutSide = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
`
