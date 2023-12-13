import { useAtom } from 'jotai'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SkyBtn, WhiteRedBtn } from '../../../../common/Button/Button'
import {
  FilterContianer,
  FilterHeader,
  SubTitle,
  TCSubContainer,
  TableContianer,
} from '../../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../../store/Layout/Layout'
import Test3 from '../../../Test/Test3'

const Popup = ({}) => {
  const navigate = useNavigate()

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

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>노출 관리</h1>
            <SubTitle>
              <h5>팝업 관리</h5>
              <Link to={`/operate/noticeboard`}>
                <h6>전광판 관리</h6>
              </Link>
            </SubTitle>
          </div>
        </FilterHeader>
      </div>
      <TableContianer>
        <TCSubContainer bor>
          <div>
            팝업 목록 (선택 <span>2</span> / 50개 )
          </div>
          <div></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span>개
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>팝업 삭제</WhiteRedBtn>
            <SkyBtn onClick={() => navigate('/operate/popuppost')}>팝업 등록</SkyBtn>
          </div>
        </TCSubContainer>

        <Test3 title={'규격 약호 찾기'} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Popup
