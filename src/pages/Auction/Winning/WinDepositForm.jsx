import React, { useEffect, useState, Fragment } from 'react'
import { BtnBound, SkyBtn, TGreyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'
import { FilterHeaderAlert } from '../../../modal/External/ExternalFilter'

import {
  CustomInput,
  FilterContianer,
  FilterHeader,
  FilterTCTop,
  FilterTopContainer,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import {
  FadeOverlay,
  ModalContainer,
  BlueBarHeader,
  WhiteCloseBtn,
  BlueSubContainer,
} from '../../../modal/Common/Common.Styled'
import styled from 'styled-components'

// 패키지 상세보기 (경매)
const WinDepositForm = ({}) => {
  const dummy = [
    {
      uid: 22,
      startDate: '2023-10-13 15:23:00',
      customerName: '카스코 철강',
      productNumber: 'FC53652605',
      productName: 'PCJ',
      productSpec: 'CSA 50W/A572-50',
      productWdh: '12.7 X 2,438 X 5,430',
      weight: '1320.000',
      orderPrice: 1321320.0,
      orderPriceVat: 132132.0,
      freightCost: 0.0,
      freightCostVat: 0.0,
    },
    {
      uid: 23,
      startDate: '2023-10-13 15:23:00',
      customerName: '카스코 철강',
      productNumber: 'FC53635203',
      productName: 'PCJ',
      productSpec: 'A',
      productWdh: '14.5 X 3,652 X 6,720',
      weight: '2793.000',
      orderPrice: 2795793.0,
      orderPriceVat: 279579.3,
      freightCost: 0.0,
      freightCostVat: 0.0,
    },
    {
      uid: 24,
      startDate: '2023-10-13 15:23:00',
      customerName: '카스코 철강',
      productNumber: 'FC53638104',
      productName: 'PCJ',
      productSpec: 'DH32',
      productWdh: '11 X 3,420 X 8,620',
      weight: '2546.000',
      orderPrice: 2548546.0,
      orderPriceVat: 254854.6,
      freightCost: 0.0,
      freightCostVat: 0.0,
    },
    {
      uid: 25,
      startDate: '2023-10-13 15:23:00',
      customerName: '카스코 철강',
      productNumber: 'FC53638105',
      productName: 'PCJ',
      productSpec: 'DH32',
      productWdh: '11 X 3,420 X 8,597',
      weight: '2539.000',
      orderPrice: 2541539.0,
      orderPriceVat: 254153.9,
      freightCost: 0.0,
      freightCostVat: 0.0,
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
      <ModalContainer style={{ width: '75%', height: '95vh', background: '#eef3fb' }}>
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
              <b>경매 입금 요청서 (2022.12.06일자</b>)
            </FormTitle>
            <FilterHeaderAlert>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
                  <img src="/img/notice.png" />
                </div>
                <FormContentWrap>
                  <div>
                    <b>· 연락처 : </b>070-8889-3456{' '}
                  </div>
                  <div>
                    <b>· 입금계좌번호 : </b> 우리은행 1005-301-817070, 신한은행 140-013-498612, 기업은행 070-8889-3456,
                    예금주 : 카스코철강
                  </div>
                  <div>
                    <b>· 입금 기한 : </b> 경매일 익영업일 12시 限
                  </div>
                </FormContentWrap>
              </div>
            </FilterHeaderAlert>

            <Text>
              <div>
                <b>저희 주식회사 카스코 철강 제품을 구매해 주시는 귀사에 항상 감사드립니다.</b>
              </div>
              <div>
                <b>
                  해당 거래에 대해 귀사가 입금하셔야 할 낙찰금액은 아래와 같사오니, 확인하신 후 입금해 주시기 바랍니다.
                </b>
              </div>
            </Text>
            <TableContianer>
              <ClaimTable style={{ margin: '20px 0px' }}>
                <ClaimRow>
                  <ClaimTitle>경매일자</ClaimTitle>
                  <ClaimContent>20221206</ClaimContent>
                  <ClaimTitle>고객명</ClaimTitle>
                  <ClaimContent>백광종합철강</ClaimContent>
                  <ClaimTitle>낙찰 중량</ClaimTitle>
                  <ClaimContent bold>17,111</ClaimContent>
                  <ClaimTitle>낙찰 금액</ClaimTitle>
                  <ClaimContent bold>51,281,005</ClaimContent>
                </ClaimRow>
              </ClaimTable>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <Th rowSpan="2">제품 정보</Th>
                      <Th rowSpan="2">품명</Th>
                      <Th rowSpan="2">규격 약호</Th>
                      <Th rowSpan="2">제품 사양</Th>
                      <Th rowSpan="2">중량</Th>
                      <Th colSpan="3">공급가액</Th>
                      <Th colSpan="3">VAT</Th>
                      <Th rowSpan="2">총계</Th>
                    </tr>
                    <SubheaderRow>
                      <Th>제품대</Th>
                      <Th>운송비</Th>
                      <Th>총합</Th>
                      <Th>제품대</Th>
                      <Th>운송비</Th>
                      <Th>총합</Th>
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
                      <Td>11</Td>
                      <Td>12</Td>
                    </tr>
                    {/* 다른 제품 추가 */}

                    <tr style={{ border: '2px solid #c8c8c8' }}>
                      <Th colSpan="4">총계</Th>
                      <Td blue bold>
                        총합1
                      </Td>
                      <Td>총합2</Td>
                      <Td>총합3</Td>
                      <Td>총합4</Td>
                      <Td>총합5</Td>
                      <Td>총합6</Td>
                      <Td>총합7</Td>
                      <Td>총합8</Td>
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

export default WinDepositForm

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

const Th = styled.th`
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  padding: 5.5px;
  font-weight: 500;
  border: 1px solid #c8c8c8;
  background-color: #dbe2f0;
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
