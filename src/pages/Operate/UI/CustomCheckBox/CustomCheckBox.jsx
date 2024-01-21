import React, { useEffect, useMemo, useState } from 'react'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'
import { ExCheckDiv, ExCheckWrap } from '../../../../modal/External/ExternalFilter'
import EntireCheck from './EntireCheck'
import { Description } from '@mui/icons-material'

/**
 * @constant mockInitOptions 초깃값이 없을 때, 할당해줄 값입니다.
 */
const mockInitOptions = [
	{
		checked: false,
		text: '1',
		value: '1',
	},
	{
		checked: false,
		text: '2',
		value: '2',
	},
]

/**
 * @description
 * 체크박스 컴포넌트입니다.
 * @param initOptions option 초깃값입니다.
 * @param stateKey 상위 state key값입니다.
 * @param setState 상위 setState입니다.
 * @param isExistEntireValue 전체 옵션 포함 여부 입니다.
 * @param stateType state 형태입니다. 값은 "object"(객체 형태) 혹은 "single"(단일 형태)입니다.
 */
const CustomCheckBox = ({
	setState = () => {},
	initOptions = mockInitOptions,
	stateKey,
	isExistEntireValue = true,
	stateType = 'object',
}) => {
	// 옵션값
	const [options, setOptions] = useState(initOptions)
	// 체크박스 핸들러
	function onCheckHandler(option) {
		const newOptions = options.map((opt) => (opt.value === option.value ? { ...opt, checked: !opt.checked } : opt))
		setOptions(newOptions)
	}
	// 체크된 값들의 value값만 추출합니다.
	const checkedValues = useMemo(
		() => options.reduce((acc, option) => (option.checked ? [...acc, option.value] : acc), []),
		[options],
	)
	// 상위 setState에 체크된 values들을 할당합니다.
	useEffect(() => {
		switch (stateType) {
			case 'object':
				setState((p) => ({ ...p, [stateKey]: checkedValues }))
				break
			case 'single':
				setState(checkedValues)
				break
			default:
		}
	}, [checkedValues, stateType])
	return (
		<ExCheckWrap>
			{isExistEntireValue && <EntireCheck options={options} setOptions={setOptions} />}
			{options.map((option, index) => (
				<ExCheckDiv key={index}>
					<StyledCheckSubSquDiv isChecked={option.checked} onClick={() => onCheckHandler(option)}>
						<CheckImg2 src="/svg/check.svg" isChecked={option.checked} />
					</StyledCheckSubSquDiv>
					<p>{option.text}</p>
				</ExCheckDiv>
			))}
		</ExCheckWrap>
	)
}

export default CustomCheckBox
