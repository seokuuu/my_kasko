import React, { useEffect, useState } from 'react'
import { FilterHeaderAlert } from '../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../store/Layout/Layout'

import { FilterContianer, TableContianer } from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import styled from 'styled-components'
import {
  BlueBarHeader,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'

// 패키지 상세보기 (경매)
const Invoice = ({}) => {
  const dummy = [
    {
      uid: 37,
      startDate: '2023-10-17 12:18:00',
      customerName: '아이덴잇',
      productNumber: 'FC53665304',
      productName: 'PCJ',
      productSpec: 'E32-TM',
      productWdh: '30 X 2,051 X 3,000',
      weight: '1449.000',
      orderPrice: 1885149.0,
      orderPriceVat: 188514.9,
      freightCost: 0.0,
      freightCostVat: 0.0,
      totalPrice: 2073663.9,
    },
    {
      uid: 37,
      startDate: '2023-10-17 12:18:00',
      customerName: '아이덴잇',
      productNumber: 'FC53665304',
      productName: 'PCJ',
      productSpec: 'E32-TM',
      productWdh: '30 X 2,051 X 3,000',
      weight: '1449.000',
      orderPrice: 1885149.0,
      orderPriceVat: 188514.9,
      freightCost: 0.0,
      freightCostVat: 0.0,
      totalPrice: 2073663.9,
    },
    {
      uid: 37,
      startDate: '2023-10-17 12:18:00',
      customerName: '아이덴잇',
      productNumber: 'FC53665304',
      productName: 'PCJ',
      productSpec: 'E32-TM',
      productWdh: '30 X 2,051 X 3,000',
      weight: '1449.000',
      orderPrice: 1885149.0,
      orderPriceVat: 188514.9,
      freightCost: 0.0,
      freightCostVat: 0.0,
      totalPrice: 2073663.9,
    },
  ]

  const modalClose = () => {
    setAddModal(false)
  }
  const titleData = ['패키지 명', '수량', '시작가', '낙찰 금액']
  const contentData = ['알뜰패키지', '50', '3598', '5128']
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

  const total = dummy.reduce(
    (acc, cur) => {
      acc.weight += parseFloat(cur.weight)
      acc.orderPrice += cur.orderPrice
      acc.freightCost += cur.freightCost
      acc.orderPriceVat += cur.orderPriceVat
      acc.freightCostVat += cur.freightCostVat
      return acc
    },
    {
      weight: 0,
      orderPrice: 0,
      freightCost: 0,
      orderPriceVat: 0,
      freightCostVat: 0,
    },
  )

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '90vh', background: '' }}>
        <BlueBarHeader style={{ height: '20px' }}>
          {/* <div>{title}</div> */}
          <div></div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <FilterContianer>
            <FormTitle>
              <b>거래명세서</b>
            </FormTitle>

            <Text style={{ alignItems: 'normal', justifyContent: 'left' }}>
              <div>
                <b style={{ fontSize: '18px' }}>발행일자 : 2023.03.27</b>
              </div>
            </Text>
            <TableContianer>
              <InvoiceIOWrap>
                <InvoiceIO>
                  <InvoiceIOHeadBodyWrap top>공급자</InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>사업자 번호</InvoiceHead>
                    <InvoiceBody>123-123-123</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>사업장 명</InvoiceHead>
                    <InvoiceBody>주식회사 카스코 철강</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>성명</InvoiceHead>
                    <InvoiceBody>강대수</InvoiceBody>
                    <Seal style={{ minWidth: '150px', flex: '0' }}>
                      <img src="/img/seal.png" />
                    </Seal>
                  </InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>주소</InvoiceHead>
                    <InvoiceBody>경기도 성남시 분당구 황새울로 200번길 28, 6층 602호 (수내동 오너스타워)</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                </InvoiceIO>
                <InvoiceIO>
                  <InvoiceIOHeadBodyWrap top>공급자</InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>사업자 번호</InvoiceHead>
                    <InvoiceBody>123-123-123</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>사업장 명</InvoiceHead>
                    <InvoiceBody>주식회사 카스코 철강</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>성명</InvoiceHead>
                    <InvoiceBody>강대수</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                  <InvoiceIOHeadBodyWrap>
                    <InvoiceHead>주소</InvoiceHead>
                    <InvoiceBody>경기도 성남시 분당구 황새울로 200번길 28, 6층 602호 (수내동 오너스타워)</InvoiceBody>
                  </InvoiceIOHeadBodyWrap>
                </InvoiceIO>
              </InvoiceIOWrap>
              <TableContainer>
                <Table>
                  <thead>
                    <SubheaderRow>
                      <Th2>월</Th2>
                      <Th2>일</Th2>
                      <Th2>제품번호</Th2>
                      <Th2>두께</Th2>
                      <Th2>폭</Th2>
                      <Th2>길이</Th2>
                      <Th2>등급</Th2>
                      <Th2>수량</Th2>
                      <Th2>단가</Th2>
                      <Th2>금액</Th2>
                    </SubheaderRow>
                  </thead>
                  <tbody>
                    {/* 테이블 내용 추가 */}
                    <tr>
                      <Td>1</Td>
                      <Td>2</Td>
                      <Td>3</Td>
                      <Td>4</Td>
                      <Td>5</Td>
                      <Td>6</Td>
                      <Td>7</Td>
                      <Td>8</Td>
                      <Td>9</Td>
                      <Td>10</Td>
                    </tr>
                    {/* 다른 제품 추가 */}

                    <tr style={{ border: '2px solid #c8c8c8' }}>
                      <Th2 overall colSpan="7">
                        총계
                      </Th2>
                      <Td blue bold>
                        총합1
                      </Td>
                      <Td>총합2</Td>
                      <Td blue bold>
                        총합3
                      </Td>
                    </tr>
                  </tbody>
                </Table>
              </TableContainer>
            </TableContianer>
          </FilterContianer>
        </BlueSubContainer>
        <div style={{ float: 'right', padding: '20px 30px' }}>
          <img src="/img/logo.png" />
        </div>
      </ModalContainer>
    </>
  )
}

export default Invoice

const FormTitle = styled.h1`
  font-size: 30px;
  padding: 40px;
  text-align: center;
`

const FormContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.colors.PriStrong};
  font-size: 16px;
  padding: 20px 0px;
  gap: 5px;
  letter-spacing: -0.32px;
`
const TableContainer = styled.div`
  margin-top: 20px;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 17px;
`

const Th2 = styled.th`
  height: ${({ overall }) => (overall ? '' : '80px')};
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  padding: 5.5px;
  font-weight: 500;
  border: 1px solid #c8c8c8;
  background-color: #dbe2f0;
  min-width: 120px;
`

const Td = styled.td`
  text-align: ${({ right }) => (right ? 'end' : 'center')};
  border: 1px solid #ddd;
  padding: 8px;
  color: ${({ theme, blue }) => (blue ? theme.colors.PriNormal : 'none')};
  font-weight: ${({ bold }) => (bold ? 900 : 'none')};
`

const SubheaderRow = styled.tr`
  background-color: #d9d9d9;
`

const InvoiceIOWrap = styled.div`
  width: 100%;

  display: flex;
  gap: 16px;
`

const InvoiceIO = styled.div`
  width: 50%;
  height: 230px;
  display: flex;
  flex-direction: column; /* 추가된 부분 */
  flex: 1 1 1;
`
const InvoiceIOHeadBodyWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: ${({ top }) => (top ? 'bold' : 'none')};
  color: ${({ top }) => (top ? '#17479e' : 'none')};
  background-color: ${({ top }) => (top ? '#dbe2f0' : 'none')};
  border-collapse: collapse;
  flex: 1; /* 추가된 부분 */
`

const InvoiceHead = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 25%;
  border: 1px solid #6363633c;
  background-color: #dbe2f0;
`

const InvoiceBody = styled.div`
  display: flex;
  height: 100%;
  padding: 0px 90px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid #6363633c;
  flex: 1 0 0;
`

const Seal = styled.div`
  display: flex;
  height: 100%;
  padding: 0px 40px;
  text-align: center;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
  }
`
