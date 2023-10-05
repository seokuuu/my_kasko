import React, { useState } from 'react'
import { popupDummy } from './PopupDummy'
import { popupObject } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { popupTypeAtom } from '../../store/Layout/Layout'

const PopupTest = () => {
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  // 처음 팝업 띄우는 컴포넌트의 onClickHandler
  const firstPopupClick = (num) => {
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup(firstPopup)
  }

  // 팝업 그 자체 컴포넌트의 확인 버튼 onClickHandler
  const showNextPopup = () => {
    if (nowPopup && nowPopup.next) {
      firstPopupClick(nowPopup.next)
    }
  }

  // 팝업 타입 최신화
  useEffect(() => {
    const firstType = nowPopup.num.split('-')[0]
    setNowPopupType(firstType)
  }, [nowPopup])

  console.log('nowPopup', nowPopup)
  console.log('nowPopupType', nowPopupType)

  return (
    <div>
      <button onClick={() => firstPopupClick('2-1')}>A 버튼</button>
      <button onClick={showNextPopup}>B 버튼</button>

      {nowPopup && (
        <div>
          <h3>{nowPopup.title}</h3>
          <p>{nowPopup.content}</p>
        </div>
      )}
    </div>
  )
}

export default PopupTest
