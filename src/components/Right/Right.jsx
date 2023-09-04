import { useState } from 'react'
import { useAtom } from 'jotai'
import { rightArray, rightSwitch } from '../../store/Layout/Layout'
import { RightBarWrap, RightBarLeft, RightBarRight } from './Right.Styled'

const Right = () => {
  const [imageStates, setImageStates] = useAtom(rightArray)
  const [isRightBarRotated, setRightBarRotation] = useAtom(rightSwitch)

  const handleOpenNewTab = (url, title, w, h) => {
    const currentUrl = window.location.href
    const left = window.innerWidth / 2 - w / 2
    const top = window.innerHeight / 2 - h / 2
    const width = Math.floor(window.innerWidth * 0.95)
    const height = Math.floor(window.innerWidth * 0.95)

    // 팝업 창을 엽니다.
    const popup = window.open(
      currentUrl,
      'kasko',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`,
    )

    if (!popup) {
      alert('팝업 창이 차단되었습니다. 팝업 창을 허용해주세요.')
    }
  }

  const handleImageClick = (index) => {
    const newImageStates = imageStates.map((state, i) => (i === index ? true : false))
    setImageStates(newImageStates)
  }
  const handleRightBarClick = () => {
    setRightBarRotation(!isRightBarRotated)
  }
  return (
    <RightBarWrap>
      <RightBarLeft isRightBarRotated={isRightBarRotated}>
        {/* 이미지들을 매핑하여 렌더링 */}
        {imageStates.map((isClicked, index) => (
          <img
            key={index}
            src={`/img/right_${index + 1}_${isClicked ? 'on' : 'off'}.png`}
            alt=""
            onClick={() => {
              // 이미지가 3번째인 경우 handleImage3Click 함수를 호출합니다.
              if (index === 3) {
                handleOpenNewTab()
              } else {
                handleImageClick(index)
              }
            }}
          />
        ))}
      </RightBarLeft>
      <RightBarRight isRightBarRotated={isRightBarRotated}>
        {!isRightBarRotated ? (
          <img src="/img/right_controller.png" alt="" onClick={handleRightBarClick} />
        ) : (
          <img src="/img/right_controller_off.png" alt="" onClick={handleRightBarClick} />
        )}
      </RightBarRight>
    </RightBarWrap>
  )
}

export default Right
