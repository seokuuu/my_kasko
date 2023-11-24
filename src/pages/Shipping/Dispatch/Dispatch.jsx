import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { StandardDispatchEditAtom, btnCellUidAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import {
  DoubleWrap,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'

import { MainSelect } from '../../../common/Option/Main'

import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import DispatchEdit from '../../../modal/Multi/DispatchEdit'
import DispatchPost from '../../../modal/Multi/DispatchPost'
import { StandardDispatchPostAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { deleteAdminShipping, getAdminShipping } from '../../../service/admin/Shipping'
import { dispatchPostEditAtom, dispatchTypeAtom } from '../../../store/Layout/Layout'
import DateGrid from '../../../components/DateGrid/DateGrid'

// dispatchPostEditAtom : 모달 스위치
// dispatchTypeAtom : 모달의 등록 / 수정 상태값 ('등록'이 default, Consolidation 컴포넌트 체크)

const Dispatch = ({}) => {
  const [btnCellModal, setBtnCellModal] = useAtom(dispatchPostEditAtom)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [modalType, setModalType] = useAtom(dispatchTypeAtom)
  const [isModalPost, setIsModalPost] = useAtom(StandardDispatchPostAtom)
  const [isModalEdit, setIsModalEdit] = useAtom(StandardDispatchEditAtom)
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }

  console.log('uidAtom', uidAtom)
  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  // GET
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(ShippingDispatchFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const Param = {
    pageNum: 1,
    pageSize: 10,
  }

  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getAdminShipping', getAdminShipping)
  const resData = data?.data?.data?.list
  console.log('resData => ', resData)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, ShippingDispatchFields))
    }
  }, [isSuccess, resData])

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

  // DELETE
  const mutation = useMutation(deleteAdminShipping, {
    onSuccess: () => {
      queryClient.invalidateQueries('shipping')
    },
  })

  const propsRemove = () => {
    checkedArray.forEach((item) => {
      mutation.mutate(item['고유 번호']) //mutation.mutate로 api 인자 전해줌
    })
  }

  // console.log('modalTyp 되나', modalType)
  console.log('btnCellModal', btnCellModal)

  return (
    <>
      <FilterContianer>
        <FilterHeader>
          <h1>배차기사 관리</h1>
          {/* 토글 쓰기 */}
        </FilterHeader>
        {exFilterToggle && (
          <>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>기사명</h6>
                    <PWRight style={{ width: '160px' }}>
                      <Input />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>차량번호</h6>
                    <PWRight style={{ width: '160px' }}>
                      <Input />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>창고구분</h6>
                    <PWRight style={{ width: '160px' }}>
                      <MainSelect />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>차량종류</h6>
                    <PWRight style={{ width: '160px' }}>
                      <MainSelect />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <PWRight style={{ width: '160px' }}></PWRight>
                  </PartWrap>
                </RowWrap>
              </FilterLeft>
              <FilterRight>
                <DoubleWrap></DoubleWrap>
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

        <TableContianer>
          <TCSubContainer bor>
            <div>
              조회 목록 (선택 <span>2</span> / 50개 )
              <Hidden />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown />
              <Excel />
            </div>
          </TCSubContainer>
          <TCSubContainer>
            <div>
              선택 중량<span> 2 </span>kg / 총 중량 kg
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <WhiteRedBtn>선택 삭제</WhiteRedBtn>
              <WhiteSkyBtn
                onClick={() => {
                  setIsModalPost(true)
                }}
              >
                추가 등록
              </WhiteSkyBtn>
            </div>
          </TCSubContainer>
          <Table getCol={getCol} getRow={getRow} />
        </TableContianer>
        {isModalPost && <DispatchPost setIsModalPost={setIsModalPost} />}
        {isModalEdit && <DispatchEdit setIsModalEdit={setIsModalEdit} />}
      </FilterContianer>
    </>
  )
}

export default Dispatch

const TableWrap = styled.div`
  margin: 30px auto;
`
