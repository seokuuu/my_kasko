import { isEqual } from 'lodash'
import React, { useState } from 'react'
import GlobalProductSearch from '../../../../../components/GlobalProductSearch/GlobalProductSearch'
import HeaderToggle from '../../../../../components/Toggle/HeaderToggle'
import { FilterHeader } from '../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../store/Layout/Layout'
import CategoryTab from '../../../UI/CategoryTab'
import { normalTabOptions } from '../../../constants'
import ClaimSearchFields from './ClaimSearchFields'

const ClaimHeader = ({ search, setSearch, refetch }) => {
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

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}

	const globalProductResetOnClick = () => {
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
					<CategoryTab options={normalTabOptions} highLightValue="claim" />
				</div>
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>

			{exFilterToggle && (
				<GlobalProductSearch
					param={search}
					setParam={setSearch}
					isToggleSeparate={true}
					renderCustomSearchFields={(props) => <ClaimSearchFields {...props} />}
					globalProductSearchOnClick={globalProductSearchOnClick}
					globalProductResetOnClick={globalProductResetOnClick}
				/>
			)}
		</div>
	)
}

export default ClaimHeader
