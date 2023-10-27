import { useCallback, useEffect, useRef, useState } from 'react'

import { BlackBtn, GreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  FilterContianer,
  FilterFooter,
  FilterHeader,
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
import { blueModalAtom, excelToJsonAtom, modalObject, toggleAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'

import {
  StandardDestinaionFields,
  StandardDestinaionFieldsCols,
  StandardDestinationEdit,
  StandardDestinationPost,
} from '../../../constants/admin/Standard'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray } from 'lodash'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { popupDummy } from '../../../modal/Alert/PopupDummy'
import TableModal from '../../../modal/Table/TableModal'
import Upload from '../../../modal/Upload/Upload'
import {
  editAdminDestination,
  deleteAdminDestination,
  getAdminDestination,
  getAdminDestinationSearch,
  postAdminDestination,
} from '../../../service/admin/Standard'
import {
  btnCellRenderAtom,
  btnCellUidAtom,
  modalAtom,
  popupAtom,
  popupObject,
  popupTypeAtom,
  selectedRowsAtom,
} from '../../../store/Layout/Layout'

const Destination = ({}) => {
  const [modalSwitch, setModalSwitch] = useAtom(modalAtom)

  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowModal, setNowModal] = useAtom(modalObject) // 모달 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [originRowTitle, setOriginRowTitle] = useState('') // Excel row to Origin row

  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [isRotated, setIsRotated] = useState(false)

  const [excelToJson, setExcelToJson] = useAtom(excelToJsonAtom)

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

  console.log('excelToJson', excelToJson)

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(StandardDestinaionFieldsCols)
  const originEngRowField = StandardDestinaionFields
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const Param = {
    pageNum: 1,
    pageSize: 10,
  }

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getAdminDestination', getAdminDestination)
  const resData = data?.data?.data?.list

  // Get 목적지 코드 Dropdown

  const { data: data2, isSuccess2 } = useReactQuery('', 'getAdminDestinationSearch', getAdminDestinationSearch)

  console.log('data2 => ', data2)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, StandardDestinaionFields))
    }
  }, [isSuccess, resData])

  // DELETE
  const mutation = useMutation(deleteAdminDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('destination')
    },
  })

  // 선택한 것 삭제 요청 (해당 함수 func 인자로 전달)
  const propsRemove = () => {
    checkedArray.forEach((item) => {
      mutation.mutate(item['목적지 고유 번호']) //mutation.mutate로 api 인자 전해줌
    })
  }

  // 팝업 '확인' 버튼 함수 (prop으로 줄 함수 선택)
  const firstPopupClick = useCallback(
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

  // POST
  const postMutation = useMutationQuery('', postAdminDestination)
  const propsPost = () => {
    postMutation.mutate(excelToJson)
  }

  const openModal = () => {
    setModalSwitch(true)
    setNowPopup((prev) => ({
      ...prev,
      func: propsPost,
    }))
  }

  // const firstPopupClick = (num) => {
  //       if (isArray(checkedArray) && checkedArray.length > 0) {
  //         setPopupSwitch(true)
  //         const firstPopup = popupDummy.find((popup) => popup.num === num)
  //         setNowPopup(firstPopup)
  //       } else {
  //         alert('선택해주세요!')
  //       }
  // }

  // const handleRemoveBtn = useCallback(() => {
  //   if (isArray(checkedArray) && checkedArray.length > 0) {
  //     if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
  //       checkedArray.forEach((item) => {
  //         mutation.mutate(item['목적지 고유 번호']) //mutation.mutate로 api 인자 전해줌
  //       })
  //     }
  //   } else {
  //     alert('선택해주세요!')
  //   }
  // }, [checkedArray])

  // Edit
  const editMutation = useMutationQuery('', editAdminDestination)
  const propsEdit = () => {
    editMutation.mutate(editInput)
  }

  const editInit = {
    uid: '',
    name: '',
  }

  const [editInput, setEditInput] = useState(editInit)

  const onEditHandler = useCallback(
    (e) => {
      const { name, value } = e.target
      setEditInput({ ...editInput, uid: uidAtom, [name]: value })
    },
    [editInput],
  )

  console.log('editInput @@', editInput)
  console.log('uidAtom @@', uidAtom)

  console.log('resData', resData)

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>목적지 관리</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>목적지</h6>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
                  <PartWrap />
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
            <WhiteRedBtn
              onClick={() => {
                firstPopupClick('2-2')
              }}
            >
              목적지 삭제
            </WhiteRedBtn>
            <WhiteSkyBtn
              onClick={() => {
                openModal()
              }}
            >
              목적지 등록
            </WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} />
        {btnCellModal && (
          // Edit
          <TableModal
            btnCellModal={btnCellModal} // Modal Atom Switch
            setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
            modalInTable={StandardDestinationEdit} // Modal 안에 들어갈 Table 매칭 디렉토리 ex)
            title={'목적지 수정'}
            getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
            uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
            onEditHandler={onEditHandler} // edit 버튼의 함수를 스프레드 func를 전달
            propsHandler={propsEdit} // 실질 patch 역할하는 함수
            editTitle={'목적지 고유 번호'}
          />
        )}
      </TableContianer>
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
      {modalSwitch && (
        // Post
        <Upload
          modalSwitch={modalSwitch}
          setModalSwitch={setModalSwitch}
          title={'목적지 등록'}
          originEngRowField={originEngRowField}
          excelToJson={excelToJson}
          setExcelToJson={setExcelToJson}
          propsHandler={propsPost}
          modalInTable={StandardDestinationPost}
          getRow={getRow}
          uidAtom={uidAtom}
          onEditHandler={onEditHandler}
        />
      )}
    </FilterContianer>
  )
}

export default Destination
