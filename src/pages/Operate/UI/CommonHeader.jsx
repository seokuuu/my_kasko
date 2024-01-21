import { isEqual } from 'lodash'
import React, { useState } from 'react'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { FilterHeader, FilterWrap } from '../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../store/Layout/Layout'
import FAQSearchFields from '../Common/FAQ/components/FAQSearchFields'
import CategoryTab from './CategoryTab'

/**
 * @description
 * 검색 필터
 * 사용처 : 운영관리 - 공지사항 관리,자료실 관리,전광판 관리
 * @param search 검색 관련 상태값
 * @param setSearch 검색 관련 상태 setState
 * @param refetch 상태값 기반으로 목록 API 호출
 * @param searchInitValue 검색 상태 초깃값
 * @param tabHighlightValue 선택된 카테고리 탭 값
 * @param searchCategoryOptions 검색 셀렉트 박스 옵션
 * @param categoryTabOptions 카테고리 탭 옵션
 **/
const CommonHeader = ({
	search,
	setSearch,
	refetch,
	searchInitValue,
	tabHighlightValue,
	searchCategoryOptions,
	categoryTabOptions,
}) => {
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')

	const [isRotated, setIsRotated] = useState(false)

	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	// 초기화
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
		refetch()
	}

	// 검색
	function searchHandler() {
		refetch()
		setSearch(searchInitValue)
	}

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setSearch(paramData)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setSearch((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}
	return (
		<div>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>일반 관리</h1>
					<CategoryTab options={categoryTabOptions} highLightValue={tabHighlightValue} />
				</div>
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{exFilterToggle && (
				<FilterWrap>
					<GlobalProductSearch
						param={search}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <FAQSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
					{/* <FilterSubcontianer>
						<FilterLeft>
							<RowWrap>
								<PartWrap>
									<h6>검색</h6>
									<MainSelect
										options={searchCategoryOptions}
										defaultValue={searchCategoryOptions[0]}
										value={search.category}
										onChange={(e) => {
											setSearch((p) => ({ ...p, category: e }))
										}}
									/>
									<Input
										value={search.keyword}
										onChange={(e) => setSearch((p) => ({ ...p, keyword: e.target.value }))}
									/>
								</PartWrap>
							</RowWrap>
						</FilterLeft>
					</FilterSubcontianer> */}
					{/* <FilterFooter>
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
							<BlackBtn width={100} height={40} onClick={searchHandler}>
								검색
							</BlackBtn>
						</div>
					</FilterFooter> */}
				</FilterWrap>
			)}
		</div>
	)
}

export default CommonHeader
