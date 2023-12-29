import { useState, useEffect } from 'react'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import Table from '../../../pages/Table/Table'
import { toggleAtom } from '../../../store/Layout/Layout'

import {
  FilterContianer,
  FilterHeader,
  SubTitle,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

const FAQ = ({ faqList }) => {
  const [faqListData, setFaqListData] = useState(null)

  useEffect(() => {
    setFaqListData(faqList)
  }, [faqList])

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

  const colLabels = [
    { field: '순번', minWidth: 100 },
    { field: '카테고리', minWidth: 100 },
    { field: '제목', minWidth: 100 },
    { field: '작성일자', minWidth: 100 },
  ]

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>FAQ</h1>
          <SubTitle>
            <h5>경매</h5>
            <h6>상시판매</h6>
            <h6>입금</h6>
            <h6>약관</h6>
            <h6>출고</h6>
            <h6>기타</h6>
          </SubTitle>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>

      <TableContianer>
        <TCSubContainer bor>
          <div>게시글 목록 (123개 )</div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <Table getCol={colLabels} getRow={faqList} />
      </TableContianer>
    </FilterContianer>
  )
}

export default FAQ
