import React, { Fragment, useState } from 'react'

import { BlackBtn, GreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import {
  DoubleWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
  CustomInput,
} from '../../../modal/External/ExternalFilter'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'

import Hidden from '../../../components/TableInner/Hidden'
import { useShipmentListQuery } from '../../../api/shipment'
import DestinationSearch from '../../../components/Search/DestinationSearch'
import CustomerSearch from '../../../components/Search/CustomerSearch'
import DateSearchSelect from '../../../components/Search/DateSearchSelect'
import SpartSelect from '../../../components/Search/SpartSelect'
import StorageSelect from '../../../components/Search/StorageSelect'

const initData = {
  pageNum: 1,
  pageSize: 50,
  shipmentStatus: '출하 대기',
  storage: '',
  spart: '',
  customerCode: '',
  customerName: '',
  destinationCode: '',
  destinationName: '',
  orderStartDate: '',
  orderEndDate: '',
  productNumberList: [],
}

const Register = ({}) => {
  const [param, setParam] = useState(initData)
  const [isRotated, setIsRotated] = useState(false)

  const { data, refetch } = useShipmentListQuery(param)

  const titleData = ['제품 중량(kg)', '제품 공급가액', '운반비 공급가액']
  const contentData = ['986,742', '986,742', '986,742']

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const toggleBtnClick = () => setExfilterToggle((prev) => !prev)

  // search change
  const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))

  // 초기화
  const handleImageClick = async () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
    await setParam(initData)
    await refetch()
  }

  console.log(param)

  return (
    <FilterContianer>
      <FilterHeader>
        <h1>출하지시 등록</h1>
        <HeaderToggle
          exFilterToggle={exFilterToggle}
          toggleBtnClick={toggleBtnClick}
          toggleMsg={exFilterToggle ? 'On' : 'Off'}
        />
      </FilterHeader>

      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap none>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <StorageSelect value={param.storage} onChange={(e) => onChange('storage', e.label)} />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>고객사 명/고객사 코드</h6>
                  <CustomerSearch name={param.customerName} code={param.customerCode} onChange={setParam} />
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>목적지/목적지 코드</h6>
                  <DestinationSearch name={param.destinationName} code={param.destinationCode} onChange={setParam} />
                </PartWrap>
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap first>
                  <h6>주문 일자</h6>
                  <DateSearchSelect
                    startInitDate={param.orderStartDate}
                    endInitDate={param.orderEndDate}
                    setDate={onChange}
                  />
                </PartWrap>

                <PartWrap first>
                  <h6>구분</h6>
                  <PWRight>
                    <SpartSelect value={param.spart} onChange={(e) => onChange('spart', e.label)} />
                  </PWRight>
                </PartWrap>
              </RowWrap>
            </FilterLeft>
            <FilterRight>
              <DoubleWrap>
                <h6>제품 번호 </h6>
                <textarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                />
              </DoubleWrap>
            </FilterRight>
          </FilterSubcontianer>
          <FilterFooter>
            <div style={{ display: 'flex' }}>
              <p>초기화</p>
              <ResetImg
                src="/img/reset.png"
                style={{ marginLeft: '10px', marginRight: '20px' }}
                onClick={handleImageClick}
                className={isRotated ? 'rotate' : ''}
              />
            </div>
            <div style={{ width: '180px' }}>
              <BlackBtn width={100} height={40}>
                검색
              </BlackBtn>
            </div>
          </FilterFooter>
        </>
      )}
      <TableWrap>
        <ClaimTable>
          {[0].map((index) => (
            <ClaimRow key={index}>
              {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                <Fragment agmentkey={title}>
                  <ClaimTitle>{title}</ClaimTitle>
                  <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                </Fragment>
              ))}
            </ClaimRow>
          ))}
        </ClaimTable>
      </TableWrap>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>출하 취소</WhiteRedBtn>
            <WhiteSkyBtn>출하 지시</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        {/*<Test3 />*/}
      </TableContianer>
    </FilterContianer>
  )
}

export default Register
