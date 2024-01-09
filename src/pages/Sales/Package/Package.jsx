import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useAtom, useAtomValue } from 'jotai'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteBlackBtn, ExcelBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { ExInputsWrap, FilterWrap, MiniInput } from '../../../modal/External/ExternalFilter'
import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  TCSubContainer,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  GridWrap,
  TableBottomWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  InputStartWrap,
  FilterHeaderAlert,
} from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'
import Table from '../../../pages/Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import useReactQuery from '../../../hooks/useReactQuery'
import { getPackageProductList } from '../../../api/packageProduct'
import { packageFieldsCols, packageResponseToTableRowMap } from '../../../constants/admin/packageProduct'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'

const Package = () => {
  const [param, setParam] = useState({
    pageNum: 1,
    pageSize: 10,
  })
  const [packageProductListData, setPackageProductListData] = useState(null)
  const [packageProductPagination, setPackageProductPagination] = useState([])
  const checkBoxSelect = useAtomValue(selectedRowsAtom)
  const {
    isLoading,
    isError,
    data: getPackageProductListRes,
    isSuccess,
  } = useReactQuery(param, 'getPackageProductList', getPackageProductList)

  useEffect(() => {
    if (getPackageProductListRes && getPackageProductListRes.data && getPackageProductListRes.data.data) {
      setPackageProductListData(formatTableRowData(getPackageProductListRes.data.data.list))
      setPackageProductPagination(getPackageProductListRes.data.data.pagination)
    }
  }, [isSuccess, getPackageProductListRes])

  const formatTableRowData = (packageProductListData) => {
    return add_element_field(packageProductListData, packageResponseToTableRowMap)
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

  const handleTablePageSize = (event) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageSize: Number(event.target.value),
    }))
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>상시 판매 패키지</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        <FilterHeaderAlert>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <img src="/img/notice.png" />
            </div>
            <div style={{ marginTop: '6px' }}>
              <div>· 주의사항 영역</div>
              <div style={{ marginTop: '6px' }}>· 주의사항 영역</div>
            </div>
          </div>
          <div>
            수정
            <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
          </div>
        </FilterHeaderAlert>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap first>
                    <h6>규격 약호</h6>
                    <Input />
                    <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
                      찾기
                    </GreyBtn>
                  </PartWrap>
                  <PartWrap>
                    <h6>구분</h6>
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                  <PartWrap />
                </RowWrap>
                <RowWrap style={{ borderBottom: '0px' }}>
                  <PartWrap first>
                    <h6>두께(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput /> <Tilde>~</Tilde>
                      <MiniInput />
                    </ExInputsWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>폭(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput /> <Tilde>~</Tilde>
                      <MiniInput />
                    </ExInputsWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>길이(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput /> <Tilde>~</Tilde>
                      <MiniInput />
                    </ExInputsWrap>
                  </PartWrap>
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
            조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
            {packageProductPagination?.listCount}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handleTablePageSize} />
            <Excel getRow={packageProductListData} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량
            <span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
            kg / 총 중량 {formatWeight(packageProductPagination.totalWeight)} kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn>노출 상태 변경</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <Table getCol={packageFieldsCols} getRow={packageProductListData} />
        <TableBottomWrap>
          <BlackBtn width={15} height={40}>
            등록
          </BlackBtn>
        </TableBottomWrap>
      </TableContianer>
    </FilterContianer>
  )
}

export default Package
