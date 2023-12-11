import { useAtom } from 'jotai'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useFaqListQuery } from '../../../../api/operate/faq'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../../../common/Button/Button'
import { MainSelect } from '../../../../common/Option/Main'
import HeaderToggle from '../../../../components/Toggle/HeaderToggle'
import { FaqListFieldCols, FaqListFields } from '../../../../constants/admin/Faq'
import { add_element_field } from '../../../../lib/tableHelpers'
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
  TCSubContainer,
  TableContianer,
} from '../../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import CategoryTab from '../../UI/CategoryTab'
import { normalTabOptions } from '../../constants'

const FAQ = ({}) => {
  // 서버 옵션(요청 변수)
  const [search, setSearch] = useState({
    pageNum: 1,
    pageSize: 5,
  })

  // 목록 API
  const { data } = useFaqListQuery(search)

  const mappingData = useMemo(
    () =>
      data
        ? data.list.map((d) => ({ ...d, createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-' }))
        : [],
    [data],
  )

  // 목록 리스트
  const [rows, setRows] = useState([])

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

  console.log('목록 데이터 :', data)

  useEffect(() => {
    if (mappingData) {
      setRows(add_element_field(mappingData, FaqListFields))
    }
  }, [mappingData])
  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>일반 관리</h1>
            <CategoryTab options={normalTabOptions} highLightValue="faq" />
          </div>
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>검색</h6>
                    <MainSelect />
                    <Input />
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
            FAQ 목록 (선택 <span>2</span> / 50개 )
          </div>
          <div></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 <span> 2 </span>(개)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>FAQ 삭제</WhiteRedBtn>
            <SkyBtn>FAQ 등록</SkyBtn>
          </div>
        </TCSubContainer>

        <Table getCol={FaqListFieldCols} getRow={rows} />
      </TableContianer>
    </FilterContianer>
  )
}

export default FAQ
