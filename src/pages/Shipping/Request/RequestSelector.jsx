import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import { FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import Hidden from '../../../components/TableInner/Hidden'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import Table from '../../Table/Table'
import { useShipmentMergeMutation } from '../../../api/shipment'
import { RadioSearchButton } from '../../../components/Search'

const RequestSelector = ({ getRow, removeSelector }) => {
  const { mutate: onCreateMerge } = useShipmentMergeMutation()
  const [dockStatus, setDockStatus] = useState(false) // 상차도 여부

  // Table
  const tableField = useRef(ShippingRegisterFieldsCols)
  const getCol = tableField.current

  // 선별 등록
  const onRegister = () => {
    const list = getRow
    if (!list) {
      return window.alert('선별 목록에 제품을 추가해주세요.')
    }
    const orderUids = list.map((item) => item['주문 고유 번호'])
    const dockStatus = 0

    if (window.confirm('선별 등록하시겠습니까?')) {
      onCreateMerge({ dockStatus, orderUids })
    }
  }

  console.log(dockStatus)

  return (
    <>
      <FilterHeader>
        <h1>선별 등록</h1>
      </FilterHeader>
      <TableWrap style={{ marginTop: '5px' }}>
        <ClaimTable>
          <ClaimRow>
            <ClaimTitle>목적지 1</ClaimTitle>
            <ClaimContent>부산 광역시</ClaimContent>
            <ClaimTitle>목적지 2</ClaimTitle>
            <ClaimContent>천안시</ClaimContent>
            <ClaimTitle>목적지 3</ClaimTitle>
            <ClaimContent>-</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle>매출운임비</ClaimTitle>
            <ClaimContent>154,585,000</ClaimContent>
            <ClaimTitle>매입운임비</ClaimTitle>
            <ClaimContent>456,485,200</ClaimContent>
            <ClaimTitle>합짐비</ClaimTitle>
            <ClaimContent>63,000</ClaimContent>
          </ClaimRow>
        </ClaimTable>
      </TableWrap>

      <Wrap>
        <SpaceDiv>
          <RadioSearchButton
            title={'입찰 방식'}
            options={[
              { label: '독차', value: '독차' },
              { label: '합짐', value: '합짐' },
            ]}
            value={dockStatus}
          />
        </SpaceDiv>
        <SpaceDiv>
          <RadioSearchButton
            title={'상차도 여부'}
            options={[
              { label: 'Y', value: true },
              { label: 'N', value: false },
            ]}
            value={dockStatus}
            onChange={(value) => setDockStatus(value)}
          />
        </SpaceDiv>
      </Wrap>

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
            <WhiteRedBtn onClick={removeSelector}>목록 제거</WhiteRedBtn>
            <WhiteSkyBtn onClick={onRegister}>선별 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} />
      </TableContianer>
    </>
  )
}

export default RequestSelector

const Wrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
`

const SpaceDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > h6 {
    font-size: 16px;
    color: #6b6b6b;
    margin-right: 10px;
  }
`
