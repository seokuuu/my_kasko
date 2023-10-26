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
import { FilterWrap } from '../../../../modal/External/ExternalFilter'
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

const Claim = ({}) => {
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
            <h1>일반 관리</h1>
            <SubTitle>
              <h5>클레임 관리</h5>

              <Link to={`/operate/faq`}>
                <h6>FAQ 관리</h6>
              </Link>
              <Link to={`/operate/notice`}>
                <h6>공지사항</h6>
              </Link>
              <Link to={`/operate/datasheet`}>
                <h6>자료실</h6>
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
                    <h6>작성 일자</h6>
                    <GridWrap>
                      <DateGrid bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>

                  <PartWrap style={{ marginLeft: '20px' }}>
                    <h6>제품 상태</h6>
                    <MainSelect />
                  </PartWrap>
                  <PartWrap />
                </RowWrap>
              </FilterLeft>
              <FilterRight>
                <DoubleWrap>
                  <h6>제품 번호 </h6>
                  <textarea
                    placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                    style={{ height: '100px' }}
                  />
                </DoubleWrap>
              </FilterRight>
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
            클레임 목록(선택 <span>2</span> / 50개 )
          </div>
          <div></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span> (명)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>클레임 삭제</WhiteRedBtn>
            <SkyBtn>클레임 등록</SkyBtn>
          </div>
        </TCSubContainer>

        <Test3 title={'규격 약호 찾기'} />
      </TableContianer>
    </FilterContianer>
  )
}

export default Claim
