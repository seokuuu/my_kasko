import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
  margin-top: 20px;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const Th = styled.th`
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  padding: 8px;
`

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`

const SubheaderRow = styled.tr`
  background-color: #d9d9d9;
`

const StyledTable = () => {
  return (
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
            <Th>제품대 공급가액</Th>
            <Th>운송비 공급가액</Th>
            <Th>공급가액 총합</Th>
            <Th>제품대 VAT</Th>
            <Th>운송비 VAT</Th>
            <Th>VAT 총합</Th>
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
          {/* 총계 cell 추가 */}
          <tr>
            <Th colSpan="4">총계</Th>
            <Td>총합1</Td>
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
  )
}

export default StyledTable
