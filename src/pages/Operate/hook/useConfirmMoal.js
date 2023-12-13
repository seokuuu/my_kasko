import { useAtom } from 'jotai'
import { popupAtom, popupObject, popupTypeAtom } from '../../../store/Layout/Layout'

/**
 * @description
 * 확인창 모달 관련 훅
 * @returns
 */
const useConfirmMoal = () => {
  // 팝업 객체 초깃값(저장 뒤 초기화 해주기위해)
  const initPopupObjectValue = {
    num: '', // num 값에 따라 초기 팝업 설정
    title: '',
    content: '',
    type: '', // type 값에 따라 버튼 구조 설정
    next: '',
    onClick: () => {},
    func: () => {},
    func2: () => {},
  }

  // 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom)
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체

  function initConfirmModal() {
    setNowPopup(initPopupObjectValue)
    setNowPopupType('')
    setPopupSwitch(false)
  }
  return { popupSwitch, setPopupSwitch, nowPopupType, setNowPopupType, nowPopup, setNowPopup, initConfirmModal }
}

export default useConfirmMoal
