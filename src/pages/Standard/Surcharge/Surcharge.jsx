import { useCallback, useEffect, useRef, useState } from 'react'

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
import { blueModalAtom, toggleAtom, surEditModalAtom } from '../../../store/Layout/Layout'
import { addPropertyToObject } from '../../../utils/utils'

import { Link } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray } from 'lodash'
import { StandardSurchargeFields, StandardSurchargeFieldsCols } from '../../../constants/admin/Standard'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import TransportModal from '../../../modal/Multi/Transport'
import {
  deleteAdminSurcharge,
  editAdminSurcharge,
  getAdminSurcharge,
  postAdminSurcharge,
} from '../../../service/admin/Standard'
import { btnCellRenderAtom, btnCellUidAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'

import { popupAtom, popupObject, popupTypeAtom } from '../../../store/Layout/Layout'

import { popupDummy } from '../../../modal/Alert/PopupDummy'
import AlertPopup from '../../../modal/Alert/AlertPopup'

const Transport = ({}) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [types, setTypes] = useState(0) // 매입 매출 구분 (0: 매입 / 1: 매출)
  const [startDate, setStartDate] = useState(new Date()) // 수정 버튼 Date
  const [modalMode, setModalMode] = useAtom(surEditModalAtom)
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)

  console.log('uidAtom', uidAtom)

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
      queryClient.invalidateQueries('surcharge')
    },
  })

  // const handleRemoveBtn = useCallback(() => {
  //   if (isArray(checkedArray) && checkedArray.length > 0) {
  //     if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
  //       checkedArray.forEach((item) => {
  //         mutation.mutate(item['할증 고유 번호']) //mutation.mutate로 api 인자 전해줌
  //       })
  //     }
  //   } else {
  //     alert('선택해주세요!')
  //   }
  // }, [checkedArray])

  // 선택한 것 삭제 요청 (해당 함수 func 인자로 전달)
  const propsRemove = () => {
    checkedArray.forEach((item) => {
      mutation.mutate(item['운반비 고유 번호']) //mutation.mutate로 api 인자 전해줌
    })
  }

  const handleRemoveBtn = useCallback(
    (num) => {
      if (isArray(checkedArray) && checkedArray.length > 0) {
        setPopupSwitch(true)
        const firstPopup = popupDummy.find((popup) => popup.num === num)
        setNowPopup((prevNowPopup) => ({
          ...prevNowPopup,
          ...firstPopup,
          func: propsRemove,
        }))
      } else {
        alert('선택해주세요!')
      }
    },
    [checkedArray],
  )

  // post , input
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
  })

  // 매칭
  const convertInputKey = {
    input1: 'lengthMin',
    input2: 'lengthMax',
    input3: 'widthMin',
    input4: 'widthMax',
    input5: 'percent',
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    const newValue = name === 'input5' ? parseInt(value, 10) : value
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }))
  }

  // inputValues key & convertInputKey value 매칭
  const transformInputValues = (inputValues) => {
    const transformedValues = {}
    for (const key in inputValues) {
      const convertedKey = convertInputKey[key]
      transformedValues[convertedKey] = inputValues[key]
    }
    return transformedValues
  }

  // 변환된 수정 input 값
  const transformedValues = transformInputValues(inputValues)

  // for edit add Uid
  const forEdit = addPropertyToObject(transformedValues, 'uid', uidAtom)

  // for post add type
  const forPost = addPropertyToObject(transformedValues, 'type', types)

  // Post
  const postMutation = useMutationQuery('', postAdminSurcharge)
  const propsPost = () => {
    console.log('!!! 등록')
    postMutation.mutate(forPost)
  }

  // Edit
  const editMutation = useMutationQuery('', editAdminSurcharge)
  const propsEdit = () => {
    console.log('!!! 수정')
    editMutation.mutate(forEdit)
  }

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
            <WhiteRedBtn
              onClick={() => {
                handleRemoveBtn('2-2')
              }}
            >
              할증 삭제
            </WhiteRedBtn>
            <WhiteBlackBtn
              onClick={() => {
                setBtnCellModal(true)
                setModalMode('등록')
              }}
            >
              할증 등록
            </WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            저장
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
      {modalMode === '등록' && btnCellModal && (
        // Edit
        <TransportModal
          btnCellModal={btnCellModal} // Modal Atom Switch
          setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
          title={'할증 등록'}
          getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
          uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
          onChangeHandler={onChangeHandler} // edit 버튼의 함수를 스프레드 func를 전달
          propsHandler={propsPost} // 실질 patch 역할하는 함수
          editTitle={'할증 고유 번호'}
          convertKey={convertKey}
          startDate={startDate}
          setStartDate={setStartDate}
          data1={'길이 입력'}
          data2={'폭 입력'}
          data3={'할증'}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      )}
      {modalMode === '수정' && btnCellModal && (
        // Edit
        <TransportModal
          btnCellModal={btnCellModal} // Modal Atom Switch
          setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
          title={'할증 수정'}
          getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
          uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
          onChangeHandler={onChangeHandler} // edit 버튼의 함수를 스프레드 func를 전달
          propsHandler={propsEdit} // 실질 patch 역할하는 함수
          editTitle={'할증 고유 번호'}
          convertKey={convertKey}
          startDate={startDate}
          setStartDate={setStartDate}
          data1={'길이 입력'}
          data2={'폭 입력'}
          data3={'할증'}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      )}
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </FilterContianer>
  )
}

export default Transport
