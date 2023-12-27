import React from 'react'
import { useState, useEffect } from 'react'
import {
  FadeOverlay,
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
import moment from 'moment'

const AuctionRound = ({ setRoundModal, types }) => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setRoundModal(false)
  }

  const init = {
    saleType: types,
    auctionType: '',
    insertStartDate: '',
    insertEndDate: '',
    timeList: [],
  }

  const [input, setInput] = useState(init)

  const [dates, setDates] = useState({
    insertStartDate: '',
    insertEndDate: '',
    addedDate: '',
  })

  const dateHandler = (date, name) => {
    setDates((p) => ({ ...p, [name]: date }))
  }

  //라디오
  const radioDummy = ['정기 경매', '추가 경매']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  console.log('checkRadio', checkRadio)

  //체크
  const checkDummy = ['오전 경매', '오후 경매']
  const [check1, setCheck1] = useState(Array.from({ length: checkDummy.length }, () => false))

  //체크 useEffect
  useEffect(() => {
    const selectedTimeList = []

    if (check1[0]) {
      selectedTimeList.push('오전')
    }

    if (check1[1]) {
      selectedTimeList.push('오후')
    }

    const selectedAuctionType = radioDummy.find((_, index) => checkRadio[index])
    const formattedAuctionType = selectedAuctionType.replace(/\s/g, '')

    setInput({
      ...input,
      timeList: selectedTimeList,
      auctionType: formattedAuctionType,
    })
  }, [check1, checkRadio])

  useEffect(() => {
    setInput((p) => ({
      ...p,
      insertStartDate: dates.insertStartDate && moment(dates.insertStartDate).format('YYYY-MM-DD'),
      insertEndDate: dates.insertStartDate && moment(dates.insertEndDate).format('YYYY-MM-DD'),
    }))
  }, [dates])

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <FadeOverlay />
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
                        <RadioInnerCircleDiv isChecked={checkRadio[index]} />
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
                    <DateGrid
                      startDate={dates.addedDate}
                      setStartDate={(date) => dateHandler(date, 'addedDate')}
                      fontSize={16}
                    />
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
                      <DateGrid
                        startDate={dates.insertStartDate}
                        setStartDate={(date) => dateHandler(date, 'insertStartDate')}
                        fontSize={16}
                      />
                      <p>~</p>{' '}
                      <DateGrid
                        startDate={dates.insertEndDate}
                        setStartDate={(date) => dateHandler(date, 'insertEndDate')}
                        fontSize={16}
                      />
                    </BlueDateDiv>
                  </BlueSubDiv>
                  <BlueSubDiv style={{ height: '80px' }} bor>
                    <h6>시간대 선택</h6>
                    <div>
                      <ExCheckWrap style={{ margin: '0px' }}>
                        {checkDummy.map((x, index) => (
                          <ExCheckDiv>
                            <StyledCheckSubSquDiv
                              onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                              isChecked={check1[index]}
                            >
                              <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
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
