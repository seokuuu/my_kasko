import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'

import { useAtom } from 'jotai'
import RoundAucProAdd from '../../pages/Auction/Round/RoundAucProAdd'
import { blueModalAtom } from '../../store/Layout/Layout'
import PackDetail from '../../pages/Auction/Bidding/PackDetail'

const TableGrid = ({ title, setAddModal }) => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setAddModal(false)
  }

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '98vh' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>경매 제품 추가(단일)</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <PackDetail />
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default TableGrid
