import { useContext, useState } from 'react'
import { useUserPackageProductListQuery } from '../../../api/user'
import { BlackBtn, GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { PROD_CATEGORY, getUserPackageProductFieldsCols, userPackageProductField } from '../../../constants/user/product'
import useTableData from '../../../hooks/useTableData'
// import useTableSearchFieldData from '../../../hooks/useTableSearchFieldData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import useWishList from '../../../hooks/useWishList'
import {
  DoubleWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterHeaderAlert,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  Input,
  MiniInput,
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  TCSubContainer,
  TableContianer,
  Tilde
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { toggleAtom } from '../../../store/Layout/Layout'
import AddCartButton from '../_components/AddCartButton'
import AddOrderButton from '../_components/AddOrderButton'
import AddWishButton from '../_components/AddWishButton'
import { PACKAGE_VIEWER_ACTION, PackageViewerDispatchContext } from '../_layouts/UserSalesWrapper'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  pageNum: 1, // 페이지 번호
  pageSize: 50, // 페이지 갯수
  storage: '', // 창고구분
  supplier: '', // 매입처
  spec: '', // 규격약호
  spart: '', // 제품군
  maker: '', // 제조사
  grade: '', // 제품 등급
  minThickness: '', // 최소 두께
  maxThickness: '', // 최대 두께
  minWidth: '', // 최소 폭
  maxWidth: '', // 최대 폭
  minLength: '', // 최소 길이
  maxLength: '', // 최대 길이
  productNumberList: '', // 제품 번호
}

/**
 * (사용자)상시판매 패키지
 */
const Package = ({}) => {
  // API 파라미터
  const {
    searchParams,
    handleParamsChange,
    handlePageSizeChange,
    tempSearchParams,
    handleTempParamsChange,
    handleSearch,
    handleParamsReset,
  } = useTableSearchParams({ ...initialSearchParams });
  // API
  const { data: packageData, isError, isLoading } = useUserPackageProductListQuery(searchParams) // 상시판매 패키지 목록 조회 쿼리
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({
    tableField: userPackageProductField,
    serverData: packageData,
    wish: { display: true }
  });
  // 선택 항목
  const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr, hasSelected } = useTableSelection({ weightKey: '중량 합계' })
  // 필드 옵션
  // const { supplierList, stockStatusList, gradeList } = useTableSearchFieldData();
  // 규격약호 검색 모달
  const [standardCodeModalOn, setStandardCodeModalOn] = useState(false);
  const { wishProdNums } = useWishList();
  // 패키지 상세보기
  const {setPackageActionViewer} = useContext(PackageViewerDispatchContext);

  /**
   * 필터 검색 핸들러
   * @param {*} e
   */
  function handleFilterSearch(e) {
    e.preventDefault();

    // const warning = getInvalidationMessage();

    // if (warning) {
    //   return alert(warning);
    // }

    handleSearch();
  }

  /**
   * UI COMMONT PROPERTIES
   * @description 페이지 내 공통 UI 처리 함수입니다.
   * @todo 테이블 공통 컴포넌트로 전환
   */
  /* ============================== COMMON start ============================== */
    // FILTER ON TOGGLE
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
    // RESET
    const [isRotated, setIsRotated] = useState(false)
    const handleImageClick = () => {
      setIsRotated((prevIsRotated) => !prevIsRotated)
    }
  /* ============================== COMMON end ============================== */

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>단일</h1>
        </div>
        {/* 검색필터 ON|OFF */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {/* 공지사항 */}
      <FilterHeaderAlert>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <img src="/img/notice.png" />
          </div>
          <div style={{ marginTop: '6px' }}>
            <div>· 주의사항 영역</div>
            <div style={{ marginTop: '6px' }}>
              <div>· 주의사항 영역</div>
            </div>
          </div>
        </div>
        <div>
          수정
          <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
        </div>
      </FilterHeaderAlert>
      {/* 검색 필터 */}
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect />
                  </PWRight>
                </PartWrap>
                {/* 매입처 */}
                <PartWrap>
                  <h6>매입처</h6>
                  <PWRight>
                    <MainSelect />
                  </PWRight>
                </PartWrap>
                {/* 규격약호 찾기 */}
                <PartWrap>
                  <h6>규격 약호</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              {/* 구분 */}
              <RowWrap>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
              </RowWrap>
              {/* 두께 |  폭 | 길이 */}
              <RowWrap none>
                <PartWrap first>
                  <h6>두께(MM)</h6>
                  <MiniInput /> <Tilde>~</Tilde>
                  <MiniInput />
                </PartWrap>
                <PartWrap>
                  <h6>폭(MM)</h6>
                  <MiniInput /> <Tilde>~</Tilde>
                  <MiniInput />
                </PartWrap>
                <PartWrap>
                  <h6>길이(MM)</h6>
                  <MiniInput /> <Tilde>~</Tilde>
                  <MiniInput />
                </PartWrap>
              </RowWrap>
            </FilterLeft>
            {/* 제품 번호 */}
            <FilterRight>
              <DoubleWrap>
                <h6>제품 번호 </h6>
                <textarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                />
              </DoubleWrap>
            </FilterRight>
          </FilterSubcontianer>
          <FilterFooter>
            <button
              style={{ display: 'flex' }}
              onClick={() => {
                handleParamsReset()
              }}
            >
              <p>초기화</p>
              <ResetImg
                src="/img/reset.png"
                style={{ marginLeft: '10px', marginRight: '20px' }}
                onClick={() => {
                  handleParamsReset();
                  handleImageClick();
                }}
                className={isRotated ? 'rotate' : ''}
              />
            </button>
            <div style={{ width: '180px' }}>
              <BlackBtn width={100} height={40} disabled={isLoading} onClick={handleFilterSearch}>
                검색
              </BlackBtn>
            </div>
          </FilterFooter>
        </>
      )}
      <TableContianer>
        {/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
      <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handlePageSizeChange} />
            <Excel getRow={tableRowData} />
          </div>
        </TCSubContainer>
        {/* 선택항목 중량 | 관심상품 등록 */}
        <TCSubContainer bor>
          <div>
            선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
          </div>
          <AddWishButton products={selectedData} productNumberKey={"패키지번호"} />
        </TCSubContainer>
        {/* 테이블 */}
        <Table
          getRow={tableRowData}
          getCol={getUserPackageProductFieldsCols(setPackageActionViewer)}
          isLoading={isLoading}
          tablePagination={paginationData}
          onPageChange={(p) => {
            handleParamsChange({ page: p })
          }}
        />
        {/* 테이블 액션 */}
        <TCSubContainer style={{ width: '100%', justifyContent: 'flex-end', gap: 8 }}>
          <AddCartButton category={PROD_CATEGORY.package} products={selectedData} />
          <AddOrderButton category={PROD_CATEGORY.package} totalWeight={selectedWeight} products={selectedData} />
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default Package;
