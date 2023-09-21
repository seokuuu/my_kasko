import { useState, useEffect } from 'react'

import Excel from '../../../components/TableInner/Excel'

import { WhiteRedBtn } from '../../../common/Button/Button'

import { SkyBtn } from '../../../common/Button/Button'
import Test3 from '../../../pages/Test/Test3'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { dowbleClickedRowAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'

import useReactQuery from '../../../hooks/useReactQuery'
import { useCallback } from 'react'
import { atom, useAtom } from 'jotai'
import { isArray, isEmptyArray } from '../../../lib'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { deleteDestination } from '../../../api/myPage/userDestination'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useGetUserDestinationQuery } from '../../../hooks/queries/user/Mypage'
import { getDestination } from '../../../api/myPage'

const Destination = ({ setChoiceComponent }) => {
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

  const { userUid, setUserUid } = useState('')
  const [destination, setDestination] = useState('')
  const 임의데이터 = {
    pageNum: 1,
    pageSize: 20,
    // category: '목적지명',
    // keyword: '인천',
  }

  const { isLoading, isError, data, isSuccess } = useReactQuery(임의데이터, 'destination', getDestination)

  useEffect(() => {
    if (isSuccess && data?.data?.data?.list) {
      let getData = data?.data?.data?.list

      if (Array.isArray(getData)) {
        const newArray = getData.map((item) => ({
          '고객 코드': item.uid,
          대표: item.represent,
          '목적지 코드': item.destinationCode,
          '목적지 명': item.destinationName,
          '담당자 연락처': item.managerPhone,
          '하차지 명': item.name,
          '도착지 연락처': item.phone,
          '상세 주소': item.address,
          비고란: item.memo,
        }))
        setDestination(newArray)
      }
    }
  }, [isSuccess, data])

  // 컴포넌트 이동
  const openPost = () => {
    setChoiceComponent('등록')
  }

  const openEdit = async () => {
    setChoiceComponent('수정')
  }

  const queryClient = useQueryClient()
  const mutation = useMutation(deleteDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('destination')
    },
  })

  const checkedArray = useAtom(selectedRowsAtom)[0]

  const handleRemoveBtn = useCallback(() => {
    if (isArray(checkedArray) && checkedArray.length > 0) {
      if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
        checkedArray.forEach((item) => {
          mutation.mutate(item['고객 코드'])
        })
      }
    } else {
      alert('선택해주세요!')
    }
  }, [checkedArray])

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>목적지 관리</h1>
          </div>
        </FilterHeader>
      </div>
      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div>
            <PageDropdown />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span>개
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn onClick={handleRemoveBtn}>목적지 삭제</WhiteRedBtn>
            {/* <SkyBtn onClick={openEdit}>목적지 수정</SkyBtn> */}
            <SkyBtn onClick={openPost}>목적지 등록</SkyBtn>
          </div>
        </TCSubContainer>

        <Test3 title={'규격 약호 찾기'} getRow={destination} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Destination
