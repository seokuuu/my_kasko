import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useClaimListQuery } from '../../../../api/operate/claim'
import { BlackBtn, SkyBtn, WhiteRedBtn } from '../../../../common/Button/Button'
import { MainSelect } from '../../../../common/Option/Main'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import HeaderToggle from '../../../../components/Toggle/HeaderToggle'
import { ClaimListFieldCols, ClaimListFields } from '../../../../constants/admin/Claim'
import { add_element_field } from '../../../../lib/tableHelpers'
import {
  DoubleWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  FilterWrap,
  GridWrap,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde,
} from '../../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import CategoryTab from '../../UI/CategoryTab'
import { normalTabOptions } from '../../constants'

const Claim = ({}) => {
  // 목록 API(REQUEST PARAMETER)
  const [search, setSearch] = useState({
    pageNum: 1,
    pageSize: 5,
  })

  // 목록 리스트
  const [row, setRow] = useState([])

  // 목록 API
  const { data } = useClaimListQuery(search)

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

  useEffect(() => {
    if (data) {
      setRow(add_element_field(data.list, ClaimListFields))
    }
  }, [data])

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>일반 관리</h1>
            <CategoryTab options={normalTabOptions} highLightValue="claim" />
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
        <Table getCol={ClaimListFieldCols} getRow={row} />
        {/* <Test3 title={'규격 약호 찾기'} /> */}
      </TableContianer>
    </FilterContianer>
  )
}

export default Claim
