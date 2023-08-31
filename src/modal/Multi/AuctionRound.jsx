import React from 'react'
import { useState, useEffect } from 'react'
import {
  NonFadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
  BlueSubContainer,
  BlueBarHeader,
  BlueMainDiv,
  BlueSubDiv,
  BlueDateDiv,
} from '../Common/Common.Styled'

import { styled } from 'styled-components'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { BlueRadioWrap } from '../Common/Common.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'
import DateGrid from '../../components/DateGrid/DateGrid'

import { ExCheckWrap, ExCheckDiv } from '../External/ExternalFilter'
import { StyledCheckSubSquDiv, CheckImg2 } from '../../common/Check/CheckImg'

const AuctionRound = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['정기 경매', '추가 경매']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  const checkDummy = ['오전 경매 (9:00AM - 10:00AM)', '오후 경매 (13:30PM - 14:00PM)']
  const [check1, setCheck1] = useState(Array.from({ length: checkDummy.length }, () => false))

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkDummy.map((value, index) => {
      return check1[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheck1(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check1])

  console.log('checkRadio =>', checkRadio)

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <NonFadeOverlay />
      <ModalContainer width={850}>
        <BlueBarHeader>
          <div>경매 회차 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv style={{ height: '50px' }}>
                <BlueRadioWrap>
                  {radioDummy.map((text, index) => (
                    <RadioMainDiv key={index}>
                      <RadioCircleDiv
                        isChecked={checkRadio[index]}
                        onClick={() => {
                          setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                        }}
                      >
                        <RadioInnerCircleDiv />
                      </RadioCircleDiv>
                      <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                    </RadioMainDiv>
                  ))}
                </BlueRadioWrap>
              </BlueSubDiv>
              {checkRadio[1] ? (
                <BlueSubDiv style={{ height: '80px' }} bor>
                  <h6>경매 일정</h6>
                  <BlueDateDiv>
                    <DateGrid fontSize={16} />
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <TimeInput placeholder="0시" /> <TimeInput placeholder="0분" /> ~ <TimeInput placeholder="0시" />{' '}
                      <TimeInput placeholder="0분" />
                    </div>
                  </BlueDateDiv>
                </BlueSubDiv>
              ) : (
                <>
                  <BlueSubDiv style={{ height: '80px' }} bor>
                    <h6>반복 기간 설정</h6>
                    <BlueDateDiv>
                      <DateGrid fontSize={16} /> <p>~</p> <DateGrid fontSize={16} />
                    </BlueDateDiv>
                  </BlueSubDiv>
                  <BlueSubDiv style={{ height: '80px' }} bor>
                    <h6>시간대 선택</h6>
                    <div>
                      {' '}
                      <ExCheckWrap style={{ margin: '0px' }}>
                        {checkDummy.map((x, index) => (
                          <ExCheckDiv>
                            <StyledCheckSubSquDiv
                              onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                              isChecked={check1[index]}
                            >
                              <CheckImg2 src="/svg/check.svg" />
                            </StyledCheckSubSquDiv>
                            <p>{x}</p>
                          </ExCheckDiv>
                        ))}
                      </ExCheckWrap>
                    </div>
                  </BlueSubDiv>
                </>
              )}

              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>경매 번호</h6>
                <div>
                  <input
                    style={{ borderBottom: '1px solid black', fontSize: '16px', padding: '5px' }}
                    placeholder="경매 번호 자동 생성"
                  />
                </div>
              </BlueSubDiv>
            </BlueMainDiv>
          </div>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default AuctionRound

const TimeInput = styled.input`
  width: 50px;
  height: 35px;
  border-radius: 3px;
  border: 1px solid #c8c8c8;
  font-size: 16px;
`