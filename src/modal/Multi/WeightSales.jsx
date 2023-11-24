import React, { useEffect, useState } from 'react'
import { BlackBtn, WhiteRedBtn } from '../../common/Button/Button'
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
// 중량 판매 등록
// !!! 보류 !!!
const WeightSales = ({}) => {
  // const [isModal, setIsModal] = useAtom()

  const modalClose = () => {
    setAddModal(false)
  }

  const titleData = ['패키지 명', '수량', '시작가']
  const contentData = ['알뜰패키지', '50', '3598']
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']

  const [rows, setRows] = useState([])
  const [checkedRows, setCheckedRows] = useState([])
  const tableTitle = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd']

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

  const handleImageClick = () => {
    if (rows.length === 0) {
      setRows([
        ...rows,
        { id: rows.length, content: Array(tableTitle.length).fill('') },
        { id: rows.length + 1, content: Array(tableTitle.length).fill('') },
      ])
    } else if (rows.length < 4) {
      setRows([...rows, { id: rows.length, content: Array(tableTitle.length).fill('') }])
    } else {
      alert('4개 이하로만 추가가 가능합니다.')
    }
  }

  const handleCheck = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id))
    } else {
      setCheckedRows([...checkedRows, id])
    }
  }

  const handleDelete = () => {
    setRows(rows.filter((row) => !checkedRows.includes(row.id)))
    setCheckedRows([])
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
          {/* <PowerMiddle style={{ paddingTop: '15px' }}>
            <img src="/img/circle_add.png" style={{ cursor: 'pointer' }} />
          </PowerMiddle>
          <TableContianer style={{ padding: '0px' }}>
            <Test3 hei2={200} hei={100} />
          </TableContianer> */}

          <PowerMiddle onClick={handleImageClick}>
            <img src="/img/circle_add.png" alt="add row" />
          </PowerMiddle>
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeaderCell>
                    <Checkbox
                      type="checkbox"
                      checked={checkedRows.length === rows.length}
                      onChange={() =>
                        checkedRows.length === rows.length
                          ? setCheckedRows([])
                          : setCheckedRows(rows.map((row) => row.id))
                      }
                    />
                  </TableHeaderCell>
                  {tableTitle.map((title, index) => (
                    <TableHeaderCell key={index}>{title}</TableHeaderCell>
                  ))}
                </TableRow>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        type="checkbox"
                        checked={checkedRows.includes(row.id)}
                        onChange={() => handleCheck(row.id)}
                      />
                    </TableCell>
                    {row.content.map((content, index) => (
                      <TableCell key={index}>{content}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <WhiteRedBtn width={15} fontSize={17} onClick={handleDelete}>
              선택 목록 제거
            </WhiteRedBtn>
          </div>

          {/* 나중 해당 테이블에서 바꾸기 */}
        </BlueSubContainer>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <BlackBtn width={13} height={40} fontSize={17}>
            저장
          </BlackBtn>
        </div>
      </ModalContainer>
    </>
  )
}

export default WeightSales

const TableContainer = styled.div`
  max-width: 900px;
  overflow-x: scroll;
`

const TCSDiv = styled.div`
  padding: 15px 0px;
  font-weight: 700;
`

const PowerMiddle = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`
const TableRow = styled.tr`
  width: 100px;
`

const TableHeaderCell = styled.th`
  text-align: center;
  border: 1px solid #000;
  width: 100px;
`

const TableCell = styled.td`
  text-align: center;
  border: 1px solid #000;
  width: 100px;
`

const Table = styled.table`
  min-width: 900px;
  border-collapse: collapse;
`
const Checkbox = styled.input`
  margin-right: 10px;
`

const DeleteButton = styled.button`
  padding: 10px;
  margin-top: 10px;
`
