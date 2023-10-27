import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { BlackBtn, GreyBtn, TGreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import {
  CustomInput,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterSubcontianer,
  FilterWrap,
  GridWrap,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
  StyledHeading,
  StyledSubHeading,
  SubTitle,
  TCSubContainer,
  TableBottomWrap,
  TableContianer,
  TableTitle,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import Upload from '../../../modal/Upload/Upload'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'

import { popupDummy } from '../../../modal/Alert/PopupDummy'

import { Link } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import { useRef } from 'react'

import {
  StandardTransportationEdit,
  StandardTransportationFields,
  StandardTransportationFieldsCols,
  StandardTransportationPost,
} from '../../../constants/admin/Standard'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray } from 'lodash'
import moment from 'moment'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import TableModal from '../../../modal/Table/TableModal'
import {
  deleteAdminTransportation,
  editAdminTransportation,
  getAdminTransportation,
} from '../../../service/admin/Standard'
import {
  btnCellRenderAtom,
  btnCellUidAtom,
  destiDelPopupAtom,
  destiPostModalAtom,
  popupObject,
  selectedRowsAtom,
} from '../../../store/Layout/Layout'

const Transport = ({}) => {
  const [modalSwitch, setModalSwitch] = useAtom(destiPostModalAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [startDate, setStartDate] = useState(new Date()) // 수정 버튼 Date
  const [startDate2, setStartDate2] = useState(new Date()) // 하단 적용일자 Date

  const radioDummy = ['증가', '감소']
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

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

  const modalOpen = () => {
    setIsModal(true)
  }

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(StandardTransportationFieldsCols)
  const originEngRowField = StandardTransportationFields
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]
  const uids = checkedArray?.map((item) => item['운반비 고유 번호'])
  const [types, setTypes] = useState(0) // 매입 매출 구분 (0: 매입 / 1: 매출)

  console.log('checkedArray', checkedArray)

  console.log('getRow', getRow)

  console.log('types', types)

  const Param = {
    pageNum: 1,
    pageSize: 5,
    type: types, // (0: 매입 / 1: 매출)
  }

  // GET
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getAdminTransportation', getAdminTransportation)
  const resData = data?.data?.data?.list
  console.log('resData => ', resData)

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, StandardTransportationFields))
    }
  }, [isSuccess, resData])

  console.log('getRow =>', getRow)

  // DELETE
  const mutation = useMutation(deleteAdminTransportation, {
    onSuccess: () => {
      queryClient.invalidateQueries('transportation')
    },
  })

  // 선택한 것 삭제 요청 (해당 함수 func 인자로 전달)
  const propsRemove = () => {
    checkedArray.forEach((item) => {
      mutation.mutate(item['운반비 고유 번호']) //mutation.mutate로 api 인자 전해줌
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

  const propsPost = () => {}

  // POST
  const openModal = () => {
    setModalSwitch(true)
    setNowPopup((prev) => ({
      ...prev,
      func: propsPost,
    }))
  }

  console.log('btnCellModal', btnCellModal)

  console.log('getCol', getCol)
  console.log('getRow', getRow)

  // Edit
  const editMutation = useMutationQuery('', editAdminTransportation)
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

  console.log('editInput', editInput)

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>운반비 관리</h1>
            <SubTitle>
              <h5>운반비 관리</h5>
              <Link to={'/standard/surcharge'}>
                <h6>할증 관리</h6>
              </Link>
            </SubTitle>
          </div>
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>출발지</h6>
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>목적지</h6>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
                  <PartWrap>
                    <h6>적용일자</h6>
                    <GridWrap>
                      <DateGrid bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>제품구분</h6>
                    <MainSelect />
                  </PartWrap>
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

      <TableTitle>
        <StyledHeading isActive={types === 0} onClick={() => setTypes(0)}>
          매입 운반비
        </StyledHeading>
        <StyledSubHeading isActive={types === 1} onClick={() => setTypes(1)}>
          매출 운반비
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
            <Excel getRow={getRow} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <TCSubDiv>
            <div>
              선택 <span>0</span>(개)
            </div>
          </TCSubDiv>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn
              onClick={() => {
                firstPopupClick('2-2')
              }}
            >
              운반비 삭제
            </WhiteRedBtn>
            <WhiteSkyBtn
              onClick={() => {
                openModal()
              }}
            >
              운반비 등록
            </WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <TCGreyDiv>
            <div>
              <p style={{ marginRight: '10px' }}>적용일자</p>
              <DateGrid
                startDate={startDate2}
                setStartDate={setStartDate2}
                height={30}
                width={130}
                bgColor={'white'}
                fontSize={15}
              />
            </div>
            <div>
              <p style={{ marginLeft: ' 20px' }}>단가 일괄 수정</p>
              <div style={{ display: 'flex', gap: '10px', margin: '0px 15px', padding: '5px' }}>
                {radioDummy.map((text, index) => (
                  <RadioMainDiv key={index}>
                    <RadioCircleDiv
                      isChecked={checkRadio[index]}
                      onClick={() => {
                        setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                      }}
                    >
                      <RadioInnerCircleDiv />
                    </RadioCircleDiv>
                    <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                  </RadioMainDiv>
                ))}
              </div>
            </div>
            <div></div>
            <CustomInput placeholder="% 입력" style={{ marginRight: '5px' }} width={140} height={30} />
            <TGreyBtn>적용</TGreyBtn>
          </TCGreyDiv>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>

        <Table getCol={getCol} getRow={getRow} />
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            저장
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
      {btnCellModal && (
        // Edit
        <TableModal
          btnCellModal={btnCellModal} // Modal Atom Switch
          setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
          modalInTable={StandardTransportationEdit} // Modal 안에 들어갈 Table 매칭 디렉토리 ex)
          title={'운반비 수정'}
          getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
          uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
          onEditHandler={onEditHandler} // edit 버튼의 함수를 스프레드 func를 전달
          propsHandler={propsEdit} // 실질 patch 역할하는 함수
          editTitle={'운반비 고유 번호'}
          convertKey={convertKey}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      )}
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
      {modalSwitch && (
        // Post
        <Upload
          modalSwitch={modalSwitch}
          setModalSwitch={setModalSwitch}
          title={'운반비 등록'}
          propsHandler={propsPost}
          modalInTable={StandardTransportationPost}
          getRow={getRow}
          uidAtom={uidAtom}
          onEditHandler={onEditHandler}
        />
      )}
    </FilterContianer>
  )
}

export default Transport

const TCSubDiv = styled.div``

const TCGreyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }

  p {
    color: ${(props) => props.theme.colors.TxtAlter};
    font-size: 16px;
  }
`
