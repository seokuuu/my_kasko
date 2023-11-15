import React, { useEffect, useState } from 'react'
import { BlackBtn } from '../../common/Button/Button'
import Test3 from '../../pages/Test/Test3'
import { toggleAtom } from '../../store/Layout/Layout'

import {
  FilterContianer,
  TableContianer,
  TCSubContainer,
  FilterTopContainer,
  FilterTCTop,
} from '../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import { aucProAddModalAtom } from '../../store/Layout/Layout'

import styled from 'styled-components'
import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'

const WeightSales = ({}) => {
  // const [isModal, setIsModal] = useAtom()

  const modalClose = () => {
    setAddModal(false)
  }

  const titleData = ['패키지 명', '수량', '시작가']
  const contentData = ['알뜰패키지', '50', '3598']
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']

  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkSales.map((value, index) => {
      return check1[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData1(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check1])

  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '50%', height: '93%' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>중량 판매 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '30px 10px 20px 10px' }}>
          <FilterContianer>
            <TableContianer style={{ padding: '0px' }}>
              <FilterTCTop style={{ border: 'none', paddingLeft: '15px', marginTop: '10px', fontSize: '17px' }}>
                <h6 style={{ fontSize: '17px' }}>중량 판매 대상 제품</h6>
                <p>2023041050</p>
              </FilterTCTop>
              <Test3 hei2={330} hei={100} />
            </TableContianer>
          </FilterContianer>
          <FilterContianer style={{ color: '#B02525', paddingLeft: '20px', paddingTop: '5px' }}>
            * 절단은 한번에 두번까지 제한 ex) 한번 절단한 제품 재절단 x{' '}
          </FilterContianer>
          <PowerMiddle style={{ paddingTop: '15px' }}>
            <img src="/img/circle_add.png" style={{ cursor: 'pointer' }} />
          </PowerMiddle>
          <TableContianer style={{ padding: '0px' }}>
            <Test3 hei2={200} hei={100} />
          </TableContianer>

          {/* 나중 해당 테이블에서 바꾸기 */}
        </BlueSubContainer>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <BlackBtn width={13} height={40}>
            변경
          </BlackBtn>
        </div>
      </ModalContainer>
    </>
  )
}

export default WeightSales

const TCSDiv = styled.div`
  padding: 15px 0px;
  font-weight: 700;
`

const PowerMiddle = styled.div`
  display: flex;
  justify-content: center;
`
