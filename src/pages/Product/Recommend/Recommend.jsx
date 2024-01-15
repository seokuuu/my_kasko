import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import { TableBottomWrap } from '../../../modal/External/ExternalFilter'
import {
  FilterContianer,
  FilterHeader,
  TableContianer,
  SubTitle,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { WhiteBlackBtn, WhiteRedBtn, BlackBtn } from '../../../common/Button/Button'
import { Link } from 'react-router-dom'
import { getSingleProducts } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import Hidden from '../../../components/TableInner/Hidden'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import { add_element_field } from '../../../lib/tableHelpers'
import { useAtom } from 'jotai'
import { packageUidsAtom } from '../../../store/Layout/Layout'
const Recommend = ({}) => {
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)
  const [getRow, setGetRow] = useState('')
  // const [packageUids, setUids] = useAtom()
  const tableField = useRef(SingleDispatchFieldsCols)
  const getCol = tableField.current
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
  const [dragAndDrop, setDragAndDrop] = useState(true)
  const [requestParameter, setRequestParamter] = useState({
    pageNum: 1,
    pageSize: 10,
    type: '일반',
    category: '전체',
    bestStatus: '1',
  })
  const { data, isSuccess, isLoading } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
  const singleData = data?.r
  const pagination = data?.pagination

  const [pages, setPages] = useState([])
  useEffect(() => {
    // if (singleData === undefined) {
    //   SaleProductList && setFilteredData(SaleProductList)
    // }

    if (!isSuccess && !singleData) return
    if (Array.isArray(singleData)) {
      setGetRow(add_element_field(singleData, singleDispatchFields))
      setPages(pagination)
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, singleData])

  const onPageChange = (value) => {
    setRequestParamter((p) => ({ ...p, pageNum: Number(value) }))
  }
  const [uids, setUids] = useAtom(packageUidsAtom)
  console.log(uids)
  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>카스코 추천 제품 관리</h1>
          <SubTitle>
            <h5>단일</h5>
            <Link to={`/product/recommendpkg`}>
              <h6>패키지</h6>
            </Link>
          </SubTitle>
        </div>
      </FilterHeader>

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
            <WhiteBlackBtn>
              <img src="/img/belly.png" /> 순서 변경
            </WhiteBlackBtn>
            <WhiteRedBtn>추천 상품 해제</WhiteRedBtn>
          </div>
        </TCSubContainer>

        <Table
          getRow={getRow}
          getCol={getCol}
          loading={isLoading}
          dragAndDrop={true}
          // tablePagination={pages}
          // onPageChange={onPageChange}
        />
        <TCSubContainer bor>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>제품 삭제</WhiteRedBtn>
            <WhiteBlackBtn>제품 등록</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <TableBottomWrap>
          <BlackBtn width={15} height={40} onClick={() => {}}>
            저장
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
    </FilterContianer>
  )
}

export default Recommend
