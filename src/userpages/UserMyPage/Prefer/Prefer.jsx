import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import {
  GreyBtn,
  ExcelBtn,
  WhiteGrnBtn,
  IndigoBtn,
  BlueBtn,
  SkyBtn,
  SwitchBtn,
  TGreyBtn,
  TWhiteBtn,
} from '../../../common/Button/Button'
import Test3 from '../../../pages/Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'

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
  TCSubContainer,
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
} from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import Table from '../../../pages/Table/Table'
import { UserPageUserPreferFields, UserPageUserPreferFieldsCols } from '../../../constants/admin/UserManage'
import { useAtom } from 'jotai'
import { deleteCustomerfavorite, getCustomerfavorite } from '../../../api/myPage'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { useCallback } from 'react'
import { isArray } from 'lodash'

const Prefer = ({ setChoiceComponent }) => {
  const radioDummy = ['전체', '미진행', '진행중', '종료']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

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

  // ====================================================================================
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(UserPageUserPreferFieldsCols)
  const getCol = tableField.current
  const checkedArray = useAtom(selectedRowsAtom)[0]

  const 임의데이터 = {
    pageNum: 1,
    pageSize: 50,
  }
  const { isLoading, isError, data, isSuccess } = useReactQuery(임의데이터, 'getCustomerfavorite', getCustomerfavorite)
  const resData = data?.data?.data?.list

  if (isError) console.log('데이터 request ERROR')

  useEffect(() => {
    let getData = resData
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, UserPageUserPreferFields))
    }
  }, [isSuccess, resData])
  // 삭제
  const mutation = useMutationQuery('userManage', deleteCustomerfavorite)
  const handleRemoveBtn = useCallback(() => {
    if (!isArray(checkedArray) || checkedArray.length === 0) return alert('선택해주세요!')

    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      checkedArray.forEach((item) => {
        mutation.mutate(item['uid']) //mutation.mutate로 api 인자 전해줌
      })
    }
  }, [checkedArray])

  const goPostPage = () => {
    setChoiceComponent('등록')
  }
  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>선호제품 관리</h1>
        </div>
        {/* 토글 쓰기 */}
      </FilterHeader>

      <TableContianer>
        <TCSubContainer bor>
          <div></div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <WhiteRedBtn onClick={handleRemoveBtn}>선택 삭제</WhiteRedBtn>
            <SkyBtn onClick={goPostPage}>등록</SkyBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} setChoiceComponent={setChoiceComponent} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Prefer
