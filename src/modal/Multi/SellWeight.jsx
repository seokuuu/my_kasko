import React from 'react'
import styled from 'styled-components'
import { BlueBarHeader, WhiteCloseBtn } from '../Common/Common.Styled'
import { useAtom } from 'jotai'
import { weightAtom, weightObj } from '../../store/Layout/Layout'
import useReactQuery from '../../hooks/useReactQuery'
import { FilterTCTop, TCSubContainer, TableBottomWrap, TableContianer } from '../External/ExternalFilter'
import Table from '../../pages/Table/Table'
import { BlackBtn } from '../../common/Button/Button'
import { getDetailStocks } from '../../api/stocks/Inventory'
function SellWeight() {
  const [weightModal, setWeightModal] = useAtom(weightAtom)
  const [selectObj, setSelectObj] = useAtom(weightObj)
  const {
    data: TableData,
    isLoading,
    isSuccess,
  } = useReactQuery(selectObj['제품 고유 번호'], 'getInventroyStockDetail', getDetailStocks)
  // 모달 닫기
  const modalClose = () => {
    setWeightModal(false)
  }

  return (
    <OutSide>
      <Container>
        <BlueBarHeader>
          <div>중량 판매 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <TableContianer>
          <div style={{ margin: '10px' }}>&nbsp;</div>
          <FilterTCTop>
            <h6>중량 판매 대상 제품</h6>
            <p>FA0000001</p>
          </FilterTCTop>
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Table hei={100} />
            <p style={{ color: 'red' }}>*절단은 한번에 두번까지 제한 ex{')'} 한번 절단한 제품 재절단 x</p>
          </div>

          <div style={{ display: 'flex', width: '100%', margin: '16px auto' }}>
            <BlueCircleBtn>+</BlueCircleBtn>
          </div>
          <div style={{ height: '200px' }}>
            <TCSubContainer>
              <div>
                중량 판매 (<span>2</span> /4 ){/* <Hidden /> */}
              </div>
            </TCSubContainer>
            <Table hei={100} />
          </div>
          <TableBottomWrap>
            <BlackBtn width={30} height={40}>
              저장
            </BlackBtn>
          </TableBottomWrap>
        </TableContianer>
      </Container>
    </OutSide>
  )
}

export default SellWeight
export const Container = styled.div`
  max-width: 40%;
  max-height: 700px;
  margin: auto;
  position: absolute;
  top: 43%;
  width: 100%;
  left: 55%;
  transform: translate(-50%, -50%);
  background: #fff;
  overflow-y: scroll;
`

export const OutSide = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`
export const BlueCircleBtn = styled.button`
  background-color: #4c83d6;
  color: white;
  width: 40px;
  height: 40px;
  font-size: 30px;
  border-radius: 50%;
  margin: auto;
`
