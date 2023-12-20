import { useState } from 'react'

import { useAtom } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'
import { delete_userManage, get_userManage } from '../../../api/userManage'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import Hidden from '../../../components/TableInner/Hidden'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { UserManageFields, UserManageFieldsCols } from '../../../constants/admin/UserManage'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
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
  StyledHeading,
  StyledSubHeading,
  SubTitle,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import {
  blueModalAtom,
  btnCellRenderAtom,
  selectedRowsAtom,
  toggleAtom,
  UsermanageUserPostModal,
} from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
// import { isArray } from 'lodash'
import { isArray } from '../../../lib'
import ClientPostModal from '../Client/ClientPostModal'

const UserManage = ({ setChoiceComponent }) => {
  const [uidAtom, setUidAtom] = useAtom(btnCellRenderAtom)
  console.log('uidAtom', uidAtom)
  const [postModal, setPostModal] = useAtom(UsermanageUserPostModal)
  const [types, setTypes] = useState('kasko') //kasko, hyundai, carrier, storage
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
          <div style={{ display: 'flex' }}>
            <h1>사용자 관리</h1>
            <SubTitle>
              <StyledHeading isActive={types === 'kasko'} onClick={() => setTypes('kasko')}>
                카스코철강
              </StyledHeading>
              <StyledHeading isActive={types === 'hyundai'} onClick={() => setTypes('hyundai')}>
                현대제철
              </StyledHeading>
              <StyledHeading isActive={types === 'carrier'} onClick={() => setTypes('carrier')}>
                운송사
              </StyledHeading>
              <StyledSubHeading isActive={types === 'storage'} onClick={() => setTypes('storage')}>
                창고사
              </StyledSubHeading>
            </SubTitle>
          </div>
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
            <SkyBtn
              onClick={() => {
                setPostModal(true)
              }}
            >
              사용자 등록
            </SkyBtn>
          </div>
        </TCSubContainer>
        {postModal && <ClientPostModal setEditModal={setPostModal} />}
        <Table setChoiceComponent={setChoiceComponent} getCol={getCol} getRow={getRow} />
      </TableContianer>
    </FilterContianer>
  )
}

export default UserManage
