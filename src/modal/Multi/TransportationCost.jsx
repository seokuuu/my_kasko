import { useAtom } from 'jotai'
import { useState } from 'react'
import { blueModalAtom } from '../../store/Layout/Layout'
import {
  BlueBarHeader,
  BlueBlackBtn,
  BlueBtnWrap,
  BlueMainDiv,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  ResultContainer,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

import { GreyBtn } from '../../common/Button/Button'
import { TxtInput } from '../../common/Input/Input'

import { Checkbox } from '@mui/material'
import styled from 'styled-components'
import useReactQuery from '../../hooks/useReactQuery'
import { getCustomerFind } from '../../service/admin/Auction'
import { CustomSelect } from '../../common/Option/Main'

// 운반비 단가
// get : 기준관리 - 운반비 관리 - 운반비 목록 (getCustomerFind)
// !! 목적지 "찾기" 버튼은 목적지 관리 get을 예시로 작성했습니다. 참고해서 수정하시면 됩니다.
const TransportationCost = ({ title, setSwitch }) => {
  const matchData = { name: '고객명', code: '고객사 코드', businessNumber: '사업자번호' } // 수정 필요

  const { isLoading, isError, data, isSuccess } = useReactQuery('', 'getCustomerFind', getCustomerFind)

  const customerGetData = data?.data?.data

  console.log('data', customerGetData)

  const [isModal, setIsModal] = useAtom(blueModalAtom)
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState([])
  const [clickedResult, setClickedResult] = useState([])
  const [selectedUid, setSelectedUid] = useState(null)
  const [selectedUids, setSelectedUids] = useState([])

  console.log('clickedResult', clickedResult)

  console.log('searchTerm !!!', searchTerm)
  console.log('result !!!', result)

  const modalClose = () => {
    setSwitch(false)
  }

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

    const isUidSelected = clickedResult.some((result) => result.uid === uid)

    if (isUidSelected) {
      // uid가 clickedResult 배열에 있다면 해당 항목을 제거
      setClickedResult(clickedResult.filter((result) => result.uid !== uid))
    } else {
      // uid가 clickedResult 배열에 없다면 추가
      setClickedResult([...clickedResult, { uid, name, code, businessNumber }])
    }
  }

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '55%', height: '70vh' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          <div>운반비 단가</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv style={{ fontSize: '18px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 10px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BMDTitle style={{ width: '100px' }}>출발지</BMDTitle>
                  <CustomSelect width={150} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BMDTitle style={{ width: '100px' }}>제품 구분</BMDTitle> <CustomSelect width={150} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BMDTitle style={{ width: '100px' }}>목적지</BMDTitle>
                  <TxtInput
                    placeholder="목적지/목적지 코드"
                    textarea="회사명"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '150px' }}
                  />
                  <GreyBtn height={40} width={30} margin={5} onClick={handleSearch}>
                    찾기
                  </GreyBtn>
                </div>
              </div>
            </BlueMainDiv>

            <BlueMainDiv style={{ padding: '0px' }}>
              <ResultContainer>
                <ResultHeadCheck>
                  <OnlyCheck>선택</OnlyCheck>
                  <ResultCellCheck>{matchData.name}</ResultCellCheck>
                  <ResultCellCheck>{matchData.code}</ResultCellCheck>
                  <ResultCellCheck wid={130}>{matchData.businessNumber}</ResultCellCheck>
                </ResultHeadCheck>
                {result &&
                  result.map((item, index) => (
                    <ResultRowCheck
                      key={item.uid}
                      onClick={() => handleCellClick(item.uid, item.name, item.code, item.businessNumber)}
                    >
                      <OnlyCheck>
                        <Checkbox
                          checked={clickedResult.some((result) => result.uid === item.uid)}
                          onClick={(event) => {
                            event.stopPropagation()
                            handleCellClick(item.uid, item.name, item.code, item.businessNumber)
                          }}
                        />
                      </OnlyCheck>
                      <ResultCellCheck>{item.name}</ResultCellCheck>
                      <ResultCellCheck>{item.code}</ResultCellCheck>
                      <ResultCellCheck wid={130}>{item.businessNumber}</ResultCellCheck>
                    </ResultRowCheck>
                  ))}
              </ResultContainer>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn>적용</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default TransportationCost

export const BMDTitle = styled.div`
  display: flex;
  justify-content: center;
`

const ResultHeadCheck = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  border-bottom: 1px solid #ddd;
  background-color: #dbe2f0;
`

const ResultRowCheck = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 35px;

  &:hover {
    background-color: #f5f5f5;
  }
`

const ResultCellCheck = styled.div`
  display: flex;
  flex: 1;
  width: ${({ wid }) => (wid ? `${wid}px` : '25px')};
  max-width: 100%;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #c8c8c8;
  border-bottom: 1px solid #c8c8c8;
  height: 100%;

  &:last-child {
    border-right: none;
  }
`

const OnlyCheck = styled.div`
  display: flex;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 1px solid #c8c8c8;
  border-bottom: 1px solid #c8c8c8;

  &:last-child {
    border-right: none;
  }
`

const HeadTitle = styled.h6`
  width: 100px;
`
