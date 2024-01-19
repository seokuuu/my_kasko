import { isEqual } from 'lodash'
import React, { useState } from 'react'
import GlobalProductSearch from '../../../../../../components/GlobalProductSearch/GlobalProductSearch'
import HeaderToggle from '../../../../../../components/Toggle/HeaderToggle'
import { FilterHeader, FilterWrap } from '../../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../../store/Layout/Layout'
import CategoryTab from '../../../../UI/CategoryTab'
import { faqListSearchInitValue, normalTabOptions } from '../../../../constants'
import FAQSearchFields from '../FAQSearchFields'

/**
 * @description
 * faq 목록 헤더에서 사용되는 컴포넌트입니다.
 * @returns
 */
const Header = ({ search, setSearch, refetch }) => {
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const [isRotated, setIsRotated] = useState(false)
	// const [isModal, setIsModal] = useAtom(blueModalAtom)

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
		setSearch(faqListSearchInitValue)
	}

	// const modalOpen = () => {
	//   setIsModal(true)
	// }

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
					<CategoryTab options={normalTabOptions} highLightValue="faq" />
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
				</FilterWrap>
			)}
		</div>
	)
}

export default Header
