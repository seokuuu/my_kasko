import { useCallback, useEffect, useRef, useState } from 'react'

import { styled } from 'styled-components'
import { BlackBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'

import { useAtom } from 'jotai'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  FilterContianer,
  FilterHeader,
  StyledHeading,
  StyledSubHeading,
  SubTitle,
  TCSubContainer,
  TableBottomWrap,
  TableContianer,
  TableTitle,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'

import { Link } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import {
  StandardSurchargeEdit,
  StandardSurchargeFields,
  StandardSurchargeFieldsCols,
} from '../../../constants/admin/Standard'
import TransportModal from '../../../modal/Multi/Transport'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray } from 'lodash'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import TableModal from '../../../modal/Table/TableModal'
import { deleteAdminSurcharge, getAdminSurcharge } from '../../../service/admin/Standard'
import { btnCellUidAtom, selectedRowsAtom, surEditModalAtom, btnCellRenderAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { editAdminSurcharge } from '../../../service/admin/Standard'
import moment from 'moment'

const Transport = ({}) => {
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [types, setTypes] = useState(0) // 매입 매출 구분 (0: 매입 / 1: 매출)
  const [startDate, setStartDate] = useState(new Date()) // 수정 버튼 Date
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

  const [isModal, setIsModal] = useAtom(blueModalAtom)

  console.log('isModal =>', isModal)

  const modalOpen = () => {
    setIsModal(true)
  }

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(StandardSurchargeFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const Param = {
    pageNum: 1,
    pageSize: 20,
    type: types, // (0: 매입 / 1: 매출)
  }

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getAdminSurcharge', getAdminSurcharge)
  const resData = data?.data?.data?.list
  console.log('resData => ', resData)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, StandardSurchargeFields))
    }
  }, [isSuccess, resData])

  console.log('getRow =>', getRow)

  // DELETE
  const mutation = useMutation(deleteAdminSurcharge, {
    onSuccess: () => {
      queryClient.invalidateQueries('destination')
    },
  })

  const handleRemoveBtn = useCallback(() => {
    if (isArray(checkedArray) && checkedArray.length > 0) {
      if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
        checkedArray.forEach((item) => {
          mutation.mutate(item['할증 고유 번호']) //mutation.mutate로 api 인자 전해줌
        })
      }
    } else {
      alert('선택해주세요!')
    }
  }, [checkedArray])

  // Edit
  const editMutation = useMutationQuery('', editAdminSurcharge)
  const propsEdit = () => {
    editMutation.mutate(editInput)
  }

  const [editInput, setEditInput] = useState({
    uid: '',
    effectDate: '',
    effectCost: '',
  })

  useEffect(() => {
    setEditInput({ ...editInput, effectDate: moment(startDate).format('YYYY-MM-DD hh:mm:ss'), uid: uidAtom })
  }, [startDate, uidAtom])

  console.log('editInput', editInput)
  const onEditHandler = useCallback(
    (e) => {
      console.log('Edit input event:', e)
      const { name, value } = e.target
      setEditInput({ ...editInput, [name]: value })
    },
    [editInput],
  )

  // API에 맞게 한글 -> 영문으로 key 변경 (수정 Modal Input의 key를 변경시킨다)
  const convertKey = {
    적용단가: 'effectCost',
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>운반비 관리</h1>
            <SubTitle>
              <Link to={'/standard/transportation'}>
                <h6>운반비 관리</h6>
              </Link>
              <h5>할증 관리</h5>
            </SubTitle>
          </div>
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
      </div>

      <TableTitle>
        <StyledHeading isActive={types === 0} onClick={() => setTypes(0)}>
          매입 할증
        </StyledHeading>
        <StyledSubHeading isActive={types === 1} onClick={() => setTypes(1)}>
          매출 할증
        </StyledSubHeading>
      </TableTitle>
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

        <Table getCol={getCol} getRow={getRow} />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleRemoveBtn}>할증 삭제</WhiteRedBtn>
            <WhiteBlackBtn>할증 등록</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            저장
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
      {btnCellModal && (
        // Edit
        <TransportModal
          btnCellModal={btnCellModal} // Modal Atom Switch
          setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
          modalInTable={StandardSurchargeEdit} // Modal 안에 들어갈 Table 매칭 디렉토리 ex)
          title={'할증 수정'}
          getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
          uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
          onEditHandler={onEditHandler} // edit 버튼의 함수를 스프레드 func를 전달
          propsHandler={propsEdit} // 실질 patch 역할하는 함수
          editTitle={'할증 고유 번호'}
          convertKey={convertKey}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      )}
    </FilterContianer>
  )
}

export default Transport
