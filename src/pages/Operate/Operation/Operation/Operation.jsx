import { useState } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../../common/Option/SignUp'
import { Link } from 'react-router-dom'
import { MainSelect } from '../../../../common/Option/Main'
import { BlackBtn, BlueBtn, BtnWrap, WhiteRedBtn, SkyBtn } from '../../../../common/Button/Button'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../../common/Button/Button'
import Test3 from '../../../Test/Test3'
import HeaderToggle from '../../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../../store/Layout/Layout'
import BlueBar from '../../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { FilterWrap, StyledHeading } from '../../../../modal/External/ExternalFilter'
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
  TableTitle,
  SubTitle,
  TCSubContainer,
} from '../../../../modal/External/ExternalFilter'
import Hidden from '../../../../components/TableInner/Hidden'

const Operation = ({}) => {
  const [types, setTypes] = useState('product') //product, policy, storage
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
            <h1>운영 관리</h1>
            <SubTitle>
              <StyledHeading isActive={types === 'product'} onClick={() => setTypes('product')}>
                제품군 관리
              </StyledHeading>
              <StyledHeading isActive={types === 'policy'} onClick={() => setTypes('policy')}>
                정책 관리
              </StyledHeading>
              <StyledHeading isActive={types === 'storage'} onClick={() => setTypes('storage')}>
                창고 관리
              </StyledHeading>
            </SubTitle>
          </div>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
      </div>
      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span>개
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>삭제</WhiteRedBtn>
            <SkyBtn>등록</SkyBtn>
          </div>
        </TCSubContainer>

        <Test3 title={'규격 약호 찾기'} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Operation
