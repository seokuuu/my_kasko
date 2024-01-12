import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  EditGear,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterHeaderAlert,
  FilterLeft,
  FilterSubcontianer,
  FilterWrap,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import {adminPageDestiEditModal, blueModalAtom, selectedRowsAtom, toggleAtom} from '../../../store/Layout/Layout'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray } from 'lodash'
import { useEffect, useRef } from 'react'
import { delete_clientDestination, get_clientDestination, get_detailClientDestination } from '../../../api/userManage'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
  adminCustomerDestinationManageFieldsCols,
  UserManageCustomerDestinationManageFields,
  UserManageCustomerDestinationManageFieldsCols,
} from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { UsermanageDestiEditModal, btnCellUidAtom, UsermanageFindModal } from '../../../store/Layout/Layout'

import TableTest from '../../Table/TableTest'
import DestinationEdit from './DestinationEdit'
import Table from "../../Table/Table";
import usePaging from "../../../hooks/usePaging";

const ClientDestination = ({ setChoiceComponent }) => {
  const [findModal, setFindModal] = useAtom(UsermanageFindModal)
  const [editModal, setEditModal] = useAtom(adminPageDestiEditModal)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  // const handleSelectChange = (selectedOption, name) => {
  //   // setInput(prevState => ({
  //   //   ...prevState,
  //   //   [name]: selectedOption.label,
  //   // }));
  // }
  const [isRotated, setIsRotated] = useState(false)
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
  const [isModal, setIsModal] = useAtom(blueModalAtom)
  const modalOpen = () => {
    setIsModal(true)
  }

  const [noticeEdit, setnoticeEdit] = useState(false)

  const noticeEditOnClickHandler = () => {
    setnoticeEdit((prev) => !prev)
  }
  // ---------------------------------------------------------------------------------------------
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(adminCustomerDestinationManageFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]
  const [query, setQuery] = useState({
    pageNum: 1,
    pageSize: 50,
  })

  const { data, isSuccess } = useReactQuery(query, 'clientDestination', get_clientDestination)
  const resData = data?.data?.data?.list
  const pagination = data?.data?.data?.pagination

  const { onPageChanage } = usePaging(data, setQuery)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, UserManageCustomerDestinationManageFields))
    }
  }, [isSuccess, resData, findModal])

  // 삭제
  const mutation = useMutation(delete_clientDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('clientDestination')
    },
  })

  const handleRemoveBtn = useCallback(() => {
    if (isArray(checkedArray) && checkedArray.length > 0) {
      if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
        checkedArray.forEach((item) => {
          mutation.mutate(item['uid']) //mutation.mutate로 api 인자 전해줌
        })
      }
    } else {
      alert('선택해주세요!')
    }
  }, [checkedArray])

  const setPostPage = () => {
    setChoiceComponent('등록')
  }

  return (
    <>
      {editModal ? (
        <DestinationEdit
          setEditModal={setEditModal}
          uidAtom={uidAtom}
          findModal={findModal}
        />
      ) : (
        <FilterContianer>
          <div>
            <FilterHeader>
              <h1>고객사 목적지 관리</h1>
              {/* 토글 쓰기 */}
              <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
            </FilterHeader>
            <FilterHeaderAlert>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                  <img src="/img/notice.png" />
                </div>
                {noticeEdit ? (
                  <div style={{ marginTop: '6px' }}>
                    <div>
                      <input style={{ border: '1px solid' }} />
                    </div>
                    <div>
                      <input style={{ marginTop: '6px', border: '1px solid' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>· 하차지 연락처에 핸드폰번호 미입력시 토요일 하차 불가합니다.</div>
                  </div>
                )}
              </div>

              {noticeEdit ? (
                <EditGear onClick={noticeEditOnClickHandler}>
                  완료
                  <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
                </EditGear>
              ) : (
                <EditGear onClick={noticeEditOnClickHandler}>
                  수정
                  <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
                </EditGear>
              )}
            </FilterHeaderAlert>
            {exFilterToggle && (
              <FilterWrap>
                <FilterSubcontianer>
                  <FilterLeft>
                    <RowWrap>
                      <PartWrap>
                        <h6>고객사 명/고객사코드</h6>
                        <MainSelect />
                        <Input />
                        <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen} fontSize={17}>
                          찾기
                        </GreyBtn>
                      </PartWrap>
                      <PartWrap />
                      <PartWrap />
                      <PartWrap />
                      <PartWrap />
                      <PartWrap />
                    </RowWrap>
                  </FilterLeft>
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
              </FilterWrap>
            )}
          </div>
          <TableContianer>
            <TCSubContainer bor>
              <div>
                조회 목록 (선택 <span>{checkedArray ? checkedArray.length : '0'}</span> / {pagination?.listCount}개 )
                <Hidden />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <PageDropdown handleDropdown={(e) => setQuery((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))} />
                <Excel getRow={getRow}/>
              </div>
            </TCSubContainer>
            <TCSubContainer>
              <div>
                선택<span> {checkedArray ? checkedArray.length : '0'} </span>(개)
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <WhiteRedBtn onClick={handleRemoveBtn}>목적지 삭제</WhiteRedBtn>
                <SkyBtn onClick={setPostPage}>목적지 등록</SkyBtn>
              </div>
            </TCSubContainer>
            <Table
              getCol={getCol}
              getRow={getRow}
              setChoiceComponent={setChoiceComponent}
              tablePagination={pagination}
              onPageChange={onPageChanage}
              />
          </TableContianer>
        </FilterContianer>
      )}
    </>
  )
}

export default ClientDestination
