import { Input, PartWrap, PWRight } from '../../modal/External/ExternalFilter'
import React from 'react'

/**
 * TODO 일반 input search components
 * @param title 제목
 * @param value value
 * @param onChange value change event
 */
const InputSearch = ({ width, title, value, onChange }) => {
	return (
		<PartWrap>
			<h6>{title}</h6>
			<PWRight style={{ width: width || '160px' }}>
				<Input value={value} onChange={(e) => onChange(e.target.value)} />
			</PWRight>
		</PartWrap>
	)
}

export default InputSearch
