import { useEffect, useState, useCallback, useRef } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn, WhiteSkyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'

import Table from '../../Table/Table'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { FilterWrap } from '../../../modal/External/ExternalFilter'
import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  InputStartWrap,
  FilterHeaderAlert,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'

import { StandardDestinaionFields, StandardDestinaionFieldsCols } from '../../../constants/admin/Standard'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import { getAdminDestination, deleteAdminDestination } from '../../../service/admin/Standard'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { isArray } from 'lodash'
import Test3 from '../../Test/Test3'
import { modalAtom, popupAtom, popupObject, popupTypeAtom } from '../../../store/Layout/Layout'
import Upload from '../../../modal/Upload/Upload'
import { popupDummy } from '../../../modal/Alert/PopupDummy'
import AlertPopup from '../../../modal/Alert/AlertPopup'

const Destination = ({}) => {
  const [modalSwitch, setModalSwitch] = useAtom(modalAtom)
  const openModal = () => {
    setModalSwitch(true)
  }
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  console.log('popupSwitch !!!!!!!', popupSwitch)
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체

  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

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

  // ---------------------------------------------------------------------------------------------

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(StandardDestinaionFieldsCols)
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
  console.log('resData => ', resData)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, StandardDestinaionFields))
    }
  }, [isSuccess, resData])

  console.log('getRow =>', getRow)

  console.log('nowPopup', nowPopup)

  // DELETE
  const mutation = useMutation(deleteAdminDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('destination')
    },
  })

  const propsRemove = () => {
    checkedArray.forEach((item) => {
      mutation.mutate(item['목적지 고유 번호']) //mutation.mutate로 api 인자 전해줌
    })
  }
  const test = () => {
    console.log(123)
  }

  const firstPopupClick = useCallback(
    (num) => {
      if (isArray(checkedArray) && checkedArray.length > 0) {
        setPopupSwitch(true)
        const firstPopup = popupDummy.find((popup) => popup.num === num)
        setNowPopup({ ...firstPopup, func: propsRemove })
      } else {
        alert('선택해주세요!')
      }
    },
    [checkedArray],
  )

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

  console.log('checkedArray =>', checkedArray)

  console.log('popupSwitch', popupSwitch)

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
      </TableContianer>
      {popupSwitch && <AlertPopup propsRemove={propsRemove} />}
      {modalSwitch && <Upload modalSwitch={modalSwitch} setModalSwitch={setModalSwitch} title={'목적지 등록'} />}
    </FilterContianer>
  )
}

export default Destination
