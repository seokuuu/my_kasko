import { useState } from 'react'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'
import { CheckBox } from '../../common/Check/Checkbox'

const RadioButton = ({ radioButtonLabels, style, selection }) => {
	const [isRadioChecked, setIsRadioChecked] = useState(Array.from({ length: radioButtonLabels.length }, () => false))

	const radioButtonOnClickHandler = (index) => {
		const newCheckedState = CheckBox(isRadioChecked, isRadioChecked.length, index)
		setIsRadioChecked(newCheckedState)
		selection(newCheckedState)
	}

	return radioButtonLabels.map((text, index) => (
		<RadioMainDiv key={index}>
			<RadioCircleDiv
				name="type"
				checkSelection={isRadioChecked[index]}
				onClick={() => radioButtonOnClickHandler(index)}
				isChecked={isRadioChecked[index]}
			>
				<RadioInnerCircleDiv isChecked={isRadioChecked[index]} />
			</RadioCircleDiv>
			<div style={style}>{text}</div>
		</RadioMainDiv>
	))
}

export default RadioButton
