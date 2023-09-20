import { useState } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn, SkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
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
import Table from '../../Table/Table'
import { delete_userManage, get_userManage } from '../../../api/userManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { useEffect } from 'react'
import { useRef } from 'react'
import { UserManageFields, UserManageFieldsCols } from '../../../constants/admin/UserManage'
import { add_element_field } from '../../../lib/tableHelpers'
import { useQueryClient } from '@tanstack/react-query'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { useCallback } from 'react'
// import { isArray } from 'lodash'
import { isArray, isEmptyArray } from '../../../lib'

const UserManage = ({ setChoiceComponent }) => {
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

  // -----------------------------------------------------------------------------------
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(UserManageFieldsCols)
  const getCol = tableField.current
  const queryClient = useQueryClient()
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const 임의데이터 = {
    pageNum: 1,
    pageSize: 50,
  }
  const { isLoading, isError, data, isSuccess } = useReactQuery(임의데이터, 'userManage', get_userManage)
  const resData = data?.data?.data?.list

  if (isError) console.log('데이터 request ERROR')

  useEffect(() => {
    let getData = resData
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, UserManageFields))
    }
  }, [isSuccess, resData])

  // // 삭제
  const mutation = useMutationQuery('userManage', delete_userManage)
  const handleRemoveBtn = useCallback(() => {
    if (!isArray(checkedArray) || checkedArray.length === 0) return alert('선택해주세요!')

    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      checkedArray.forEach((item) => {
        mutation.mutate(item['순번']) //mutation.mutate로 api 인자 전해줌
      })
    }
  }, [checkedArray])

  const goPostPage = () => {
    setChoiceComponent('등록')
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>사용자 관리</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6 style={{ width: '100px' }}>고객 검색</h6>
                    <MainSelect />
                    <Input style={{ marginLeft: '10px' }} />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
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
            <WhiteRedBtn onClick={handleRemoveBtn}>사용자 삭제</WhiteRedBtn>
            <SkyBtn onClick={goPostPage}>사용자 등록</SkyBtn>
          </div>
        </TCSubContainer>
        <Table setChoiceComponent={setChoiceComponent} getCol={getCol} getRow={getRow} />
      </TableContianer>
    </FilterContianer>
  )
}

export default UserManage
