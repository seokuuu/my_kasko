import React, { useState, Fragment, useRef, useEffect } from 'react'

import styled from 'styled-components'
import { BlueBarHeader, WhiteCloseBtn } from '../Common/Common.Styled'
import { WhiteBlackBtn } from '../../common/Button/Button'
import {
  FilterContianer,
  FilterHeader,
  FilterTCBottom,
  FilterTCTop,
  FilterTopContainer,
  TCSubContainer,
  TableContianer,
} from '../External/ExternalFilter'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { useAtom, useAtomValue } from 'jotai'
import { packageDetailModal, selectPackageAtom, toggleAtom } from '../../store/Layout/Layout'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../components/MapTable/MapTable'
import Table from '../../pages/Table/Table'
import Hidden from '../../components/TableInner/Hidden'
import PageDropdown from '../../components/TableInner/PageDropdown'
import Excel from '../../components/TableInner/Excel'
import {
  packageProductsDispatchFields,
  packageProductsDispatchFieldsCols,
  packageDetailDispatchFieldsCols,
} from '../../constants/admin/SellPackage'
import useReactQuery from '../../hooks/useReactQuery'
import { getPackageProductsList } from '../../api/SellProduct'
import { add_element_field } from '../../lib/tableHelpers'

export default function PackageDetailModal() {
  const [isModal, setIsModal] = useAtom(packageDetailModal)
  const select = useAtomValue(selectPackageAtom)
  const [param, setParam] = useState({
    pageNum: 1,
    pageSize: 1000,
    packageNumber: select['패키지 번호'],
  })

  const titleData = ['패키지 명', '수량', select['판매 유형'] === '상시판매 대상재' ? '상시판매가' : '시작가']
  const tableField = useRef(packageDetailDispatchFieldsCols)
  const getCol = tableField.current
  const [getRow, setGetRow] = useState('')

  const { data, isSuccess } = useReactQuery(param, 'package-list', getPackageProductsList)
  const detailList = data?.r
  const tablePagination = data?.pagination
  const [filteredData, setFilteredData] = useState([])
  // const [exFilterToggle, setExfilterToggle] = useAtom(toggleAtom)
  // const [toggleMsg, setToggleMsg] = useState('On')
  // const toggleBtnClick = () => {
  //   setExfilterToggle((prev) => !prev)
  //   if (exFilterToggle === true) {
  //     setToggleMsg('Off')
  //   } else {
  //     setToggleMsg('On')
  //   }
  // }
  // console.log(Object.entries(select).map(([k, v]) => {}))
  useEffect(() => {
    if (filteredData && isSuccess) {
      detailList && setFilteredData(detailList)
    }
  }, [isSuccess])
  useEffect(() => {
    if (!isSuccess && !filteredData) return null
    if (Array.isArray(filteredData)) {
      setGetRow(add_element_field(filteredData, packageProductsDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filteredData])
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleTablePageSize = (event) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageSize: Number(event.target.value),
      pageNum: 1,
    }))
  }

  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }

  return (
    <OutSide>
      <Container>
        <BlueBarHeader>
          <div>패키지 상세 보기</div>
          <div>
            <WhiteCloseBtn
              onClick={() => {
                setIsModal(false)
              }}
              src="/svg/white_btn_close.svg"
            />
          </div>
        </BlueBarHeader>
        <OverTable>
          <FilterContianer>
            <FilterHeader>
              <div style={{ display: 'flex' }}></div>
              {/* <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} /> */}
            </FilterHeader>
            <FilterTopContainer>
              <FilterTCTop>
                <h6>패키지 번호</h6>
                <p>{select['패키지 번호']}</p>
              </FilterTCTop>
            </FilterTopContainer>
            <ClaimTable>
              {[0, 1].map((index) => (
                <ClaimRow key={index}>
                  {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                    <Fragment key={idx}>
                      <ClaimTitle>{title}</ClaimTitle>
                      {title === '패키지 명' && <ClaimContent>{select['패키지 이름']}</ClaimContent>}
                      {title === '수량' && <ClaimContent>{filteredData.length}</ClaimContent>}
                      {title === '상시판매가' && <ClaimContent>{select['패키지 경매&판매 시작가']}</ClaimContent>}
                      {title === '시작가' && <ClaimContent>{select['패키지 경매&판매 시작가']}</ClaimContent>}
                    </Fragment>
                  ))}
                </ClaimRow>
              ))}
            </ClaimTable>
            <TableContianer>
              <TCSubContainer bor>
                <div>
                  조회 목록 (선택 <span>0</span>/ 50개)
                  <Hidden />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <PageDropdown handleDropdown={handleTablePageSize} />
                  <Excel getRow={getRow} />
                </div>
              </TCSubContainer>
              <TCSubContainer bor>
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  선택 중량<span> 2 </span>kg / 총 중량 kg
                </div>
              </TCSubContainer>
              <Table getRow={getRow} getCol={getCol} tablePagination={tablePagination} onPageChange={onPageChange} />
            </TableContianer>
          </FilterContianer>
        </OverTable>
      </Container>
    </OutSide>
  )
}

export const Container = styled.div`
  min-width: 75%;
  max-height: 800px;
  position: absolute;
  top: 50%;
  left: 55%;
  /* overflow: scroll; */
  transform: translate(-50%, -50%);
`

export const OutSide = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: scroll;
`
export const OverTable = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 12px 60px;
`