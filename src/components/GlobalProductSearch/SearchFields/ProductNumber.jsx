import React, { useEffect, useState } from 'react'
import { DoubleWrap } from '../../../modal/External/ExternalFilter'
import { useAtomValue } from 'jotai'
import { filterisReset } from '../../../store/Layout/Layout'

const ProductNumber = ({ stateValue, setState, valueName, title, height = '100px' }) => {
	const [value, setValue] = useState(stateValue || '')
	const isReset = useAtomValue(filterisReset)

	const onChange = (e) => {
		setValue(e.target.value)
	}

	useEffect(() => {
		// Set the internal state when the stateValue prop changes.
		setValue(stateValue || '')
	}, [stateValue])

	useEffect(() => {
		setValue('')
	}, [isReset])

	useEffect(() => {
		const splitValues = value
			? value
					?.split(/,|\n/)
					?.map((item) => item.trim())
					?.filter((item) => item !== '')
			: []
		setState((prevState) => ({ ...prevState, [valueName]: splitValues }))
	}, [value, setState, valueName])

	return (
		<DoubleWrap>
			<h6>{title || '제품 번호'}</h6>
			<textarea
				value={value}
				onChange={onChange}
				placeholder="복수 조회 진행&#13;&#10;제품 번호 ',' 혹은 enter로&#13;&#10;구분하여 작성해주세요."
				style={{ height }}
			/>
		</DoubleWrap>
	)
}

export default ProductNumber
