import React, { useState } from 'react'
import AlertPopup from '../Alert/AlertPopup'
import { useAtom } from 'jotai'
import { popupObject } from '../../store/Layout/Layout'

const TestPopup = () => {
  const [popupSwitch, setPopupSwitch] = useState(false)
  const [, setNowPopup] = useAtom(popupObject) // Jotai를 사용하여 상태 관리

  // 팝업을 열 때 초기 상태 설정
  const openPopup = () => {
    setNowPopup({
      num: '1-팝업',
      title: '팝업 제목',
      content: '팝업 내용',
      next: '2-팝업',
    })
    setPopupSwitch(true)
  }

  return (
    <div>
      <button onClick={openPopup}>팝업 열기</button>
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </div>
  )
}

export default TestPopup
