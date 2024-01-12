import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import { calculateTotal } from './utils'
import { formatWeight } from '../../../utils/utils'
import React, { useEffect } from 'react'
import { useMergeListQuery } from '../../../api/shipment'
import { RadioSearchButton } from '../../../components/Search'
import { styled } from 'styled-components'

const MergeHeader = ({ list, destinations, mergeCost, setMergeCost, dockStatus, setDockStatus }) => {
  const { data: mergeCostList } = useMergeListQuery()

  // 합짐비 get
  const getMergeCost = () => {
    // 목적지 개수가 2보다 작을 시 1착으로 지정 1착은 합짐비 포함x
    const destinationsLength = getDestinationLength()
    const land = destinationsLength + '착'
    if (destinationsLength < 2) {
      return setMergeCost(0)
    }

    // mergeCostList에서 land가 포함되어 있는 합짐비 데이터 추출
    const getLand = mergeCostList?.filter((item) => item.land === land)
    if (getLand.length === 0) {
      setMergeCost(0)
      window.alert('합짐비 데이터가 없습니다. 관리자에게 문의바랍니다.')
      window.location.reload()
      return
    }
    const { inAreaPrice, outAreaPrice } = getLand[0]

    // destinations 배열에서 타사 시군 개수 구하기
    const sameCountArray = []
    destinations.forEach((destination) => {
      const address = destination.split(' ')
      const key = `${address[0]} ${address[1]}` // 시군구와 동을 조합한 키 생성
      if (!sameCountArray.includes(key)) {
        sameCountArray.push(key)
      }
    })

    // 동일 시군 일 시 inAreaPrice & 타사 시군 일 시 outAreaPrice
    const mergeCost = sameCountArray.length > 1 ? outAreaPrice : inAreaPrice
    setMergeCost(mergeCost)
  }

  const getDestinationLength = () => destinations?.filter((item) => item !== '-')?.length

  useEffect(() => {
    if (list?.length > 0 && mergeCostList) getMergeCost()
  }, [mergeCostList, list])

  return (
    <>
      <TableWrap style={{ marginTop: '5px', marginBottom: '16px' }}>
        <ClaimTable>
          {destinations?.length > 0 && (
            <ClaimRow>
              {destinations?.map((destination, i) => (
                <React.Fragment key={i}>
                  <ClaimTitle>목적지 {i + 1}</ClaimTitle>
                  <ClaimContent>{destination}</ClaimContent>
                </React.Fragment>
              ))}
            </ClaimRow>
          )}
          <ClaimRow>
            <ClaimTitle>매출운임비</ClaimTitle>
            <ClaimContent>{calculateTotal(list, 'outboundFreightAmount')}</ClaimContent>
            <ClaimTitle>매입운임비</ClaimTitle>
            <ClaimContent>{calculateTotal(list, 'inboundFreightAmount')}</ClaimContent>
            <ClaimTitle>합짐비</ClaimTitle>
            <ClaimContent>{formatWeight(mergeCost ?? 0)}</ClaimContent>
          </ClaimRow>
        </ClaimTable>
      </TableWrap>
      <Wrap>
        <SpaceDiv>
          <RadioSearchButton
            title={'입찰 방식'}
            options={[
              { label: '독차', value: '독차' },
              { label: '합짐', value: '합짐' },
            ]}
            value={getDestinationLength() > 1 ? '함짐' : '독차'}
          />
        </SpaceDiv>
        <SpaceDiv>
          <RadioSearchButton
            title={'상차도 여부'}
            options={[
              { label: 'Y', value: true },
              { label: 'N', value: false },
            ]}
            value={dockStatus}
            onChange={(value) => setDockStatus(value)}
          />
        </SpaceDiv>
      </Wrap>
    </>
  )
}

export default MergeHeader

const Wrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
`

const SpaceDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > h6 {
    font-size: 16px;
    color: #6b6b6b;
    margin-right: 10px;
  }
`
