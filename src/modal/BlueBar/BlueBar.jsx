import {
  ModalContainer,
  ModalSubContainer,
  NonFadeOverlay,
  BlueBarHeader,
  BlueSubContainer,
  WhiteCloseBtn,
  BSCSWrap,
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { GreyBtn } from '../../common/Button/Button'
import RoundAucListEdit from '../../pages/Auction/Round/RoundAucListEdit'

const BlueBar = ({ title }) => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  return (
    <>
      <NonFadeOverlay />
      <ModalContainer width={1500}>
        <BlueBarHeader>
          {/* <div>{title}</div> */}
          <div>경매 제품 추가(단일)</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          {/* {title === '규격 약호 찾기' && (
            <BSCSWrap>
              <div>검색</div>
              <input placeholder="회사 명" />
              <GreyBtn width={15} height={30}>
                찾기
              </GreyBtn>
            </BSCSWrap>
          )} */}
          <RoundAucListEdit />
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default BlueBar
