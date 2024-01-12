import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  NonFadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
  BlueSubContainer,
  BlueBarHeader,
  BlueMainDiv,
  BlueSubDiv,
  BlueRadioWrap,
  BlueInput,
  BlueBlackBtn,
  BlueBtnWrap,
} from '../Common/Common.Styled'

import { BlackBtn } from '../../common/Button/Button'

import { blueModalAtom, packageCreateAtom, packageCreateObjAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'
import { useNavigate } from 'react-router-dom'
import { CheckBox } from '../../common/Check/Checkbox'
import { useLocation, Link } from 'react-router-dom'

const PackageManageFind = ({ isCreate, url }) => {
  const [isModal, setIsModal] = useAtom(packageCreateAtom)
  const { pathname } = useLocation()
  const modalClose = () => {
    setIsModal(false)
  }
  // useEffect(() => {

  // }, [pathname])
  const radioDummy = ['경매', '상시']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [checkRadioValue, setCheckRadioValue] = useState(Array.from({ length: radioDummy.length }, () => ''))

  const [packageName, setPackageName] = useState('')
  const [packageObj, setPackageObj] = useAtom(packageCreateObjAtom)

  useEffect(() => {
    const update = radioDummy.map((value, idx) => {
      return checkRadio[idx] ? value : ''
    })
    const filteredCheck = update.filter((item) => item !== '')
    setCheckRadioValue(filteredCheck)
  }, [checkRadio])

  const handleChange = (e) => {
    setPackageName(e.currentTarget.value)
  }
  const navigate = useNavigate()
  useEffect(() => {
    setPackageObj({
      packageNumber: '',
      sellType: checkRadioValue.join(''),
      packageName: packageName,
    })
  }, [packageName, checkRadioValue])

  return (
    // 판매 제품 관리 - 패키지 관리
    <>
      <NonFadeOverlay />
      <ModalContainer width={400}>
        <BlueBarHeader>
          <div>패키지 생성</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              {!isCreate && (
                <BlueSubDiv style={{ height: '80px' }}>
                  <h6>패키지 번호</h6>
                  <BlueInput disabled />
                </BlueSubDiv>
              )}

              <BlueSubDiv style={{ height: '80px' }} bor={!isCreate ? true : false}>
                <h6>판매 유형</h6>
                <BlueRadioWrap style={{ gap: '50px' }}>
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
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>패키지 명 지정</h6>
                <BlueInput placeholder="패키지 명을 입력하세요." onChange={handleChange} />
              </BlueSubDiv>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn
              onClick={() => {
                navigate(url)
                setIsModal(false)
              }}
            >
              <p style={{ color: 'white' }}>생성</p>
            </BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default PackageManageFind
