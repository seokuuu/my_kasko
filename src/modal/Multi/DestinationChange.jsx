import React, { useEffect, useState } from 'react'
import { BlackBtn } from '../../common/Button/Button'
import Test3 from '../../pages/Test/Test3'
import { toggleAtom } from '../../store/Layout/Layout'

import { FilterContianer, TableContianer, TCSubContainer } from '../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import { aucProAddModalAtom } from '../../store/Layout/Layout'

import styled from 'styled-components'
import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'

const DestinationChange = ({}) => {
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
      <ModalContainer style={{ width: '75%', height: '73%' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>목적지 변경</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '60px 50px 20px 50px' }}>
          <FilterContianer>
            <TableContianer>
              <TCSubContainer bor style={{ justifyContent: 'normal', gap: '20px' }}>
                <div>고객사 : (주) 아이덴잇</div>
                <div>고객 코드 : 001</div>
              </TCSubContainer>
              <TCSubContainer>
                <TCSDiv>고객사 목적지 목록</TCSDiv>
              </TCSubContainer>
              <Test3 hei2={350} hei={100} />
            </TableContianer>
          </FilterContianer>
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

export default DestinationChange

const TCSDiv = styled.div`
  padding: 15px 0px;
  font-weight: 700;
`
