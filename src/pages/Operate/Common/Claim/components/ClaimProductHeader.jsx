import { isEqual } from 'lodash'
import React, { useState } from 'react'
import GlobalProductSearch from '../../../../../components/GlobalProductSearch/GlobalProductSearch'
import HeaderToggle from '../../../../../components/Toggle/HeaderToggle'
import { FilterHeader, FilterWrap } from '../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../store/Layout/Layout'
import ClaimProductSearchFields from './ClaimProductSearchFields'

/**
 * @description
 * 클레임 상품 목록 헤더
 */
const ClaimProductHeader = ({ search, setSearch, refetch }) => {
	// 토글 쓰기
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
				<div>
					<h1>클레임 등록할 제품 찾기</h1>
				</div>
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{exFilterToggle && (
				<FilterWrap>
					{/* 글로벌  */}
					<GlobalProductSearch
						param={search}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <ClaimProductSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</FilterWrap>
			)}
		</div>
	)
}

export default ClaimProductHeader
