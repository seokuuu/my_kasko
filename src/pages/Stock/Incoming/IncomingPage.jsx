import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Incoming from './Incoming'

import { useState } from 'react'
import { styled } from 'styled-components'
import { RightBarLeft, RightBarRight, RightBarWrap } from '../../../components/Right/Right.Styled'

import { rightOneAtom, rightTwoAtom, rightThreeAtom, rightFourAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { rightArray } from '../../../store/Layout/Layout'

const IncomingPage = () => {
  const [expanded, setExpanded] = useState('재고 관리')
  const [depth2Color, setDepth2Color] = useState('입고 관리')

  const [imageStates, setImageStates] = useAtom(rightArray)
  const [isRightBarRotated, setRightBarRotation] = useState(false)

  const handleImageClick = (index) => {
    const newImageStates = imageStates.map((state, i) => (i === index ? true : false))
    setImageStates(newImageStates)
  }
  const handleRightBarClick = () => {
    setRightBarRotation(!isRightBarRotated)
  }

  console.log('isRightBarRotated =>', isRightBarRotated)

  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Incoming />
          </OverAllTable>
          <RightBarWrap>
            <RightBarLeft isRightBarRotated={isRightBarRotated}>
              {/* 이미지들을 매핑하여 렌더링 */}
              {imageStates.map((isClicked, index) => (
                <img
                  key={index}
                  src={`/img/right_${index + 1}_${isClicked ? 'on' : 'off'}.png`}
                  alt=""
                  onClick={() => handleImageClick(index)}
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
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default IncomingPage
