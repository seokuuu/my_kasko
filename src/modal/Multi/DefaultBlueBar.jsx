import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'

import { useAtom } from 'jotai'
import RoundAucProAdd from '../../pages/Auction/Round/RoundAucProAdd'
import { blueModalAtom } from '../../store/Layout/Layout'

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
          <div>제목</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <div>컴포넌트 여기에 넣기</div>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DefaultBlueBar
