import React from 'react'
import { CheckBox } from '../../../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../../../common/Check/RadioImg'
import { ExRadioWrap } from '../../../../../modal/External/ExternalFilter'

const IsExposure = ({ setState, setCheckRadio, checkRadio, radioDummy }) => {
  return (
    <div style={{ width: '50%' }}>
      <p style={{ marginBottom: '5px' }}>상단 노출 여부</p>
      <ExRadioWrap style={{ padding: '0', marginTop: '10px', gap: '150px', marginLeft: '-150px' }}>
        {radioDummy.map((text, index) => (
          <RadioMainDiv key={index}>
            <RadioCircleDiv
              isChecked={checkRadio[index]}
              onClick={() => {
                setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))

                setState((p) => ({ ...p, status: !Boolean(index) }))
              }}
            >
              <RadioInnerCircleDiv isChecked={checkRadio[index]} />
            </RadioCircleDiv>
            <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
          </RadioMainDiv>
        ))}
      </ExRadioWrap>
    </div>
  )
}

export default IsExposure
