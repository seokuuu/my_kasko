import {
  ModalContainer,
  ModalSubContainer,
  FadeOverlay,
  BlueBarHeader,
  BlueSubContainer,
  WhiteCloseBtn,
  BSCSWrap,
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { GreyBtn } from '../../common/Button/Button'
import RoundAucProAdd from '../../pages/Auction/Round/RoundAucProAdd'

const DefaultBlueBar = ({ title, setAddModal }) => {
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
          <RoundAucProAdd />
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DefaultBlueBar
