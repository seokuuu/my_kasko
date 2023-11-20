import React, { useState } from 'react'
import {
  BlueBarHeader,
  BlueBlackBtn,
  BlueBtnWrap,
  BlueHalfDiv,
  BlueInput,
  BlueMainDiv,
  BlueOneDiv,
  BlueSubContainer,
  BlueSubDiv,
  FadeOverlay,
  ModalContainer,
  ResultCell,
  ResultContainer,
  ResultHead,
  ResultRow,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

import { useAtom } from 'jotai'
import { blueModalAtom } from '../../store/Layout/Layout'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'
import { BlueRadioWrap } from '../Common/Common.Styled'

import { GreyBtn } from '../../common/Button/Button'
import { CheckBox } from '../../common/Check/Checkbox'
import { TxtInput } from '../../common/Input/Input'

import { BlackBtn } from '../../common/Button/Button'
import { CustomSelect } from '../../common/Option/Main'
import { storageOptions } from '../../common/Option/SignUp'

import { BMDTitle } from './CustomerFind'

import useReactQuery from '../../hooks/useReactQuery'
import { getCustomerFind } from '../../service/admin/Auction'

const DispatchDetail = ({ setIsPostModal }) => {
  const matchData = { name: '고객명', code: '고객사 코드', businessNumber: '사업자번호' }
  const [isModal, setIsModal] = useAtom(blueModalAtom)
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState([])
  const [clickedResult, setClickedResult] = useState()
  const [selectedUid, setSelectedUid] = useState(null)

  const modalClose = () => {
    setIsPostModal(false)
  }

  const { isLoading, isError, data, isSuccess } = useReactQuery('', 'getCustomerFind', getCustomerFind)

  const customerGetData = data?.data?.data

  const handleSearch = () => {
    const filteredResult = customerGetData?.filter((item) => {
      const searchTermsLowerCase = searchTerm.toLowerCase()
      return (
        item.code.toLowerCase().includes(searchTermsLowerCase) ||
        item.name.toLowerCase().includes(searchTermsLowerCase) ||
        item.businessNumber.toLowerCase().includes(searchTermsLowerCase)
      )
    })

    // 검색어가 없을 때는 모든 데이터를 보여줌
    if (!searchTerm) {
      setResult('')
    } else {
      // 검색 로직을 수행하고 결과를 상태에 업데이트
      setResult(filteredResult || [])
    }
  }

  const handleCellClick = (uid, name, code, businessNumber) => {
    console.log('클릭한 셀 데이터:', { uid, name, code, businessNumber })
    setClickedResult({ uid, name, code, businessNumber })
    setSelectedUid(uid) // 클릭한 셀의 uid를 저장
  }

  const radioDummy = ['검색 ', '직접 입력']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  return (
    // 출고 관리 - 배차/출고 등록
    <>
      <FadeOverlay />
      <ModalContainer width={530}>
        <BlueBarHeader>
          <div>배차 기사 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv style={{ display: 'block', height: '80px' }}>
                <h6>등록 방식</h6>
                <BlueRadioWrap style={{ gap: '100px', padding: '25px 0px' }}>
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
            </BlueMainDiv>
            {checkRadio[1] ? (
              <>
                <BlueMainDiv style={{ border: 'none' }}>
                  <BlueOneDiv bor>
                    <h6>창고</h6>
                    <CustomSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </BlueOneDiv>
                  <BlueHalfDiv>
                    <div>
                      <h6>기사 명</h6>
                      <BlueInput placeholder="홍길동" />
                    </div>
                    <div>
                      <h6>연락처</h6>
                      <BlueInput placeholder="'-'제외한 숫자 입력" />
                    </div>
                  </BlueHalfDiv>
                  <BlueHalfDiv>
                    <div>
                      <h6>차량 번호</h6>
                      <div style={{ display: 'block', height: '100px' }}>
                        <BlueInput placeholder="예) 123가5678" />
                        <BlackBtn style={{ marginTop: '5px' }} fontSize={17} width={100} height={40}>
                          중복 확인{' '}
                        </BlackBtn>
                      </div>
                    </div>
                    <div>
                      <h6>차량 종류</h6>
                      <BlueInput placeholder="예) 카고 트럭" />
                    </div>
                  </BlueHalfDiv>

                  <BlueOneDiv>
                    <h6>비고</h6>
                    <BlueInput placeholder="내용을 입력해 주세요." style={{ width: '100%' }} />
                  </BlueOneDiv>
                </BlueMainDiv>
              </>
            ) : (
              <>
                <BlueMainDiv style={{ fontSize: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BMDTitle style={{ width: '90px' }}>검색</BMDTitle>
                    <TxtInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <GreyBtn height={40} width={15} margin={5} onClick={handleSearch}>
                      찾기
                    </GreyBtn>
                  </div>
                </BlueMainDiv>
                <BlueMainDiv style={{ padding: '0px' }}>
                  <ResultContainer>
                    <ResultHead>
                      <ResultCell wid={50}>선택</ResultCell>
                      <ResultCell>{matchData.name}</ResultCell>
                      <ResultCell>{matchData.code}</ResultCell>
                      <ResultCell wid={130}>{matchData.businessNumber}</ResultCell>
                    </ResultHead>
                    {result &&
                      result.map((item, index) => (
                        <ResultRow
                          key={item.uid}
                          onClick={() => handleCellClick(item.uid, item.name, item.code, item.businessNumber)}
                        >
                          <ResultCell wid={50}>
                            <RadioMainDiv key={index}>
                              <RadioCircleDiv
                                isChecked={item.uid === selectedUid}
                                onClick={(event) => {
                                  event.stopPropagation() // 상위 요소의 onClick 이벤트 막기
                                  handleCellClick(item.uid, item.name, item.code, item.businessNumber) // 셀 클릭 이벤트 처리
                                }}
                              >
                                <RadioInnerCircleDiv />
                              </RadioCircleDiv>
                            </RadioMainDiv>
                          </ResultCell>
                          <ResultCell>{item.name}</ResultCell>
                          <ResultCell>{item.code}</ResultCell>
                          <ResultCell wid={130}>{item.businessNumber}</ResultCell>
                        </ResultRow>
                      ))}
                  </ResultContainer>
                </BlueMainDiv>
              </>
            )}
          </div>

          <BlueBtnWrap>
            <BlueBlackBtn>등록</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DispatchDetail
