import React, { useMemo } from 'react'
import { FilterHeaderAlert } from '../../modal/External/ExternalFilter'
import {
  FilterContianer,
  TableContianer
} from '../../modal/External/ExternalFilter'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../components/MapTable/MapTable'
import moment from 'moment'
import styled from 'styled-components'
import {
  BlueBarHeader,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'

/**
 * @constant 제품 더미 데이터
 */
const DUMMY_DATA = {
  uid: 0,
  startDate: '',
  customerName: '-',
  productNumber: '-',
  productName: '-',
  productSpec: '-',
  productWdh: '-',
  weight: 0,
  orderPrice: 0,
  orderPriceVat: 9,
  freightCost: 0,
  freightCostVat: 0,
  totalPrice: 0,
}
/**
 * 
 */
function getKeyMappedData(data, keyPairs) {
  return data.map(d => {
    let newD = {...d};
    for(const enKey in keyPairs) {
      const koKey = keyPairs[enKey];
      if(d[koKey] !== undefined) {
        newD[enKey] = d[koKey];
        delete newD[koKey];
      }
    }
    return newD;
  })
}

/**
 * [**] 입금 요청서 모달
 * @param {string} title 입금요청서 제목
 * @param {object} keyPairs 입금요청서 key-value pair
 * @param {Array<any>} data 입금 데이터 
 * @param {string} date 경매일자
 * @param {func} handleClose 모달 닫기 핸들러 
 * @returns 
 */
const DepositRequestForm = ({ title= '경매 입금 요청서', keyPairs, data, date, handleClose }) => {
  // 제품 정보
  const productData = useMemo(() => !data? [DUMMY_DATA] : keyPairs? getKeyMappedData(data) : data, [data]);
  // 간략 정보
  const infoData = useMemo(() => {
    const info = ({ 
      date: date || moment(productData[0].startDate || new Date()).format('YYYY.MM.DD'), 
      customerName: productData[0].customerName || '-',
      totalWeight: 0,
      totalPrice: 0
     });
    if(!info.totalWeight || !info.totalPrice) {
      productData.forEach(v => {
        info.totalWeight += v.weight;
        info.totalPrice += v.totalPrice;
      })
    }
    info.totalWeight = info.totalWeight.toLocaleString();
    info.totalPrice = info.totalPrice.toLocaleString();
    return info;
  }
  , [productData]);
  // 총계 정보
  const totalData = useMemo(() => productData.reduce(
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
  ), [productData])

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '90vh', background: '#eef3fb' }}>
        <BlueBarHeader style={{ height: '20px' }}>
          <div></div>
          <div>
            <WhiteCloseBtn onClick={e => { handleClose(); }} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <FilterContianer>
            {/* 요청서 제목 | 일자 */}
            <FormTitle>
              <b>{title} ({date}일자</b>)
            </FormTitle>
            {/* 입금 정보 공지 */}
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
            {/* 인사글 */}
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
                  <ClaimContent>{infoData.date}</ClaimContent>
                  <ClaimTitle>고객명</ClaimTitle>
                  <ClaimContent>{infoData.customerName}</ClaimContent>
                  <ClaimTitle>낙찰 중량</ClaimTitle>
                  <ClaimContent bold>{infoData.totalWeight}</ClaimContent>
                  <ClaimTitle>낙찰 금액</ClaimTitle>
                  <ClaimContent bold>{infoData.totalPrice}</ClaimContent>
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
                    {
                      productData.map(v => (
                        <tr key={v.uid}>
                          <Td>{v.productName}</Td>
                          <Td>품명</Td>
                          <Td>규격약호</Td>
                          <Td>제품사양</Td>
                          <Td>{v.weight}</Td>
                          <Td>제품대</Td>
                          <Td>운송비</Td>
                          <Td>총합</Td>
                          <Td>제품대</Td>
                          <Td>운송비</Td>
                          <Td>총합</Td>
                          <Td>{v.totalPrice}</Td>
                        </tr>
                      ))
                    }
                    {/* 총계 */}
                    <tr style={{ border: '2px solid #c8c8c8' }}>
                      <Th colSpan="4">총계</Th>
                      <Td blue bold>{totalData.weight}</Td>
                      <Td>제품대</Td>
                      <Td>운송비</Td>
                      <Td>총합</Td>
                      <Td>제품대</Td>
                      <Td>운송비</Td>
                      <Td>총합</Td>
                      <Td>{totalData.orderPrice}</Td>
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

export default DepositRequestForm;

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
