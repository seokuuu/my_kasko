import { useEffect, useRef, useState } from 'react'
import { BlackBtn, BtnBound, GreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { MainSelect, usermanageClientStatusOptions } from '../../../common/Option/Main'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import {
  ExCheckDiv,
  ExCheckWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterSubcontianer,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { alertAtom, alertAtom2, AuctionRestrictionModal } from '../../../store/Layout/Layout'

import ClientAuctionRestrictionModal from './ClientAuctionRestrictionModal'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isArray } from 'lodash'
import { useCallback } from 'react'
import { deleteCustomer, getCustomer, postChangeAuction } from '../../../api/userManage'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserManageCustomerManageFields, UserManageCustomerManageFieldsCols } from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
// import { log } from '../../../lib'
import { isString } from 'lodash'
import TableTest from '../../Table/TableTest'
import { userpageDestinationEdit } from '../../../store/Layout/Layout'
import ClientModal from './ClientModal'
import { btnCellUidAtom } from '../../../store/Layout/Layout'

const Client = ({ setChoiceComponent, setModal }) => {
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [editModal, setEditModal] = useAtom(userpageDestinationEdit)
  console.log('editModal', editModal)
  const [restrict, setRestrict] = useState()
  const [selectedValue, setSelectedValue] = useState('') // 경매 제한 상태
  const radioDummy = ['전체', '대표']
  // const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  const [savedRadioValue, setSavedRadioValue] = useState('')
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    // if (checkedIndex !== -1) {
    //   const selectedValue = radioDummy[checkedIndex];
    //   setSavedRadioValue(selectedValue); //내 state에 반환
    //   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
    // }
  }, [checkRadio])
  const checkSales = ['일반', '장기 미접속', '장기 미낙찰', '폐업', '정지']

  const checkShips = ['전체', '승인', '미승인', '대기']

  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
  const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))
  const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))

  useEffect(() => {
    const updatedCheck = checkSales.map((value, index) => {
      return check1[index] ? value : ''
    })
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData1(filteredCheck)
  }, [check1])

  useEffect(() => {
    const updatedCheck = checkShips.map((value, index) => {
      return check2[index] ? value : ''
    })
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData2(filteredCheck)
  }, [check2])

  const handleSelectChange = (selectedOption, name) => {}
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

  // ✅필드이름 설정(col)
  const 테이블필드 = useRef(UserManageCustomerManageFieldsCols)
  const getCol = 테이블필드.current

  const queryObject = {
    pageNum: 1,
    pageSize: 50,
    status: '', //회원 상태 (일반 / 장기 미접속 / 장기 미낙찰 / 폐업 / 정지)
    approvalStatus: '', //승인 여부 (0: 미승인 / 1: 승인)
    category: '', //(고객사 / 고객 코드 / 사업자 번호)
    keyword: '', //검색어 ex. 회사명1
  }

  const [query, setQuery] = useState(queryObject)
  const [getRow, setGetRow] = useState('')

  const { isLoading, isError, data, isSuccess } = useReactQuery(query, 'getClient', getCustomer)
  const responseData = data?.data?.list

  console.log('responseData', responseData)

  if (isError) {
    console.log('데이터 request ERROR')
  }

  useEffect(() => {
    if (!isSuccess && !responseData) return
    if (Array.isArray(responseData)) {
      setGetRow(add_element_field(responseData, UserManageCustomerManageFields))
    }
  }, [isSuccess, responseData])

  // ✅mutation delete작업
  const checkedArray = useAtom(selectedRowsAtom)[0]
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries('getClient')
    },
  })

  const handleRemoveBtn = useCallback(() => {
    if (!isArray(checkedArray) || !checkedArray.length > 0) return alert('선택해주세요!')
    // setRemoveModal(true)
  }, [checkedArray])

  const setPostPage = () => {
    setModal(true)
  }
  const openAuctionModal = () => {
    if (!checkedArray) return alert('고객을 선택해주세요')
    setAuctionModal(true)
  }

  const mutationDestrict = useMutation(postChangeAuction, {
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

  // 경매 제한 상태 변경
  const mutationAuction = useMutation(postChangeAuction, {
    onSuccess: () => {
      console.log('SUCCESS MUTATION')
      queryClient.invalidateQueries('getClient')
      queryClient.refetchQueries('getClient')
    },
  })
  console.log('selectedValue', selectedValue, checkedArray)

  const clientRestrict = async () => {
    console.log('!!! 제한 함수 실행 !!!')
    if (selectedValue === undefined) return alert('선택해주세요 ')
    else if (selectedValue) {
      console.log('!!! 제한 함수 실행2 !!!')

      let req = { uids: [], auctionStatus: '' }
      checkedArray?.forEach((item) => {
        req.uids.push(item['순번'])
        req.auctionStatus = selectedValue
      })

      // mutationAuction.mutate의 비동기 작업이 완료된 후에 실행될 코드
      await mutationAuction.mutate(req)

      // mutationAuction.mutate 완료 후에 값을 확인
      setRestrict(req)
      console.log('restrict', restrict) // req 값을 사용
    }
  }

  const confirm = (value) => {
    // if (value === true) return setCheckRemoveModal(false)
  }

  const handleCheckRemove = (value) => {
    if (value === true) {
      checkedArray.forEach((item) => {
        mutation.mutate(item['고객 구분'], {
          onError: (error) => {
            alert('에러가 발생했습니다' + error.message)
            // setRemoveModal(false)
          },
          onSuccess: () => {
            // setRemoveModal(false)
            // setCheckRemoveModal(true) //재차확인 모달
          },
        })
      })
    }
    // if (value === false) return setRemoveModal(false)
  }

  // //Modal
  const [auctionModal, setAuctionModal] = useAtom(AuctionRestrictionModal)
  const [removeModal, setRemoveModal] = useAtom(alertAtom)
  const [checkRemoveModal, setCheckRemoveModal] = useAtom(alertAtom2)
  return (
    <>
      <FilterContianer>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>고객사 관리</h1>
          </div>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>

        {exFilterToggle && (
          <>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>회원 상태</h6>
                    <ExCheckWrap>
                      {checkSales.map((x, index) => (
                        <ExCheckDiv>
                          <StyledCheckSubSquDiv
                            // CheckBox 수정
                            onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                            isChecked={check1[index]}
                          >
                            <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
                          </StyledCheckSubSquDiv>
                          <p>{x}</p>
                        </ExCheckDiv>
                      ))}
                    </ExCheckWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>고객사 유형</h6>
                    <MainSelect />
                  </PartWrap>
                  <PartWrap style={{ width: '500px' }} />
                </RowWrap>
                <RowWrap style={{ borderBottom: '0px' }}>
                  <PartWrap>
                    <h6>승인 상태</h6>
                    <ExCheckWrap>
                      {checkShips.map((x, index) => (
                        <ExCheckDiv>
                          <StyledCheckSubSquDiv
                            onClick={() => setCheck2(CheckBox(check2, check2.length, index, true))}
                            isChecked={check2[index]}
                          >
                            <CheckImg2 src="/svg/check.svg" isChecked={check2[index]} />
                          </StyledCheckSubSquDiv>
                          <p>{x}</p>
                        </ExCheckDiv>
                      ))}
                    </ExCheckWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>회원 상태</h6>
                    <MainSelect options={usermanageClientStatusOptions} name="category" />
                    <Input style={{ marginLeft: '5px' }} />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
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
          </>
        )}
        <TableContianer>
          <TCSubContainer bor>
            <div>
              고객 정보 목록 (선택 <span>{checkedArray?.length || 0}</span> /{getRow?.length || 0} 개)
              <Hidden />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown />
              <Excel />
            </div>
          </TCSubContainer>
          <TCSubContainer>
            <div>
              선택 <span> {checkedArray?.length || 0} </span>(명)
              <span></span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <WhiteRedBtn onClick={openAuctionModal}>회원 제한</WhiteRedBtn>
              <BtnBound />
              <WhiteRedBtn onClick={handleRemoveBtn}>회원 삭제</WhiteRedBtn>
              <WhiteSkyBtn onClick={setPostPage}>회원 생성</WhiteSkyBtn>
            </div>
          </TCSubContainer>
          <TableTest getCol={getCol} getRow={getRow} />
          {/* <Test3 /> */}
        </TableContianer>
      </FilterContianer>
      {auctionModal && (
        <ClientAuctionRestrictionModal
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue} //경매 제한 상태
          setAuctionModal={setAuctionModal}
          clientRestrict={clientRestrict}
        />
      )}
      {/* {checkRemoveModal && <AlertModal type={1} title={'삭제가 완료되었습니다'} onClick={confirm} />}

        {removeModal && (
          <RemoveCheckModal
            onClick={handleCheckRemove}
            type={2}
            title={'사용자를 삭제하면 해당 사용자의 \n 데이터가 삭제 됩니다. 삭제 하시겠습니까?'}
          />
        )} */}
      {editModal && <ClientModal setEditModal={setEditModal} uidAtom={uidAtom} />}
    </>
  )
}

export default Client
