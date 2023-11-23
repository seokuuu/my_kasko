import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect, usermanageClientStatusOptions } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, ExcelBtn, WhiteRedBtn, WhiteSkyBtn, BtnBound } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  alertAtom,
  alertAtom2,
  AuctionRestrictionModal,
  selectedRowsAtom,
  toggleAtom,
} from '../../../store/Layout/Layout'

import { CheckBox, CheckBox2 } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'

import {
  TCSubContainer,
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
  ExRadioWrap,
  SubTitle,
  FilterHeaderAlert,
  FHALeft,
  ExInputsWrap,
  ExCheckWrap,
  ExCheckDiv,
} from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'
import Table from '../../Table/Table'
import useReactQuery from '../../../hooks/useReactQuery'
import { deleteCustomer, getCustomer, postChangeAuction } from '../../../api/userManage'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { isArray } from 'lodash'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { add_element_field } from '../../../lib/tableHelpers'
import { UserManageCustomerManageFields, UserManageCustomerManageFieldsCols } from '../../../constants/admin/UserManage'
// import { log } from '../../../lib'
import TableTest from '../../Table/TableTest'
import ClientAuctionRestrictionModal from './ClientAuctionRestrictionModal'
import { isString } from 'lodash'
import AlertModal from '../../../modal/Alert/AlertModal'
import RemoveCheckModal from './RemoveCheckModal'
import { log } from '../../../lib'

const Client = ({ setChoiceComponent, setModal }) => {
  const [selectedValue, setSelectedValue] = useState('')
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

  const checkShips = ['전체', '승인', '미승인']

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
  const mutationAuction = useMutation(postChangeAuction, {
    onSuccess: () => {
      console.log('SUCCESS MUTATION')
      queryClient.invalidateQueries('getClient')
      queryClient.refetchQueries('getClient')
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
    // setAuctionModal(true)
  }

  const clientRestrict = () => {
    if (!selectedValue) return alert('선택해주세요 ')
    if (isString(selectedValue)) {
      let req = { uids: [], auctionStatus: '' }
      checkedArray.forEach((item) => {
        req.uids.push(item['순번'])
        req.auctionStatus = selectedValue
        mutationAuction.mutate(req)
        // setAuctionModal(false)
      })
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
  // const [auctionModal, setAuctionModal] = useAtom(AuctionRestrictionModal)
  // const [removeModal, setRemoveModal] = useAtom(alertAtom)
  // const [checkRemoveModal, setCheckRemoveModal] = useAtom(alertAtom2)
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
        {/* 
          {exFilterToggle && (
            <>
              <FilterSubcontianer>
                <FilterLeft>
                  <RowWrap>
                    <PartWrap>
                      <h6>고객 구분</h6>
                      <ExRadioWrap>
                        {radioDummy.map((text, index) => (
                          <RadioMainDiv key={index}>
                            <RadioCircleDiv
                              isChecked={checkRadio[index]}
                              onClick={() => {
                                setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                              }}
                            >
                              <RadioInnerCircleDiv isChecked={checkRadio[index]} />
                            </RadioCircleDiv>
                            <div style={{ display: 'flex', marginLeft: '5px' }}>
                              <p>{text}</p>
                            </div>
                          </RadioMainDiv>
                        ))}
                      </ExRadioWrap>
                    </PartWrap>
                  </RowWrap>
                  <RowWrap>
                    <PartWrap>
                      <h6>회원 상태</h6>
                      <ExCheckWrap>
                        {checkSales.map((x, index) => (
                          <ExCheckDiv>
                            <StyledCheckSubSquDiv
                              // CheckBox 수정
                              onClick={() => setCheck1(CheckBox(check1, check1.length, index, false))}
                              isChecked={check1[index]}
                            >
                              <CheckImg2 src="/svg/check.svg" />
                            </StyledCheckSubSquDiv>
                            <p>{x}</p>
                          </ExCheckDiv>
                        ))}
                      </ExCheckWrap>
                    </PartWrap>
                    <PartWrap />
                  </RowWrap>
                  <RowWrap style={{ borderBottom: '0px' }}>
                    <PartWrap>
                      <h6>승인 상태</h6>
                      <ExCheckWrap>
                        {checkShips.map((x, index) => (
                          <ExCheckDiv>
                            <StyledCheckSubSquDiv
                              onClick={() => setCheck2(CheckBox(check2, check2.length, index, false))}
                              isChecked={check2[index]}
                            >
                              <CheckImg2 src="/svg/check.svg" />
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
          )} */}
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
      {/* {auctionModal && (
          <ClientAuctionRestrictionModal
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            setAuctionModal={setAuctionModal}
            onClick={clientRestrict}
          />
        )} */}
      {/* {checkRemoveModal && <AlertModal type={1} title={'삭제가 완료되었습니다'} onClick={confirm} />}

        {removeModal && (
          <RemoveCheckModal
            onClick={handleCheckRemove}
            type={2}
            title={'사용자를 삭제하면 해당 사용자의 \n 데이터가 삭제 됩니다. 삭제 하시겠습니까?'}
          />
        )} */}
    </>
  )
}

export default Client
