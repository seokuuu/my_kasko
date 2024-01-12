import React, { useState } from 'react'
import styled from 'styled-components'
import { useUserDestinationQuery } from '../../api/user'
import { BlackBtn, WhiteBlackBtn } from '../../common/Button/Button'
import { userDestinationField, userDestinationFieldsCols } from '../../constants/user/order'
import useTableData from '../../hooks/useTableData'
import { CustomInput, FilterContianer, TCSubContainer, TableContianer } from '../../modal/External/ExternalFilter'
import Table from '../../pages/Table/Table'
import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'

/**
 * 목적지 변경 모달
 * @param {*} param.value 현재 선택 값
 * @param {*} param.onSubmit 선택값 적용 핸들러 
 * @todo
 * - 목적지 목록 > 어떤 테이블 컴포넌트 사용할 것인지 확인(선텍 데이터 때문에 중첩 문제 발생)
 */
const DestinationChange = ({ customerName, customerCode, value, onSubmit }) => {
  const [popupOn, setPopupOn] = useState(false);
  const [destination, setDestination] = useState(null);
  const { data: destinationData, isLoading, isSuccess } = useUserDestinationQuery();
  const { tableRowData } = useTableData({ tableField: userDestinationField, serverData:{ list: destinationData}});

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <CustomInput readOnly placeholder="h50" width={60} />
      <CustomInput readOnly placeholder="목적지명" width={120} />
      {/* 도착지 연락처에 바인딩할 데이터 불분명 */}
      {/* <CustomInput readOnly placeholder="도착지 연락처" width={120} /> */}
      <WhiteBlackBtn onClick={v => {setPopupOn(true)}}>찾기</WhiteBlackBtn>
      {
        popupOn &&
        <>
          <FadeOverlay />
          <ModalContainer style={{ width: '75%', height: '73%' }}>
            <BlueBarHeader style={{ height: '60px' }}>
              <div>목적지 변경</div>
              <div>
                <WhiteCloseBtn onClick={() => {setPopupOn(false)}} src="/svg/white_btn_close.svg" />
              </div>
            </BlueBarHeader>
            <BlueSubContainer style={{ padding: '60px 50px 20px 50px' }}>
              <FilterContianer>
                <TableContianer>
                  <TCSubContainer bor style={{ justifyContent: 'normal', gap: '20px' }}>
                    <div>고객사 : {customerName}</div>
                    <div>고객 코드 : {customerCode}</div>
                  </TCSubContainer>
                  <TCSubContainer>
                    <TCSDiv>고객사 목적지 목록</TCSDiv>
                  </TCSubContainer>
                  <Table getRow={tableRowData} getCol={userDestinationFieldsCols} />
                </TableContianer>
              </FilterContianer>
            </BlueSubContainer>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <BlackBtn width={13} height={40} onClick={handleSubmit}>
                변경
              </BlackBtn>
            </div>
          </ModalContainer>
        </>
          }
    </>
  )
}

export default DestinationChange

const TCSDiv = styled.div`
  padding: 15px 0px;
  font-weight: 700;
`
