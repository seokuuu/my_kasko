import React from 'react'
import styled from 'styled-components'
import { CheckBox } from '../../../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../../../common/Check/RadioImg'
import { ExRadioWrap } from '../../../../../modal/External/ExternalFilter'

const BottomWrap = styled.div`
  display: block;
  justify-content: left;
  font-size: 16px;
  height: 200px;
`

const BottomOne = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  align-items: center;
`

const IsExposure = ({ setState, setCheckRadio, checkRadio, radioDummy }) => {
  return (
    <BottomWrap style={{ width: '100%', display: 'flex', height: '450px' }}>
      <BottomOne
        style={{
          width: '90%',

          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'normal',
          paddingTop: '50px',
          display: 'block',
        }}
      >
        <div style={{ fontSize: '18px' }}>전광판 노출 여부</div>
        <div style={{ display: 'flex' }}>
          <ExRadioWrap style={{ padding: '0', marginTop: '10px', gap: '300px' }}>
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
      </BottomOne>
    </BottomWrap>
  )
}

export default IsExposure
