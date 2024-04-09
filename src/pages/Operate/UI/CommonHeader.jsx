import React, { useState } from 'react'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { FilterHeader, FilterWrap } from '../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../store/Layout/Layout'
import FAQSearchFields from '../Common/FAQ/components/FAQSearchFields'
import useGlobalSearch from '../hook/useGlobalSearch'
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

	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const { globalProductSearchOnClick, globalProductResetOnClick } = useGlobalSearch({ setSearch, refetch })

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
						setParam={setSearch}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <FAQSearchFields {...props} searchOptions={searchCategoryOptions} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</FilterWrap>
			)}
		</div>
	)
}

export default CommonHeader
